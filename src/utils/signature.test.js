import { describe, it, expect, vi, afterEach } from 'vitest';
import { generateSignatureHtml, safeImage } from './generateSignatureHtml';
import { defaultProfile } from '../data/defaultProfile';
import { installGmailSignature } from '../services/gmailSignatureService';
describe('safe, customizable signatures',()=>{
 it('escapes profile text and rejects executable links and image sources',()=>{const html=generateSignatureHtml({...defaultProfile,fullName:'<script>alert(1)</script>',photoUrl:'javascript:alert(1)',links:[{enabled:true,label:'Bad',url:'javascript:alert(1)'}]});expect(html).not.toContain('<script>');expect(html).not.toContain('javascript:');expect(html).toContain('&lt;script&gt;');});
 it('keeps business details out of personal signatures',()=>{const p={...defaultProfile,company:'Unique Business',logoUrl:'https://example.com/logo.png'};expect(generateSignatureHtml(p)).not.toContain('Unique Business');const html=generateSignatureHtml({...p,mode:'business'});expect(html).toContain('Unique Business');expect(html).toContain('https://example.com/logo.png');});
 it('exports chosen colors, layout and photo dimensions',()=>{const html=generateSignatureHtml({...defaultProfile,layout:'stack',background:'#112233',photoSize:120,photoUrl:'https://example.com/photo.png'});expect(html).toContain('background-color:#112233');expect(html).toContain('width="120"');expect(html).not.toContain('border-left:');});
 it('allows raster uploads but rejects SVG and insecure sources',()=>{expect(safeImage('data:image/png;base64,YQ==')).toBe(true);expect(safeImage('data:image/svg+xml;base64,YQ==')).toBe(false);expect(safeImage('http://example.com/image.png')).toBe(false);});
});
describe('Gmail installation',()=>{
 afterEach(()=>vi.unstubAllGlobals());
 it('patches only the primary account signature',async()=>{const mock=vi.fn().mockResolvedValueOnce({ok:true,json:async()=>({sendAs:[{sendAsEmail:'other@example.com'},{isPrimary:true,sendAsEmail:'me@example.com'}]})}).mockResolvedValueOnce({ok:true,json:async()=>({sendAsEmail:'me@example.com'})});vi.stubGlobal('fetch',mock);await installGmailSignature('test-token','<table></table>');expect(mock.mock.calls[1][0]).toContain('me%40example.com');expect(JSON.parse(mock.mock.calls[1][1].body)).toEqual({signature:'<table></table>'});});
 it('does not write when no primary address exists',async()=>{const mock=vi.fn().mockResolvedValue({ok:true,json:async()=>({sendAs:[]})});vi.stubGlobal('fetch',mock);await expect(installGmailSignature('test','html')).rejects.toThrow('primary');expect(mock).toHaveBeenCalledTimes(1);});
 it('reports authorization failures',async()=>{vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:false,status:401}));await expect(installGmailSignature('test','html')).rejects.toThrow('401');});
});
