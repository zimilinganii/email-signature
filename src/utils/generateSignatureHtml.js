import { businessSignature } from './businessSignature';
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
  if (!business) return personalSignature(p, { preview, accent, background, text, escapeHtml, safeImage });
  return businessSignature(p, { preview, accent, background, text, escapeHtml, safeImage });
}
