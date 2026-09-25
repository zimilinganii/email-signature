import {describe,it,expect} from 'vitest';
import {loadDrafts,saveDrafts,clearDrafts,DRAFT_STORAGE_KEY} from './draftStorage';
import {defaultProfile} from '../data/defaultProfile';
const memory=()=>{const values=new Map();return {getItem:key=>values.get(key)||null,setItem:(key,value)=>values.set(key,value),removeItem:key=>values.delete(key)};};
describe('browser draft persistence',()=>{
 it('restores both drafts and excludes tokens and unrecognized properties',()=>{
  const storage=memory();saveDrafts({...defaultProfile,fullName:'Alex',token:'secret'}, {business:{...defaultProfile,mode:'business',company:'Acme',session:{token:'secret'}}},storage);
  const loaded=loadDrafts(storage);expect(loaded.profile.fullName).toBe('Alex');expect(loaded.drafts.business.company).toBe('Acme');expect(storage.getItem(DRAFT_STORAGE_KEY)).not.toContain('secret');
  clearDrafts(storage);expect(loadDrafts(storage)).toBe(null);
 });
 it('recovers safely from corrupt, incompatible and incorrectly typed data',()=>{
  const storage=memory();storage.setItem(DRAFT_STORAGE_KEY,'{');expect(loadDrafts(storage)).toBe(null);
  storage.setItem(DRAFT_STORAGE_KEY,JSON.stringify({version:99}));expect(loadDrafts(storage)).toBe(null);
  storage.setItem(DRAFT_STORAGE_KEY,JSON.stringify({version:1,profile:{mode:'personal',fullName:{bad:true},links:[null]}}));expect(loadDrafts(storage).profile.fullName).toBe(defaultProfile.fullName);
 });
 it('surfaces write failures so the UI cannot claim a draft was saved',()=>{
  expect(()=>saveDrafts(defaultProfile,{}, {setItem:()=>{throw new Error('Quota exceeded');}})).toThrow('Quota');
 });
});
