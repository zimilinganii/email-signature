import { businessSignature } from './businessSignature';
import { signatureFont } from '../data/signatureFonts';
import { isValidUrl } from './validateProfile';
import { personalSignature } from './personalSignature';
export const escapeHtml = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
const color = (v, fallback) => /^#[a-f0-9]{6}$/i.test(v) ? v : fallback;
export const safeImage = (url = '') => /^data:image\/(png|jpeg|webp);base64,[a-z0-9+/=]+$/i.test(url) || (url.startsWith('https://') && isValidUrl(url));

export function generateSignatureHtml(p, { preview = false } = {}) {
  const business = p.mode === 'business';
  const accent = color(p.accent, business ? '#b5ef39' : '#a6a8d4');
  const background = color(p.background, '#ffffff');
  const text = color(p.textColor, '#243b35');
  const html=(business?businessSignature:personalSignature)(p, { preview, accent, background, text, escapeHtml, safeImage });
  const family=signatureFont(p.fontFamily);
  // Explicit font on text-bearing cells/elements survives email-client table defaults.
  return html.replaceAll('font-family:Arial,Helvetica,sans-serif;',`font-family:${family};`).replace(/<(div|a|span|td)\b([^>]*)>/g,(tag,name,attrs)=>{
    if(attrs.includes('font-family:')||(name==='td'&&!/font-size:(?!0)/.test(attrs)))return tag;
    return attrs.includes('style="')?`<${name}${attrs.replace('style="',`style="font-family:${family};`)}>`:`<${name} style="font-family:${family};"${attrs}>`;
  });
}
