import { defaultProfile } from '../data/defaultProfile';

export const DRAFT_STORAGE_KEY='sincerely.signature-drafts.v1';
// Only profile fields are persisted. OAuth/session state never enters this schema.
function normalizeProfile(value) {
  if(!value||typeof value!=='object'||!['personal','business'].includes(value.mode))return null;
  const result=structuredClone(defaultProfile);
  for(const [key,fallback] of Object.entries(defaultProfile)){
    if(key==='links')continue;
    if(typeof value[key]===typeof fallback && (typeof fallback!=='number'||Number.isFinite(value[key])))result[key]=value[key];
  }
  if(Array.isArray(value.links))result.links=value.links.filter(l=>l&&typeof l.label==='string'&&typeof l.url==='string').map((l,i)=>({id:typeof l.id==='string'?l.id:`saved-${i}`,label:l.label,url:l.url,enabled:l.enabled===true}));
  return result;
}
export function loadDrafts(storage=window.localStorage) {
  try {
    const saved=JSON.parse(storage.getItem(DRAFT_STORAGE_KEY)||'null');
    if(saved?.version!==1)return null;
    const profile=normalizeProfile(saved.profile);
    if(!profile)return null;
    const drafts={};
    for(const mode of ['personal','business']){const draft=normalizeProfile(saved.drafts?.[mode]);if(draft&&draft.mode===mode)drafts[mode]=draft;}
    return {profile,drafts};
  }catch{return null;}
}
export function saveDrafts(profile,drafts,storage=window.localStorage) {
  const safeDrafts={};
  for(const mode of ['personal','business']){const draft=normalizeProfile(drafts[mode]);if(draft&&draft.mode===mode)safeDrafts[mode]=draft;}
  const current=normalizeProfile(profile);
  safeDrafts[current.mode]=current;
  storage.setItem(DRAFT_STORAGE_KEY,JSON.stringify({version:1,profile:current,drafts:safeDrafts}));
}
export function clearDrafts(storage=window.localStorage){storage.removeItem(DRAFT_STORAGE_KEY);}
