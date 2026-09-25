import {describe,it,expect} from 'vitest';
import {defaultProfile} from '../data/defaultProfile';
import {generateSignatureHtml} from './generateSignatureHtml';
import {prepareGmailExport} from './gmailExport';
describe('logo business layout and social rail',()=>{
 it('enlarges logos with blank or whitespace-only company names without cropping',()=>{
  for(const company of ['', '   ']){
   const html=generateSignatureHtml({...defaultProfile,mode:'business',company,logoUrl:'https://example.com/logo.png'});
   expect(html).toContain('width="150"');expect(html).toContain('height:auto');expect(html).not.toContain('Your Company');
  }
 });
 it('supports a separate contact strip background with automatic text contrast',()=>{
  const html=generateSignatureHtml({...defaultProfile,mode:'business',accent:'#123456',contactStripColor:'#000000'});
  expect(html).toContain('background-color:#000000');expect(html).toContain('color:#ffffff');
  expect(html).toContain('data-business-socials="row"');
 });
 it('uses only the business logo, never a portrait',()=>{
  const p={...defaultProfile,mode:'business',logoUrl:'https://example.com/logo.png',photoUrl:'data:image/png;base64,YQ=='};
  const html=generateSignatureHtml(p);
  expect(html).toContain('business-logo');expect(html).toContain(p.logoUrl);expect(html).not.toContain(p.photoUrl);expect(prepareGmailExport(p).ready).toBe(true);
 });
 it('renders all enabled platforms with adaptive sizing and layout',()=>{
  for(const mode of ['personal','business']){
   const html=generateSignatureHtml({...defaultProfile,mode,links:['LinkedIn','Instagram','WhatsApp','Facebook'].map(label=>({label,url:`https://example.com/${label}`,enabled:true}))});
   expect(html).toContain('title="Facebook"');expect(html).toContain('personal-instagram.png');
   if(mode==='personal'){expect(html.match(/height:8px;background-color/g)).toHaveLength(3);expect(html).toContain('width:3px');}
   else {expect(html).toContain('data-business-socials="row"');expect(html).toContain('data-business-contacts="strip"');expect(html).not.toContain('height:20px;background-color');}
  }
 });
});
