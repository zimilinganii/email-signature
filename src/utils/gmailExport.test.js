import { describe,it,expect,vi,afterEach } from 'vitest';
import { defaultProfile } from '../data/defaultProfile';
import { prepareGmailExport,compactSignatureHtml,GMAIL_COPY_BUDGET } from './gmailExport';
import { installGmailSignature } from '../services/gmailSignatureService';
afterEach(()=>vi.unstubAllGlobals());
describe('Gmail copy safeguards',()=>{
 it('keeps a hosted-photo signature below the conservative limit',()=>{const result=prepareGmailExport({...defaultProfile,photoUrl:'https://example.com/photo.png'});expect(result.ready).toBe(true);expect(result.characters).toBeLessThan(GMAIL_COPY_BUDGET);expect(result.html).toContain('mailto:you@example.com');expect(result.html).toContain('https://example.com/photo.png');});
 it('blocks embedded uploads and only omits them by explicit choice',()=>{const profile={...defaultProfile,photoUrl:'data:image/png;base64,'+'A'.repeat(30000)};expect(prepareGmailExport(profile).ready).toBe(false);const result=prepareGmailExport(profile,{omitUploads:true});expect(result.ready).toBe(true);expect(result.html).not.toContain('data:image');expect(result.html).toContain('https://github.com/your-profile');expect(profile.photoUrl).toContain('data:image');});
 it('handles business logo uploads without dropping hosted images',()=>{const result=prepareGmailExport({...defaultProfile,mode:'business',photoUrl:'data:image/png;base64,YQ==',logoUrl:'https://example.com/logo.png'},{omitUploads:true});expect(result.ready).toBe(true);expect(result.html).not.toContain('data:image');expect(result.html).toContain('https://example.com/logo.png');});
 it('blocks excessive link markup even when no uploads exist',()=>{const result=prepareGmailExport({...defaultProfile,links:Array.from({length:100},(_,i)=>({enabled:true,label:'LinkedIn',url:`https://example.com/${i}${'a'.repeat(4000)}`}))});expect(result.ready).toBe(false);expect(result.hasUploads).toBe(false);});
 it('keeps the final CSS declaration and preserves visible whitespace',()=>{expect(compactSignatureHtml('<td data-test="x" style="font-size:13px;font-size:12px;">A  B</td>')).toBe('<td style="font-size:12px">A  B</td>');});
 it('rejects oversized or embedded signatures before making Gmail requests',async()=>{const fetch=vi.fn();vi.stubGlobal('fetch',fetch);await expect(installGmailSignature('mock','a'.repeat(9000))).rejects.toThrow('Shorten');await expect(installGmailSignature('mock','<img src="data:image/png;base64,YQ==">')).rejects.toThrow('HTTPS');expect(fetch).not.toHaveBeenCalled();});
});
