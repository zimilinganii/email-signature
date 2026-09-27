import {it,expect} from 'vitest';
import {defaultProfile} from '../data/defaultProfile';
import {generateSignatureHtml} from './generateSignatureHtml';
import {saveDrafts,loadDrafts} from './draftStorage';
it('shows escaped business location below the role, but never in personal signatures',()=>{
 const profile={...defaultProfile,mode:'business',businessLocation:'Cape Town <Centre>'};
 const html=generateSignatureHtml(profile);
 expect(html).toContain('Cape Town &lt;Centre&gt;');expect(html.indexOf(profile.role)).toBeLessThan(html.indexOf('Cape Town'));
 expect(html).toContain('max-width:260px');
 expect(generateSignatureHtml({...profile,mode:'personal'})).not.toContain('Cape Town');
 expect(generateSignatureHtml({...profile,businessLocation:'   '})).not.toContain('data-business-location');
});
it('persists the optional location and defaults safely for older saved profiles',()=>{
 let value;const storage={setItem:(_,v)=>{value=v;},getItem:()=>value};
 saveDrafts({...defaultProfile,mode:'business',businessLocation:'Cape Town'},{},storage);
 expect(loadDrafts(storage).profile.businessLocation).toBe('Cape Town');
 const saved=JSON.parse(value);delete saved.profile.businessLocation;value=JSON.stringify(saved);
 expect(loadDrafts(storage).profile.businessLocation).toBe('');
});
