import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { iconPalette, resolveIconColor } from '../data/iconPalette';
import { defaultProfile } from '../data/defaultProfile';
import { generateSignatureHtml } from './generateSignatureHtml';
describe('exported icon colors',()=>{
 it('uses public PNG URLs in exports, not filters or embedded data',()=>{
  const html=generateSignatureHtml({...defaultProfile,iconColor:'blue'});
  expect(html).toContain('/icons/colors/blue/personal-email.png');
  expect(html).toContain('/icons/colors/blue/personal-linkedin.png');
  expect(html).not.toContain('filter:');expect(html).not.toContain('data:image');
 });
 it('handles business contact backgrounds and social strips separately',()=>{
  const html=generateSignatureHtml({...defaultProfile,mode:'business',iconColor:'auto',background:'#ffffff',accent:'#111111'});
  expect(html).toContain('/colors/white/personal-email.png');expect(html).toContain('/colors/black/personal-linkedin.png');
 });
 it('falls back safely and selects contrasting light and dark icons',()=>{
  expect(resolveIconColor('invalid')).toBe('default');
  expect(resolveIconColor('auto','#ffffff')).toBe('black');expect(resolveIconColor('auto','#000000')).toBe('white');
 });
 it('has all exported palette assets available for deployment',()=>{
  for(const {id} of iconPalette)for(const name of ['email','phone','website','linkedin','github','personal-email','personal-phone','personal-website','personal-linkedin','personal-github','personal-facebook','personal-twitter','personal-instagram','personal-whatsapp']){
    expect(existsSync(`public/icons/colors/${id}/${name}.png`)).toBe(true);
  }
 });
});
