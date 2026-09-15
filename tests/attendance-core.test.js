import test from 'node:test';
import assert from 'node:assert/strict';
import {CAMPUS,distanceMeters,campusLocation,schoolDay,classify,locationValue,scheduleDays,dateValue,hashCode,verifyCode,lookupCode} from '../lib/attendance-core.js';
test('Indian school date crosses midnight before UTC',()=>{assert.equal(schoolDay(new Date('2026-09-13T18:30:00Z')),'2026-09-14');});
test('teacher-specific arrival and inclusive grace boundary',()=>{
 assert.equal(classify('2026-09-14','08:00',5,new Date('2026-09-14T08:05:00+05:30')).status,'on_time');
 assert.equal(classify('2026-09-14','08:00',5,new Date('2026-09-14T08:05:01+05:30')).lateSeconds,1);
 assert.equal(classify('2026-09-14','08:30',0,new Date('2026-09-14T08:05:01+05:30')).status,'on_time');
});
test('invalid, inaccurate, stale and future locations rejected',()=>{const now=new Date('2026-09-14T08:00:00+05:30');const good={latitude:28,longitude:77,accuracy:15,capturedAt:now.toISOString()};assert.equal(locationValue(good,now).accuracy,15);for(const bad of [{latitude:91},{longitude:181},{accuracy:1001},{accuracy:NaN},{capturedAt:'bad'},{capturedAt:new Date(now-120001).toISOString()},{capturedAt:new Date(+now+30001).toISOString()}])assert.throws(()=>locationValue({...good,...bad},now));});
test('schedule validates duplicate weekdays, clock and grace',()=>{assert.equal(scheduleDays([{weekday:1,arrival:'08:00',grace:0}]).length,1);for(const days of [[{weekday:8,arrival:'08:00',grace:0}],[{weekday:1,arrival:'25:00',grace:0}],[{weekday:1,arrival:'08:00',grace:-1}],[{weekday:1,arrival:'08:00',grace:0},{weekday:1,arrival:'09:00',grace:0}]])assert.throws(()=>scheduleDays(days));assert.throws(()=>dateValue('2026-02-30'));});
test('codes are normalized, salted and verified',()=>{const hash=hashCode('abcd1234');assert.ok(verifyCode('ABCD-1234',hash));assert.ok(!verifyCode('wrong',hash));assert.notEqual(hash,hashCode('abcd1234'));assert.equal(lookupCode('ab-cd','secret'),lookupCode('ABCD','secret'));});

// Attendance must never select the portal database as a fallback.
test('attendance database configuration is isolated from the portal',async()=>{
 const {database}=await import('../lib/attendance-db.js');
 const names=['ATTENDANCE_DATABASE_URL','KIDSVERSE_DATABASE_URL','DATABASE_URL','POSTGRES_URL','ATTENDANCE_POSTGRES_SSL','POSTGRES_SSL'];
 const saved=Object.fromEntries(names.map(name=>[name,process.env[name]]));
 let pool;try{
 delete process.env.ATTENDANCE_DATABASE_URL;
 for(const name of ['KIDSVERSE_DATABASE_URL','DATABASE_URL','POSTGRES_URL'])process.env[name]='postgresql://portal:example@localhost/portal';
 assert.throws(()=>database(),/ATTENDANCE_DATABASE_URL/);
 process.env.ATTENDANCE_DATABASE_URL='postgresql://attendance:example@localhost/attendance';
 process.env.POSTGRES_SSL='false';delete process.env.ATTENDANCE_POSTGRES_SSL;
 pool=database();assert.equal(pool.options.connectionString,process.env.ATTENDANCE_DATABASE_URL);assert.deepEqual(pool.options.ssl,{rejectUnauthorized:true});
 }finally{if(pool)await pool.end();for(const name of names){if(saved[name]===undefined)delete process.env[name];else process.env[name]=saved[name];}}
});

test('school boundary uses a strict five-metre radius and accuracy limit',()=>{
 const delta=metres=>metres/6371008.8*180/Math.PI;
 const fix={latitude:CAMPUS.latitude,longitude:CAMPUS.longitude,accuracy:2};
 assert.equal(distanceMeters(fix.latitude,fix.longitude),0);
 assert.equal(campusLocation(fix),fix);
 assert.ok(distanceMeters(fix.latitude+delta(4.99),fix.longitude)<5);
 assert.doesNotThrow(()=>campusLocation({...fix,latitude:fix.latitude+delta(4.99)}));
 assert.throws(()=>campusLocation({...fix,latitude:fix.latitude+delta(5.01)}),/within 5 m/);
 assert.doesNotThrow(()=>campusLocation({...fix,accuracy:5}));
 assert.throws(()=>campusLocation({...fix,accuracy:5.01}),/accuracy of 5 m/);
 assert.throws(()=>campusLocation({...fix,latitude:32,longitude:75}),/within 5 m/);
});
