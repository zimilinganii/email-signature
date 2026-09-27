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
it('scales text consistently and bounds saved sizes',()=>{
 for(const mode of ['personal','business']){
  const render=fontSize=>generateSignatureHtml({...defaultProfile,mode,fontSize});
  expect(render(17)).toContain('font-size:17px;');
  expect(render(100)).toBe(render(17));
  expect(render(1)).toBe(render(11));
  expect(render('invalid')).toBe(render(13));
 }
});
it('supports custom business contact ink with safe automatic fallback',()=>{
 const render=contactTextColor=>generateSignatureHtml({...defaultProfile,mode:'business',contactStripColor:'#000000',contactTextColor});
 expect(render('#abcdef')).toContain('color:#abcdef;');
 expect(render('invalid')).toBe(render(''));
 expect(render('')).toContain('color:#ffffff;');
});
