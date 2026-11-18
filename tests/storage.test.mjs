import test from 'node:test';
import assert from 'node:assert/strict';
import {loadAssignments,saveAssignments,STORAGE_KEY} from '../dist/storage.mjs';
import {setCompleted} from '../dist/model.mjs';
const item={id:'demo-1',title:'Report',course:'CIS4526',due:'2026-11-30',completed:false};
function memory(){let raw=null;return {getItem:()=>raw,setItem:(key,value)=>{assert.equal(key,STORAGE_KEY);raw=value;}};}
test('empty storage is a writable empty list',()=>assert.deepEqual(loadAssignments(memory()),{items:[],writable:true,warning:''}));
test('assignments and completion survive a storage round trip',()=>{
 const store=memory();assert.equal(saveAssignments(store,[item]).saved,true);
 assert.deepEqual(loadAssignments(store).items,[item]);
 const done=setCompleted(loadAssignments(store).items,item.id,true);
 saveAssignments(store,done);assert.equal(loadAssignments(store).items[0].completed,true);
 assert.equal(item.completed,false);assert.equal(setCompleted(done,item.id,false)[0].completed,false);
});
test('corrupt or unsupported storage stays untouched',()=>{
 for(const raw of ['broken','null',JSON.stringify({version:2,items:[]}),JSON.stringify({version:1,items:[{...item,due:'2026-02-30'}]}),JSON.stringify({version:1,items:[item,item]})]){
  let writes=0;const store={getItem:()=>raw,setItem:()=>writes++};const result=loadAssignments(store);
  assert.equal(result.writable,false);assert.deepEqual(result.items,[]);assert.ok(result.warning);assert.equal(writes,0);
 }
});
test('unavailable storage and quota errors expose warnings',()=>{
 assert.equal(loadAssignments(null).writable,false);
 const result=saveAssignments({setItem(){throw new Error('quota');}},[item]);
 assert.equal(result.saved,false);assert.ok(result.warning);
});
test('untrusted stored values reject invalid identities and completion types',()=>{
 for(const patch of [{id:'<x>'},{completed:'false'},{title:''}]){
  const store={getItem:()=>JSON.stringify({version:1,items:[{...item,...patch}]})};
  assert.equal(loadAssignments(store).writable,false);
 }
});
