import { randomUUID, randomBytes, randomInt, createHmac, timingSafeEqual } from 'node:crypto';
import { database } from '../lib/attendance-db.js';
import { PublicError, insist, digest, lookupCode, hashCode, verifyCode, schoolDay, dateValue, timeValue, graceValue, uuid, locationValue, campusLocation, CAMPUS, classify, scheduleDays } from '../lib/attendance-core.js';
const cookieNames={admin:'kv_attendance_admin',teacher:'kv_attendance_teacher'};
// Dedicated single-school admin identity; existing code-based admins remain unchanged.
const passwordAdminId='aa4d9e86-f402-4728-83b8-a6c7e82516c2';
function sameSecret(a,b) {return timingSafeEqual(Buffer.from(digest(a),'hex'),Buffer.from(digest(b),'hex'));}
function adminToken(password,codeSecret,nonce=randomBytes(32).toString('hex')) {
 const key=createHmac('sha256',codeSecret).update(password).digest();
 return `${nonce}.${createHmac('sha256',key).update(nonce).digest('hex')}`;
}
function validAdminSession(token,codeSecret) {
 const password=process.env.ATTENDANCE_ADMIN_PASSWORD;
 if(!password || password.length<12 || password.length>200 || !/^[a-f0-9]{64}\.[a-f0-9]{64}$/.test(token))return false;
 return sameSecret(token,adminToken(password,codeSecret,token.split('.')[0]));
}

const safeStaff=s=>({id:s.id,name:s.name,role:s.role,active:s.active});
const secret=()=>{ const value=process.env.ATTENDANCE_CODE_SECRET; insist(value && value.length>=32,'Attendance setup is incomplete. Contact your administrator.',503); return value; };
function cookie(res,value,maxAge,role) {const cookieName=cookieNames[role];res.setHeader('Set-Cookie',`${cookieName}=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${process.env.NODE_ENV==='production'?'; Secure':''}`);}
async function audit(db,actor,action,target,details) {await db.query('INSERT INTO kv_attendance.audit(actor_id,action,target_id,details) VALUES($1,$2,$3,$4)',[actor.id,action,target,JSON.stringify(details)]);}
async function transaction(pool,fn) {const db=await pool.connect();try{await db.query('BEGIN');const result=await fn(db);await db.query('COMMIT');return result;}catch(e){await db.query('ROLLBACK');throw e;}finally{db.release();}}
async function lockTeacher(db,id) {await db.query('SELECT id FROM kv_attendance.staff WHERE id=$1 FOR UPDATE',[id]);}
async function teacher(db,id) {const {rows}=await db.query("SELECT * FROM kv_attendance.staff WHERE id=$1 AND role='teacher'",[uuid(id)]);insist(rows[0],'Teacher not found.',404);return rows[0];}
async function schedule(db,id,day) {
 const over=(await db.query('SELECT *,day::text FROM kv_attendance.overrides WHERE teacher_id=$1 AND day=$2',[id,day])).rows[0];
 if(over) return {...over,kind:over.day_off?'day_off':'scheduled',source:'override'};
 const version=(await db.query('SELECT id FROM kv_attendance.schedule_versions WHERE teacher_id=$1 AND effective_from<=$2 ORDER BY effective_from DESC LIMIT 1',[id,day])).rows[0];
 if(!version)return {kind:'missing'};
 const weekday=new Date(`${day}T12:00:00Z`).getUTCDay()||7;
 const rule=(await db.query('SELECT * FROM kv_attendance.schedule_days WHERE version_id=$1 AND weekday=$2',[version.id,weekday])).rows[0];
 return rule?{...rule,kind:'scheduled',source:'weekly'}:{kind:'day_off'};
}
async function entry(db,id,day) {return (await db.query('SELECT *,day::text FROM kv_attendance.entries WHERE teacher_id=$1 AND day=$2',[id,day])).rows[0]||null;}
async function pendingRequest(db,entryId) {return (await db.query("SELECT *, requested_checked_in_at AT TIME ZONE 'Asia/Kolkata' AS requested_local_time FROM kv_attendance.on_time_requests WHERE entry_id=$1 AND status='pending' ORDER BY created_at DESC LIMIT 1",[entryId])).rows[0]||null;}
function requestedCheckIn(day,value) {
 const requestedTime=timeValue(value);
 const instant=new Date(`${day}T${requestedTime}:00+05:30`);
 insist(Number.isFinite(instant.getTime()),'Choose a valid requested attendance time.');
 return instant;
}
function monthValue(value) {insist(typeof value==='string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(value),'Choose a valid month.');return value;}
async function monthlySummary(db,teacherId,month) {
 const start=`${month}-01`;
 const {rows:[totals]}=await db.query(`SELECT count(*)::int AS present, COALESCE(SUM(CASE WHEN status='late' THEN 1 ELSE 0 END),0)::int AS late
   FROM kv_attendance.entries WHERE teacher_id=$1 AND day >= $2::date AND day < ($2::date + interval '1 month')`,[teacherId,start]);
 let automaticLeaves=0;
 try{
  const {rows:[deductions]}=await db.query('SELECT count(*)::int AS automatic_leaves FROM kv_attendance.automatic_leave_deductions WHERE teacher_id=$1 AND month=$2',[teacherId,start]);
  automaticLeaves=deductions.automatic_leaves;
 }catch(error){
  // Let teachers continue to view attendance if an older database branch has
  // not yet received the optional automatic-leave migration.
  if(error?.code!=='42P01')throw error;
 }
 return {month,present:totals.present,late:totals.late,allowedLeaves:1,automaticLeaves};
}
async function syncAutomaticLeaveDeductions(db,teacherId,day) {
 const month=day.slice(0,7),start=`${month}-01`;
 const {rows:[count]}=await db.query(`SELECT count(*)::int AS total FROM kv_attendance.entries
   WHERE teacher_id=$1 AND status='late' AND day >= $2::date AND day < ($2::date + interval '1 month')`,[teacherId,start]);
 const groups=Math.floor(count.total/3);
 for(let group=1;group<=groups;group++){
  const {rows:[trigger]}=await db.query(`SELECT id,day::text FROM kv_attendance.entries WHERE teacher_id=$1 AND status='late'
    AND day >= $2::date AND day < ($2::date + interval '1 month') ORDER BY checked_in_at,id OFFSET $3 LIMIT 1`,[teacherId,start,group*3-1]);
  await db.query(`INSERT INTO kv_attendance.automatic_leave_deductions(id,teacher_id,month,late_group,triggered_by_entry,leave_date)
    VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(teacher_id,month,late_group) DO UPDATE SET triggered_by_entry=excluded.triggered_by_entry,leave_date=excluded.leave_date`,[randomUUID(),teacherId,start,group,trigger.id,trigger.day]);
 }
 await db.query('DELETE FROM kv_attendance.automatic_leave_deductions WHERE teacher_id=$1 AND month=$2 AND late_group>$3',[teacherId,start,groups]);
 return groups;
}
async function allocateTeacherCode(db,codeSecret,requested) {
 // Serialize code allocation across all API instances; uniqueness also holds in SQL.
 await db.query('SELECT pg_advisory_xact_lock(72643109)');
 const used=new Set((await db.query('SELECT code_lookup FROM kv_attendance.staff')).rows.map(s=>s.code_lookup));
 if(requested!==undefined){
  insist(typeof requested==='string' && /^\d{4}$/.test(requested),'Enter exactly four digits (for example, 0427).');
  insist(!used.has(lookupCode(requested,codeSecret)),'That code is already in use. Choose another four-digit code.',409);
  return requested;
 }
 const start=randomInt(10000);
 for(let i=0;i<10000;i++){const code=String((start+i)%10000).padStart(4,'0');if(!used.has(lookupCode(code,codeSecret)))return code;}
 throw new PublicError('All four-digit codes are in use. Contact your administrator.',409);
}
async function rateLimit(db,keys) {
 for(const key of keys){const {rows}=await db.query(`INSERT INTO kv_attendance.login_limits(bucket,attempts) VALUES($1,1)
 ON CONFLICT(bucket) DO UPDATE SET attempts=CASE WHEN kv_attendance.login_limits.window_start<now()-interval '15 minutes' THEN 1 ELSE kv_attendance.login_limits.attempts+1 END,
 window_start=CASE WHEN kv_attendance.login_limits.window_start<now()-interval '15 minutes' THEN now() ELSE kv_attendance.login_limits.window_start END RETURNING attempts`,[key]);
 insist(rows[0].attempts<=15,'Too many sign-in attempts. Try again in 15 minutes.',429);}
}
export function createHandler({getDatabase=database,clock=()=>new Date()}={}) {
return async function handler(req,res) {
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed.'});}
 try {
  insist(String(req.headers['content-type']||'').startsWith('application/json'),'JSON request required.',415);
  if(req.headers.origin){const configured=(process.env.ATTENDANCE_ALLOWED_ORIGINS||'').split(',').filter(Boolean);const origin=new URL(req.headers.origin);insist(configured.length?configured.includes(origin.origin):origin.host===req.headers.host,'Request origin is not allowed.',403);}
  const body=typeof req.body==='string'?JSON.parse(req.body):req.body;insist(body && typeof body.action==='string','Action required.');
  const pool=getDatabase();const codeSecret=secret();const now=clock();const today=schoolDay(now);
  if(body.action==='adminLogin') {
   const password=process.env.ATTENDANCE_ADMIN_PASSWORD;
   insist(typeof password==='string' && password.length>=12 && password.length<=200,'Admin password is not configured. Add ATTENDANCE_ADMIN_PASSWORD in Vercel (12ā€“200 characters), then redeploy.',503);
   insist(typeof body.password==='string' && body.password.length<=200,'Enter your admin password.');
   const ip=process.env.ATTENDANCE_TRUST_PROXY==='true'?String(req.headers['x-forwarded-for']||'unknown').split(',')[0]:req.socket?.remoteAddress||'shared';
   const buckets=[digest(`admin-ip:${ip}`),digest('admin-password-login')];
   await rateLimit(pool,buckets);
   insist(sameSecret(body.password,password),'Incorrect admin password.',401);
   const token=adminToken(password,codeSecret);
   const loggedIn=await transaction(pool,async db=>{
    const created=await db.query("INSERT INTO kv_attendance.staff(id,name,role,code_lookup,code_hash) VALUES($1,'School Administrator','admin','environment-admin-password','disabled') ON CONFLICT(id) DO NOTHING RETURNING id",[passwordAdminId]);
    const record=(await db.query('SELECT * FROM kv_attendance.staff WHERE id=$1 FOR UPDATE',[passwordAdminId])).rows[0];
    insist(record?.active && record.role==='admin','Administrator access is disabled.',403);
    if(created.rows.length)await audit(db,record,'password_admin_created',record.id,{});
    await db.query("INSERT INTO kv_attendance.sessions(token_hash,staff_id,expires_at) VALUES($1,$2,now()+interval '12 hours')",[digest(token),record.id]);return record;
   });
   await pool.query('UPDATE kv_attendance.login_limits SET attempts=GREATEST(0,attempts-1) WHERE bucket=ANY($1::text[])',[buckets]);
   cookie(res,token,43200,'admin');return res.status(200).json({staff:safeStaff(loggedIn)});
  }
  if(body.action==='login') {
   insist(typeof body.code==='string' && body.code.length<=100,'Enter your staff code.');
   const lookup=lookupCode(body.code,codeSecret);
   const ip=process.env.ATTENDANCE_TRUST_PROXY==='true'?String(req.headers['x-forwarded-for']||'unknown').split(',')[0]:req.socket?.remoteAddress||'shared';
   await rateLimit(pool,[digest(`ip:${ip}`),digest(`code:${lookup}`)]);
   const token=randomBytes(32).toString('hex');
   const loggedIn=await transaction(pool,async db=>{
    const record=(await db.query('SELECT * FROM kv_attendance.staff WHERE code_lookup=$1 AND active=true FOR UPDATE',[lookup])).rows[0];
    insist(record && verifyCode(body.code,record.code_hash),'Code not recognized. Contact your administrator.',401);
    insist(record.role==='teacher','Use your admin password on the administrator sign-in page.',403);
    await db.query("INSERT INTO kv_attendance.sessions(token_hash,staff_id,expires_at) VALUES($1,$2,now()+interval '12 hours')",[digest(token),record.id]);return record;
   });
   // Successful staff sign-ins must not exhaust a shared school network's failure budget.
   await pool.query('UPDATE kv_attendance.login_limits SET attempts=GREATEST(0,attempts-1) WHERE bucket=ANY($1::text[])',[[digest(`ip:${ip}`),digest(`code:${lookup}`)]]);
   cookie(res,token,43200,'teacher');
   return res.status(200).json({staff:safeStaff(loggedIn)});
  }
  insist(body.session==='admin' || body.session==='teacher','Choose the admin or teacher sign-in page.',400);
  const sessionKind=body.session;const cookieName=cookieNames[sessionKind];
  const token=String(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith(cookieName+'='))?.slice(cookieName.length+1)||'';
  const staff=(await pool.query('SELECT s.* FROM kv_attendance.sessions t JOIN kv_attendance.staff s ON s.id=t.staff_id WHERE t.token_hash=$1 AND t.expires_at>now() AND s.active=true',[digest(token)])).rows[0];
  insist(staff,'Please sign in to continue.',401);
  insist(staff.role===sessionKind,'Please sign in on the correct attendance page.',403);
  if(staff.id===passwordAdminId)insist(validAdminSession(token,codeSecret),'Please sign in again with the current admin password.',401);
  if(body.action==='logout'){await pool.query('DELETE FROM kv_attendance.sessions WHERE token_hash=$1',[digest(token)]);cookie(res,'',0,sessionKind);return res.status(200).json({ok:true});}
  if(body.action==='me'){
   const currentEntry=staff.role==='teacher'?await entry(pool,staff.id,today):null;
   return res.status(200).json({staff:safeStaff(staff),today,serverTime:now.toISOString(),locationPolicy:CAMPUS,schedule:staff.role==='teacher'?await schedule(pool,staff.id,today):null,entry:currentEntry,correction:currentEntry?await pendingRequest(pool,currentEntry.id):null});
  }
  if(body.action==='history'){
   insist(staff.role==='teacher','Teacher access required.',403);
   const month=monthValue(body.month||today.slice(0,7)),start=`${month}-01`;
   const entries=(await pool.query(`SELECT e.*,e.day::text FROM kv_attendance.entries e WHERE e.teacher_id=$1 AND e.day >= $2::date AND e.day < ($2::date + interval '1 month') ORDER BY e.day DESC LIMIT 60`,[staff.id,start])).rows;
   let automaticLeaves=0;
   try{automaticLeaves=(await pool.query('SELECT count(*)::int AS total FROM kv_attendance.automatic_leave_deductions WHERE teacher_id=$1 AND month=$2',[staff.id,start])).rows[0].total;}catch(error){if(error?.code!=='42P01')console.error('Monthly automatic leave lookup failed:',error.code||error.name);}
   return res.status(200).json({month,summary:{month,present:entries.length,late:entries.filter(record=>record.status==='late').length,allowedLeaves:1,automaticLeaves},entries});
  }
  if(body.action==='checkin') {
   insist(staff.role==='teacher','Teacher access required.',403);
   const result=await transaction(pool,async db=>{
    await lockTeacher(db,staff.id);
    insist((await teacher(db,staff.id)).active,'Teacher is inactive.',403);
    insist((await db.query('SELECT token_hash FROM kv_attendance.sessions WHERE token_hash=$1 AND expires_at>now()',[digest(token)])).rows.length,'Please sign in again.',401);
    // Recompute after locking: a queued request must use the actual server date/time.
    const received=clock();const day=schoolDay(received);const existing=await entry(db,staff.id,day);if(existing)return existing;
    const loc=campusLocation(locationValue(body.location,received));const plan=await schedule(db,staff.id,day);
    insist(plan.kind==='scheduled',plan.kind==='missing'?'Your schedule has not been configured. Contact admin.':'No attendance is required today.',409);
    const timing=classify(day,plan.arrival,plan.grace_minutes,received);
    const {rows}=await db.query(`INSERT INTO kv_attendance.entries(id,teacher_id,day,checked_in_at,approved_arrival_at,grace_minutes,late_after_at,status,late_seconds,latitude,longitude,accuracy_meters,location_captured_at)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *,day::text`,[randomUUID(),staff.id,day,received,timing.approved,plan.grace_minutes,timing.cutoff,timing.status,timing.lateSeconds,loc.latitude,loc.longitude,loc.accuracy,loc.capturedAt]);if(rows[0].status==='late'){const automaticLeaves=await syncAutomaticLeaveDeductions(db,staff.id,day);if(automaticLeaves)await audit(db,staff,'automatic_leave_checked',rows[0].id,{month:day.slice(0,7),automaticLeaves});}return rows[0];
   });return res.status(200).json({entry:result});
  }
  if(body.action==='requestOnTime') {
   insist(staff.role==='teacher','Teacher access required.',403);
   const request=await transaction(pool,async db=>{
    const entryId=uuid(body.entryId);
    const record=(await db.query('SELECT *,day::text FROM kv_attendance.entries WHERE id=$1 AND teacher_id=$2 FOR UPDATE',[entryId,staff.id])).rows[0];
    insist(record,'Attendance record not found.',404);
    insist(record.status==='late','Only a late attendance record can be submitted for approval.',409);
    const existing=await pendingRequest(db,record.id);
    insist(!existing,'Your request is already waiting for admin approval.',409);
    const reason=String(body.reason||'').trim();
    insist(reason.length>=3 && reason.length<=500,'Enter a reason between 3 and 500 characters.');
    const requestedAt=requestedCheckIn(record.day,body.requestedTime);
    const {rows}=await db.query(`INSERT INTO kv_attendance.on_time_requests(id,entry_id,teacher_id,requested_checked_in_at,reason)
      VALUES($1,$2,$3,$4,$5) RETURNING *, requested_checked_in_at AT TIME ZONE 'Asia/Kolkata' AS requested_local_time`,[randomUUID(),record.id,staff.id,requestedAt,reason]);
    await audit(db,staff,'on_time_requested',record.id,{requestedCheckedInAt:requestedAt.toISOString(),reason});
    return rows[0];
   });
   return res.status(200).json({request});
  }
  insist(staff.role==='admin','Administrator access required.',403);
  if(body.action==='dashboard') {
   const day=dateValue(body.day||today),month=monthValue(body.month||day.slice(0,7));const teachers=(await pool.query("SELECT id,name,active FROM kv_attendance.staff WHERE role='teacher' AND (created_at AT TIME ZONE 'Asia/Kolkata')::date<=$1 ORDER BY name",[day])).rows;
   const rows=await Promise.all(teachers.map(async t=>({...t,schedule:await schedule(pool,t.id,day),entry:await entry(pool,t.id,day),monthly:await monthlySummary(pool,t.id,month)})));
   const requests=(await pool.query(`SELECT r.*, r.requested_checked_in_at AT TIME ZONE 'Asia/Kolkata' AS requested_local_time,
      e.day::text, e.checked_in_at AS original_checked_in_at, e.status AS original_status, s.name AS teacher_name
      FROM kv_attendance.on_time_requests r
      JOIN kv_attendance.entries e ON e.id=r.entry_id
      JOIN kv_attendance.staff s ON s.id=r.teacher_id
      WHERE r.status='pending' ORDER BY r.created_at ASC`)).rows;
   return res.status(200).json({day,month,teachers:rows,requests});
  }
  if(body.action==='reviewOnTimeRequest') {
   const decision=String(body.decision||'');
   insist(decision==='approved' || decision==='rejected','Choose approval or rejection.');
   const reviewNote=String(body.reviewNote||'').trim();
   insist(reviewNote.length<=500,'Admin note must be 500 characters or fewer.');
   const result=await transaction(pool,async db=>{
    const requestId=uuid(body.requestId);
    const request=(await db.query(`SELECT r.*, e.day::text, e.checked_in_at, e.status AS entry_status, e.late_seconds
      FROM kv_attendance.on_time_requests r JOIN kv_attendance.entries e ON e.id=r.entry_id
      WHERE r.id=$1 FOR UPDATE`,[requestId])).rows[0];
    insist(request,'Approval request not found.',404);
    insist(request.status==='pending','This request has already been reviewed.',409);
    const reviewedAt=clock();
    if(decision==='approved'){
      await db.query("UPDATE kv_attendance.entries SET checked_in_at=$2,status='on_time',late_seconds=0 WHERE id=$1",[request.entry_id,request.requested_checked_in_at]);
      await syncAutomaticLeaveDeductions(db,request.teacher_id,request.day);
    }
    const {rows}=await db.query(`UPDATE kv_attendance.on_time_requests
      SET status=$2, reviewed_by=$3, reviewed_at=$4, review_note=$5 WHERE id=$1
      RETURNING *`,[request.id,decision,staff.id,reviewedAt,reviewNote||null]);
    await audit(db,staff,`on_time_${decision}`,request.entry_id,{requestId:request.id,originalCheckedInAt:request.checked_in_at,requestedCheckedInAt:request.requested_checked_in_at,originalStatus:request.entry_status,reason:request.reason,reviewNote:reviewNote||null});
    return rows[0];
   });
   return res.status(200).json({request:result});
  }
  if(body.action==='createTeacher') {
   const name=String(body.name||'').trim();insist(name.length>0&&name.length<=120,'Enter a teacher name (up to 120 characters).');const id=randomUUID();
   const code=await transaction(pool,async db=>{const code=await allocateTeacherCode(db,codeSecret,body.code);await db.query("INSERT INTO kv_attendance.staff(id,name,role,code_lookup,code_hash) VALUES($1,$2,'teacher',$3,$4)",[id,name,lookupCode(code,codeSecret),hashCode(code)]);await audit(db,staff,'teacher_created',id,{name});return code;});
   return res.status(200).json({id,code});
  }
  const target=await teacher(pool,body.teacherId);
  if(body.action==='resetCode') {
   const code=await transaction(pool,async db=>{const code=await allocateTeacherCode(db,codeSecret,body.code);await lockTeacher(db,target.id);await db.query('UPDATE kv_attendance.staff SET code_lookup=$2,code_hash=$3 WHERE id=$1',[target.id,lookupCode(code,codeSecret),hashCode(code)]);await db.query('DELETE FROM kv_attendance.sessions WHERE staff_id=$1',[target.id]);await audit(db,staff,'code_reset',target.id,{});return code;});return res.status(200).json({code});
  }
  if(body.action==='setActive') {
   insist(typeof body.active==='boolean','Choose an active status.');await transaction(pool,async db=>{await lockTeacher(db,target.id);await db.query('UPDATE kv_attendance.staff SET active=$2 WHERE id=$1',[target.id,body.active]);await db.query('DELETE FROM kv_attendance.sessions WHERE staff_id=$1',[target.id]);await audit(db,staff,'active_changed',target.id,{active:body.active});});return res.status(200).json({ok:true});
  }
  if(body.action==='getTiming') {
   const versions=(await pool.query('SELECT id,effective_from::text FROM kv_attendance.schedule_versions WHERE teacher_id=$1 ORDER BY effective_from DESC',[target.id])).rows;
   for(const v of versions)v.days=(await pool.query('SELECT weekday,arrival,grace_minutes FROM kv_attendance.schedule_days WHERE version_id=$1 ORDER BY weekday',[v.id])).rows;
   const overrides=(await pool.query('SELECT *,day::text FROM kv_attendance.overrides WHERE teacher_id=$1 AND day>=$2 ORDER BY kv_attendance.overrides.day',[target.id,today])).rows;
   return res.status(200).json({versions,overrides});
  }
  if(body.action==='saveTiming') {
   const from=dateValue(body.effectiveFrom);insist(from>=today,'Schedule changes must start today or later.');const days=scheduleDays(body.days);
   await transaction(pool,async db=>{await lockTeacher(db,target.id);const old=(await db.query('SELECT v.effective_from::text,d.* FROM kv_attendance.schedule_versions v LEFT JOIN kv_attendance.schedule_days d ON d.version_id=v.id WHERE v.teacher_id=$1 AND v.effective_from=$2',[target.id,from])).rows;
    const {rows}=await db.query('INSERT INTO kv_attendance.schedule_versions(id,teacher_id,effective_from,created_by) VALUES($1,$2,$3,$4) ON CONFLICT(teacher_id,effective_from) DO UPDATE SET created_by=excluded.created_by RETURNING id',[randomUUID(),target.id,from,staff.id]);const id=rows[0].id;
    await db.query('DELETE FROM kv_attendance.schedule_days WHERE version_id=$1',[id]);for(const d of days)await db.query('INSERT INTO kv_attendance.schedule_days(version_id,weekday,arrival,grace_minutes) VALUES($1,$2,$3,$4)',[id,d.weekday,d.arrival,d.grace]);await audit(db,staff,'timing_saved',target.id,{effectiveFrom:from,before:old,days});
   });return res.status(200).json({ok:true});
  }
  if(body.action==='saveOverride') {
   const day=dateValue(body.day);insist(day>=today,'Overrides must be today or later.');insist(typeof body.dayOff==='boolean','Choose working day or day off.');const off=body.dayOff;const arrival=off?null:timeValue(body.arrival);const grace=off?null:graceValue(body.grace);const reason=String(body.reason||'').trim();insist(reason.length>0&&reason.length<=300,'Enter a reason (up to 300 characters).');
   await transaction(pool,async db=>{await lockTeacher(db,target.id);const before=(await db.query('SELECT * FROM kv_attendance.overrides WHERE teacher_id=$1 AND day=$2',[target.id,day])).rows[0]||null;await db.query(`INSERT INTO kv_attendance.overrides(id,teacher_id,day,day_off,arrival,grace_minutes,reason,created_by) VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT(teacher_id,day) DO UPDATE SET day_off=excluded.day_off,arrival=excluded.arrival,grace_minutes=excluded.grace_minutes,reason=excluded.reason,created_by=excluded.created_by`,[randomUUID(),target.id,day,off,arrival,grace,reason,staff.id]);await audit(db,staff,'override_saved',target.id,{before,day,dayOff:off,arrival,grace,reason});});return res.status(200).json({ok:true});
  }
  if(body.action==='deleteOverride') {
   const day=dateValue(body.day);insist(day>=today,'Past overrides cannot be deleted.');await transaction(pool,async db=>{await lockTeacher(db,target.id);const before=(await db.query('DELETE FROM kv_attendance.overrides WHERE teacher_id=$1 AND day=$2 RETURNING *',[target.id,day])).rows[0];if(before)await audit(db,staff,'override_deleted',target.id,{before});});return res.status(200).json({ok:true});
  }
  throw new PublicError('Unknown action.');
 }catch(error){if(!(error instanceof PublicError))console.error('Attendance request failed:',error.code||error.name);return res.status(error.status||500).json({error:error instanceof PublicError?error.message:'Attendance is unavailable. Please contact your administrator or retry shortly.'});}
}

}
export default createHandler();
