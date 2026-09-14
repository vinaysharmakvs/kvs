import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import {PGlite} from '@electric-sql/pglite';
import {createHandler} from '../api/attendance.js';
import {hashCode,lookupCode,schoolDay} from '../lib/attendance-core.js';
test('full attendance API against an isolated PostgreSQL engine',async()=>{
 process.env.ATTENDANCE_CODE_SECRET='test-secret-with-at-least-thirty-two-characters';
 const db=new PGlite();await db.exec(await readFile(new URL('../database/attendance-schema.sql',import.meta.url),'utf8'));
 const pool={query:(...args)=>db.query(...args),connect:async()=>({query:(...args)=>db.query(...args),release(){}})};
 let now=new Date(`${schoolDay()}T08:05:00+05:30`);const day=schoolDay(now);const weekday=new Date(day+'T12:00:00Z').getUTCDay()||7;
 const handler=createHandler({getDatabase:()=>pool,clock:()=>now});
 const adminId=randomUUID();await db.query("INSERT INTO kv_attendance.staff(id,name,role,code_lookup,code_hash) VALUES($1,'Admin','admin',$2,$3)",[adminId,lookupCode('ADMINCODE',process.env.ATTENDANCE_CODE_SECRET),hashCode('ADMINCODE')]);
 async function call(action,data={},cookie='',origin='http://localhost:8765') {let status,body;const headers={};const req={method:'POST',headers:{'content-type':'application/json',host:'localhost:8765',origin,cookie},body:{action,...data},socket:{remoteAddress:'test'}};const res={setHeader:(k,v)=>headers[k]=v,status(code){status=code;return this;},json(value){body=value;return this;}};await handler(req,res);return{status,body,cookie:headers['Set-Cookie']?.split(';')[0],headers};}
 assert.equal((await call('me')).status,401);
 assert.equal((await call('login',{code:'ADMINCODE'},'','https://evil.example')).status,403);
 const adminLogin=await call('login',{code:'ADMINCODE'});assert.equal(adminLogin.status,200);const admin=adminLogin.cookie;assert.match(adminLogin.headers['Set-Cookie'],/HttpOnly; SameSite=Strict/);
 const created=await call('createTeacher',{name:'Ananya'},admin);assert.equal(created.status,200);const id=created.body.id;
 const login=await call('login',{code:created.body.code});const teacherCookie=login.cookie;assert.equal(login.status,200);
 assert.equal((await call('createTeacher',{name:'Intruder'},teacherCookie)).status,403);
 assert.equal((await call('dashboard',{},teacherCookie)).status,403);
 const loc=()=>({latitude:28.6,longitude:77.2,accuracy:15,capturedAt:now.toISOString()});
 assert.equal((await call('checkin',{location:loc()},teacherCookie)).status,409);
 assert.equal((await call('saveTiming',{teacherId:id,effectiveFrom:day,days:[{weekday,arrival:'08:00',grace:5}]},admin)).status,200);
 assert.equal((await call('getTiming',{teacherId:id},admin)).status,200);
 assert.equal((await call('checkin',{location:{...loc(),accuracy:1001}},teacherCookie)).status,400);
 assert.equal((await call('checkin',{location:{...loc(),capturedAt:new Date(now-180000).toISOString()}},teacherCookie)).status,400);
 const marked=await call('checkin',{location:loc()},teacherCookie);assert.equal(marked.status,200);assert.equal(marked.body.entry.status,'on_time');
 assert.equal((await call('history',{},teacherCookie)).body.entries.length,1);
 now=new Date(+now+60000);
 const duplicate=await call('checkin',{},teacherCookie);assert.equal(duplicate.status,200);assert.equal(duplicate.body.entry.id,marked.body.entry.id);
 assert.equal((await db.query('SELECT count(*)::int AS n FROM kv_attendance.entries')).rows[0].n,1);
 await call('saveTiming',{teacherId:id,effectiveFrom:day,days:[{weekday,arrival:'07:00',grace:0}]},admin);
 assert.equal(new Date((await call('me',{},teacherCookie)).body.entry.approved_arrival_at).getTime(),new Date(`${day}T08:00:00+05:30`).getTime());
 const futureDay=schoolDay(new Date(+now+86400000));await call('saveOverride',{teacherId:id,day:futureDay,dayOff:false,arrival:'09:00',grace:0,reason:'Training'},admin);
 now=new Date(`${futureDay}T09:00:01+05:30`);
 const late=await call('checkin',{location:loc()},teacherCookie);assert.equal(late.status,200);assert.equal(late.body.entry.status,'late');assert.equal(late.body.entry.late_seconds,1);
 const nextDay=schoolDay(new Date(+now+86400000));await call('saveOverride',{teacherId:id,day:nextDay,dayOff:true,reason:'Day off'},admin);now=new Date(`${nextDay}T08:00:00+05:30`);assert.equal((await call('checkin',{location:loc()},teacherCookie)).status,409);
 assert.equal((await call('saveTiming',{teacherId:id,effectiveFrom:day,days:[]},admin)).status,400);
 const reset=await call('resetCode',{teacherId:id},admin);assert.equal(reset.status,200);assert.equal((await call('me',{},teacherCookie)).status,401);assert.equal((await call('login',{code:created.body.code})).status,401);
 const refreshed=await call('login',{code:reset.body.code});assert.equal(refreshed.status,200);await call('setActive',{teacherId:id,active:false},admin);assert.equal((await call('me',{},refreshed.cookie)).status,401);
 for(let i=0;i<16;i++){const r=await call('login',{code:'BADCODE'});if(i===15)assert.equal(r.status,429);}
 assert.ok((await db.query('SELECT count(*)::int AS n FROM kv_attendance.audit')).rows[0].n>=6);
 await db.close();
});

test('simple admin password creates one admin, rejects invalid attempts and revokes old sessions on password change',async()=>{
 const previousSecret=process.env.ATTENDANCE_CODE_SECRET,previousPassword=process.env.ATTENDANCE_ADMIN_PASSWORD;
 process.env.ATTENDANCE_CODE_SECRET='simple-admin-test-secret-at-least-32-characters';
 const db=new PGlite();await db.exec(await readFile(new URL('../database/attendance-schema.sql',import.meta.url),'utf8'));
 const handler=createHandler({getDatabase:()=>({query:(...a)=>db.query(...a),connect:async()=>({query:(...a)=>db.query(...a),release(){}})})});
 async function call(action,data={},cookie='') {let status,body;const headers={};const req={method:'POST',headers:{'content-type':'application/json',host:'localhost',origin:'http://localhost',cookie},body:{action,...data},socket:{remoteAddress:'admin-test'}};const res={setHeader:(k,v)=>headers[k]=v,status(c){status=c;return this;},json(v){body=v;}};await handler(req,res);return {status,body,cookie:headers['Set-Cookie']?.split(';')[0]};}
 try{
 delete process.env.ATTENDANCE_ADMIN_PASSWORD;
 assert.equal((await call('adminLogin',{password:'anything'})).status,503);
 process.env.ATTENDANCE_ADMIN_PASSWORD='Short';assert.equal((await call('adminLogin',{password:'Short'})).status,503);
 process.env.ATTENDANCE_ADMIN_PASSWORD='Private Admin Password 2026!';
 assert.equal((await call('adminLogin',{password:'WrongPassword2026!'})).status,401);
 assert.equal((await call('adminLogin',{password:'private admin password 2026!'})).status,401);
 assert.equal((await db.query('SELECT count(*)::int n FROM kv_attendance.staff')).rows[0].n,0);
 const logged=await call('adminLogin',{password:process.env.ATTENDANCE_ADMIN_PASSWORD});assert.equal(logged.status,200);assert.equal(logged.body.staff.role,'admin');
 assert.equal((await call('dashboard',{},logged.cookie)).status,200);
 await call('adminLogin',{password:process.env.ATTENDANCE_ADMIN_PASSWORD});assert.equal((await db.query('SELECT count(*)::int n FROM kv_attendance.staff')).rows[0].n,1);
 assert.equal((await db.query("SELECT count(*)::int n FROM kv_attendance.audit WHERE action='password_admin_created'")).rows[0].n,1);
 assert.equal((await call('login',{code:process.env.ATTENDANCE_ADMIN_PASSWORD})).status,401);
 const created=await call('createTeacher',{name:'Teacher Test'},logged.cookie);assert.equal(created.status,200);
 const teacherLogin=await call('login',{code:created.body.code});assert.equal(teacherLogin.status,200);assert.equal((await call('dashboard',{},teacherLogin.cookie)).status,403);
 process.env.ATTENDANCE_ADMIN_PASSWORD='Changed Private Admin Password 2026!';
 assert.equal((await call('me',{},logged.cookie)).status,401);
 const updated=await call('adminLogin',{password:process.env.ATTENDANCE_ADMIN_PASSWORD});assert.equal(updated.status,200);
 assert.equal((await call('me',{},teacherLogin.cookie)).status,200);
 delete process.env.ATTENDANCE_ADMIN_PASSWORD;assert.equal((await call('me',{},updated.cookie)).status,401);
 process.env.ATTENDANCE_ADMIN_PASSWORD='Changed Private Admin Password 2026!';
 await db.query('UPDATE kv_attendance.staff SET active=false WHERE id=$1',[logged.body.staff.id]);assert.equal((await call('adminLogin',{password:process.env.ATTENDANCE_ADMIN_PASSWORD})).status,403);
 for(let i=0;i<16;i++){const r=await call('adminLogin',{password:'invalid'});if(i===15)assert.equal(r.status,429);}
 }finally{await db.close();if(previousSecret===undefined)delete process.env.ATTENDANCE_CODE_SECRET;else process.env.ATTENDANCE_CODE_SECRET=previousSecret;if(previousPassword===undefined)delete process.env.ATTENDANCE_ADMIN_PASSWORD;else process.env.ATTENDANCE_ADMIN_PASSWORD=previousPassword;}
});
