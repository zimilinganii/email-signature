import {it,expect} from 'vitest';
import {generateSignatureHtml} from './generateSignatureHtml';
import {defaultProfile} from '../data/defaultProfile';

it('uses the selected accent for the thicker outer photo ring in preview and export',()=>{
 for(const preview of [true,false]){
  const html=generateSignatureHtml({...defaultProfile,accent:'#237b58',photoUrl:'https://example.com/photo.png'},{preview});
  expect(html).toContain('border:2px solid #237b58');
  expect(html).toContain('border:5px solid #237b58');
  expect(html).not.toContain('#d0d1e7');
 }
});
