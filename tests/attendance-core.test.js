import test from 'node:test';
import assert from 'node:assert/strict';
import {schoolDay,classify,locationValue,scheduleDays,dateValue,hashCode,verifyCode,lookupCode} from '../lib/attendance-core.js';
test('Indian school date crosses midnight before UTC',()=>{assert.equal(schoolDay(new Date('2026-09-13T18:30:00Z')),'2026-09-14');});
test('teacher-specific arrival and inclusive grace boundary',()=>{
 assert.equal(classify('2026-09-14','08:00',5,new Date('2026-09-14T08:05:00+05:30')).status,'on_time');
 assert.equal(classify('2026-09-14','08:00',5,new Date('2026-09-14T08:05:01+05:30')).lateSeconds,1);
 assert.equal(classify('2026-09-14','08:30',0,new Date('2026-09-14T08:05:01+05:30')).status,'on_time');
});
test('invalid, inaccurate, stale and future locations rejected',()=>{const now=new Date('2026-09-14T08:00:00+05:30');const good={latitude:28,longitude:77,accuracy:15,capturedAt:now.toISOString()};assert.equal(locationValue(good,now).accuracy,15);for(const bad of [{latitude:91},{longitude:181},{accuracy:1001},{accuracy:NaN},{capturedAt:'bad'},{capturedAt:new Date(now-120001).toISOString()},{capturedAt:new Date(+now+30001).toISOString()}])assert.throws(()=>locationValue({...good,...bad},now));});
test('schedule validates duplicate weekdays, clock and grace',()=>{assert.equal(scheduleDays([{weekday:1,arrival:'08:00',grace:0}]).length,1);for(const days of [[{weekday:8,arrival:'08:00',grace:0}],[{weekday:1,arrival:'25:00',grace:0}],[{weekday:1,arrival:'08:00',grace:-1}],[{weekday:1,arrival:'08:00',grace:0},{weekday:1,arrival:'09:00',grace:0}]])assert.throws(()=>scheduleDays(days));assert.throws(()=>dateValue('2026-02-30'));});
test('codes are normalized, salted and verified',()=>{const hash=hashCode('abcd1234');assert.ok(verifyCode('ABCD-1234',hash));assert.ok(!verifyCode('wrong',hash));assert.notEqual(hash,hashCode('abcd1234'));assert.equal(lookupCode('ab-cd','secret'),lookupCode('ABCD','secret'));});
