import {describe,it,expect} from 'vitest';
import {defaultProfile} from '../data/defaultProfile';
import {generateSignatureHtml} from './generateSignatureHtml';
import {prepareGmailExport} from './gmailExport';
describe('logo business layout and social rail',()=>{
 it('uses only the business logo, never a portrait',()=>{
  const p={...defaultProfile,mode:'business',logoUrl:'https://example.com/logo.png',photoUrl:'data:image/png;base64,YQ=='};
  const html=generateSignatureHtml(p);
  expect(html).toContain('business-logo');expect(html).toContain(p.logoUrl);expect(html).not.toContain(p.photoUrl);expect(prepareGmailExport(p).ready).toBe(true);
 });
 it('limits both templates to three icons and two thick separators',()=>{
  for(const mode of ['personal','business']){
   const html=generateSignatureHtml({...defaultProfile,mode,links:['LinkedIn','Instagram','WhatsApp','Facebook'].map(label=>({label,url:`https://example.com/${label}`,enabled:true}))});
   expect(html).not.toContain('title="Facebook"');expect(html).toContain('personal-instagram.png');
   if(mode==='personal'){expect(html.match(/height:20px;background-color/g)).toHaveLength(2);expect(html).toContain('width:3px');}
   else {expect(html).toContain('data-business-socials="row"');expect(html).toContain('data-business-contacts="strip"');expect(html).not.toContain('height:20px;background-color');}
  }
 });
});
