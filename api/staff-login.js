import pg from "pg";

const { Pool } = pg;

const defaultAllowedOrigins = [
  "https://www.kidsverseschool.com",
  "https://kidsverseschool.com",
  "http://localhost:3000",
  "http://localhost:8765",
  "http://127.0.0.1:8765",
];

const databaseUrl = process.env.KIDSVERSE_DATABASE_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;
const pool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
      ssl: process.env.POSTGRES_SSL === "false" ? false : { rejectUnauthorized: false },
      max: Number(process.env.POSTGRES_POOL_MAX || 3),
    })
  : null;
const googleClientId =
  process.env.GOOGLE_CLIENT_ID ||
  "344047535994-9a2s1tl3kf9etkkht33ciba13f32k5b8.apps.googleusercontent.com";

const getAllowedOrigins = () => {
  const customOrigins = String(process.env.ALLOWED_AUDIT_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  return customOrigins.length ? customOrigins : defaultAllowedOrigins;
};

const setCorsHeaders = (req, res) => {
  const origin = req.headers.origin || "";
  const allowedOrigins = getAllowedOrigins();
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

const cleanText = (value, limit = 500) => String(value || "").trim().slice(0, limit);

const getIpAddress = (req) => {
  const forwardedFor = cleanText(req.headers["x-forwarded-for"], 200);
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return cleanText(req.headers["x-real-ip"], 80) || null;
};

const getLocation = (req) => ({
  city: decodeURIComponent(cleanText(req.headers["x-vercel-ip-city"] || req.headers["cf-ipcity"], 100)),
  country: cleanText(req.headers["x-vercel-ip-country"] || req.headers["cf-ipcountry"], 100),
});

const getBrowserName = (userAgent) => {
  const ua = userAgent.toLowerCase();
  if (ua.includes("edg/")) return "Microsoft Edge";
  if (ua.includes("chrome/") && !ua.includes("chromium")) return "Chrome";
  if (ua.includes("safari/") && !ua.includes("chrome/")) return "Safari";
  if (ua.includes("firefox/")) return "Firefox";
  if (ua.includes("opr/") || ua.includes("opera")) return "Opera";
  return userAgent ? "Unknown browser" : "";
};

const getOperatingSystem = (userAgent, platform = "") => {
  const text = `${userAgent} ${platform}`.toLowerCase();
  if (text.includes("iphone") || text.includes("ipad") || text.includes("ios")) return "iOS";
  if (text.includes("android")) return "Android";
  if (text.includes("mac os") || text.includes("macintosh") || text.includes("macintel")) return "macOS";
  if (text.includes("windows")) return "Windows";
  if (text.includes("linux")) return "Linux";
  return text ? "Unknown OS" : "";
};

const getDeviceType = (userAgent) => {
  const ua = userAgent.toLowerCase();
  if (ua.includes("ipad") || ua.includes("tablet")) return "Tablet";
  if (ua.includes("mobile") || ua.includes("iphone") || ua.includes("android")) return "Mobile";
  return userAgent ? "Desktop/Laptop" : "";
};

const verifyGoogleCredential = async (credential) => {
  const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
  if (!response.ok) {
    throw new Error("Google token could not be verified.");
  }

  const profile = await response.json();
  if (profile.aud !== googleClientId) {
    throw new Error("Google token audience does not match this Kidsverse client.");
  }
  if (profile.email_verified !== "true" && profile.email_verified !== true) {
    throw new Error("Google account email is not verified.");
  }

  return profile;
};

export default async function handler(req, res) {
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!databaseUrl) {
    return res.status(500).json({ error: "Database is not configured. Add KIDSVERSE_DATABASE_URL or DATABASE_URL on your hosting platform." });
  }

  try {
    const { credential, device = {}, sourceApp = "kidsverse" } = req.body || {};
    const safeCredential = cleanText(credential, 5000);
    if (!safeCredential) {
      return res.status(400).json({ error: "Google credential is required." });
    }

    const profile = await verifyGoogleCredential(safeCredential);
    const email = cleanText(profile.email, 220).toLowerCase();
    const fullName = cleanText(profile.name || profile.email, 255);
    const googleId = cleanText(profile.sub, 255);
    const userAgent = cleanText(req.headers["user-agent"], 1000) || cleanText(device.userAgent, 1000);
    const browser = cleanText(getBrowserName(userAgent), 255);
    const operatingSystem = cleanText(getOperatingSystem(userAgent, device.platform), 255);
    const deviceType = cleanText(getDeviceType(userAgent), 255);
    const ipAddress = getIpAddress(req);
    const location = getLocation(req);

    const client = await pool.connect();
    try {
      await client.query("begin");

      const userResult = await client.query(
        `
        insert into kidsverse.users (
          google_id,
          email,
          full_name,
          profile_picture,
          provider,
          profile_type,
          role,
          is_active,
          email_verified,
          login_count,
          last_login,
          updated_at
        )
        values ($1, $2, $3, $4, 'google', $5, $6, true, $7, 1, current_timestamp, current_timestamp)
        on conflict (email)
        do update set
          google_id = coalesce(kidsverse.users.google_id, excluded.google_id),
          full_name = excluded.full_name,
          profile_picture = excluded.profile_picture,
          provider = 'google',
          email_verified = excluded.email_verified,
          login_count = kidsverse.users.login_count + 1,
          last_login = current_timestamp,
          updated_at = current_timestamp
        returning id, email, full_name, profile_picture, profile_type, role, login_count, last_login
        `,
        [
          googleId,
          email,
          fullName,
          cleanText(profile.picture, 1000) || null,
          cleanText(device.profileType, 30) || "student",
          cleanText(device.role, 30) || "user",
          profile.email_verified === "true" || profile.email_verified === true,
        ]
      );

      const user = userResult.rows[0];
      const historyResult = await client.query(
        `
        insert into kidsverse.login_history (
          user_id,
          ip_address,
          browser,
          operating_system,
          device,
          city,
          country,
          login_status
        )
        values ($1, $2, $3, $4, $5, $6, $7, 'SUCCESS')
        returning id, login_time, login_status
        `,
        [
          user.id,
          ipAddress,
          browser,
          operatingSystem,
          deviceType,
          location.city || null,
          location.country || null,
        ]
      );

      await client.query("commit");

      return res.status(200).json({
        ok: true,
        record: {
          id: historyResult.rows[0].id,
          userId: user.id,
          name: user.full_name,
          email: user.email,
          role: user.role,
          profileType: user.profile_type,
          loginCount: user.login_count,
          signed_in_at: historyResult.rows[0].login_time,
          loginStatus: historyResult.rows[0].login_status,
        },
      });
    } catch (databaseError) {
      await client.query("rollback");
      throw databaseError;
    } finally {
      client.release();
    }
  } catch (error) {
    return res.status(400).json({ error: error.message || "Login audit could not be saved." });
  }
}
