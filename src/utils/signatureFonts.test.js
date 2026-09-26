import {it,expect} from 'vitest';
import {defaultProfile} from '../data/defaultProfile';
import {generateSignatureHtml} from './generateSignatureHtml';
import {signatureFonts} from '../data/signatureFonts';
it('exports every allowed font for both templates with no conflicting Arial declarations',()=>{
 for(const font of signatureFonts)for(const mode of ['personal','business']){
  const html=generateSignatureHtml({...defaultProfile,mode,fontFamily:font.id,businessLocation:'City',tagline:'Hello'});
  expect(html).toContain(`font-family:${font.family};`);
  if(font.id!=='arial')expect(html).not.toContain('font-family:Arial,Helvetica,sans-serif;');
 }
});
it('rejects arbitrary CSS in saved font values',()=>{
 const html=generateSignatureHtml({...defaultProfile,fontFamily:'bad;background:url(evil)'});
 expect(html).not.toContain('evil');expect(html).toContain('font-family:Arial,Helvetica,sans-serif;');
});
