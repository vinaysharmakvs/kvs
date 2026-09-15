import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
export const ZONE = 'Asia/Kolkata';
export class PublicError extends Error { constructor(message, status=400) { super(message); this.status=status; } }
export function insist(condition, message, status=400) { if (!condition) throw new PublicError(message,status); }
export const digest = value => createHash('sha256').update(value).digest('hex');
export const normalizeCode = value => String(value || '').replace(/[\s-]/g,'').toUpperCase();
export const lookupCode = (code,secret) => createHmac('sha256',secret).update(normalizeCode(code)).digest('hex');
export function hashCode(code) { const salt=randomBytes(16).toString('hex'); return `${salt}:${scryptSync(normalizeCode(code),salt,64).toString('hex')}`; }
export function verifyCode(code,stored) { const [salt,hash]=stored.split(':'); const actual=scryptSync(normalizeCode(code),salt,64); const expected=Buffer.from(hash,'hex'); return expected.length===actual.length && timingSafeEqual(actual,expected); }
export const newCode = () => randomBytes(12).toString('hex').toUpperCase();
export function schoolDay(now=new Date()) { return new Intl.DateTimeFormat('en-CA',{timeZone:ZONE,year:'numeric',month:'2-digit',day:'2-digit'}).format(now); }
export function dateValue(value) { insist(typeof value==='string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0,10)===value,'Choose a valid date.'); return value; }
export function timeValue(value) { insist(typeof value==='string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value),'Choose a valid arrival time.'); return value; }
export function graceValue(value) { insist(Number.isInteger(value) && value>=0 && value<=120,'Grace must be between 0 and 120 minutes.'); return value; }
export function uuid(value) { insist(typeof value==='string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value),'Invalid teacher.'); return value; }
export function locationValue(loc,now=new Date()) {
 insist(loc && ['latitude','longitude','accuracy'].every(k=>typeof loc[k]==='number' && Number.isFinite(loc[k])),'A valid location is required.');
 insist(Math.abs(loc.latitude)<=90 && Math.abs(loc.longitude)<=180 && loc.accuracy>=0 && loc.accuracy<=1000,'Location accuracy is too low. Move near a window and retry.');
 const captured=new Date(loc.capturedAt); const age=now-captured;
 insist(Number.isFinite(age) && age>=-30000 && age<=120000,'Location expired. Capture your location again.');
 return {...loc,capturedAt:captured.toISOString()};
}
export function classify(day,arrival,grace,now) {
 const approved=new Date(`${day}T${arrival.slice(0,5)}:00+05:30`);
 const cutoff=new Date(approved.getTime()+grace*60000);
 return {approved,cutoff,status:now>cutoff?'late':'on_time',lateSeconds:Math.max(0,Math.ceil((now-cutoff)/1000))};
}
export function scheduleDays(days) {
 insist(Array.isArray(days) && days.length<=7,'Provide up to seven weekdays.');
 const used=new Set(); return days.map(d=>{insist(Number.isInteger(d.weekday) && d.weekday>=1 && d.weekday<=7 && !used.has(d.weekday),'Choose each weekday only once.');used.add(d.weekday);return {weekday:d.weekday,arrival:timeValue(d.arrival),grace:graceValue(d.grace)};});
}

// Google Maps place marker (!3d/!4d), not the map camera's @ coordinates.
export const CAMPUS=Object.freeze({name:'Kidsverse School Rehan',latitude:32.1580283,longitude:75.9101877,radiusMeters:100,maxAccuracyMeters:100,mapUrl:'https://maps.app.goo.gl/Rw5mNxZxhuVedfAW8'});
export function distanceMeters(latitude,longitude) {
 const rad=n=>n*Math.PI/180;
 const dLat=rad(latitude-CAMPUS.latitude),dLon=rad(longitude-CAMPUS.longitude);
 const a=Math.sin(dLat/2)**2+Math.cos(rad(CAMPUS.latitude))*Math.cos(rad(latitude))*Math.sin(dLon/2)**2;
 return 6371008.8*2*Math.atan2(Math.sqrt(Math.min(1,a)),Math.sqrt(Math.max(0,1-a)));
}
export function campusLocation(loc) {
 const distance=distanceMeters(loc.latitude,loc.longitude);
 insist(Number.isFinite(distance) && loc.accuracy<=CAMPUS.maxAccuracyMeters,`GPS accuracy is Â±${Math.ceil(loc.accuracy)} m. This check-in requires accuracy of 100 m or better. Enable precise location, move to the school map pin, and retry.`,422);
 insist(distance<=CAMPUS.radiusMeters,`You are approximately ${Math.ceil(distance)} m from the school map pin. Attendance is allowed only within 100 m. Move to the approved location and retry.`,403);
 return loc;
}
