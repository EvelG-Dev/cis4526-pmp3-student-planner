import test from 'node:test';
import assert from 'node:assert/strict';
import {validateAssignment,sortAssignments} from '../dist/model.mjs';
const valid={title:'Report',course:'CIS4526',due:'2026-11-30'};
test('valid assignment is normalized',()=>assert.deepEqual(validateAssignment({...valid,title:' Report '}).value,valid));
test('all required fields reject blanks',()=>assert.deepEqual(Object.keys(validateAssignment({title:' ',course:'',due:''}).errors),['title','course','due']));
test('calendar validation rejects impossible dates and accepts leap day',()=>{
  for(const due of ['2026-02-29','2026-04-31','2026-13-01','0000-01-01','11/30/2026']) assert.equal(validateAssignment({...valid,due}).valid,false,due);
  assert.equal(validateAssignment({...valid,due:'2028-02-29'}).valid,true);
});
test('length boundaries allow limits and reject excess',()=>{
 assert.equal(validateAssignment({...valid,title:'a'.repeat(120),course:'b'.repeat(60)}).valid,true);
 assert.equal(validateAssignment({...valid,title:'a'.repeat(121)}).valid,false);
 assert.equal(validateAssignment({...valid,course:'b'.repeat(61)}).valid,false);
});
test('dates sort chronologically across months and years without changing input',()=>{
 const items=[{...valid,due:'2027-01-01'},{...valid,due:'2026-12-01'},valid];
 assert.deepEqual(sortAssignments(items).map(x=>x.due),['2026-11-30','2026-12-01','2027-01-01']);
 assert.equal(items[0].due,'2027-01-01');
});
