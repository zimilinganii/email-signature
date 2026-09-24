import { isValidUrl } from './validateProfile';
import { iconUrl, socialIconName } from './signatureIcons';
import { personalSignature } from './personalSignature';
import { themedIconName } from '../data/iconPalette';
export const escapeHtml = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
const color = (v, fallback) => /^#[a-f0-9]{6}$/i.test(v) ? v : fallback;
const size = (v, fallback) => Math.max(40, Math.min(180, Number(v) || fallback));
export const safeImage = (url = '') => /^data:image\/(png|jpeg|webp);base64,[a-z0-9+/=]+$/i.test(url) || (url.startsWith('https://') && isValidUrl(url));

export function generateSignatureHtml(p, { preview = false } = {}) {
  const business = p.mode === 'business';
  const accent = color(p.accent, business ? '#b5ef39' : '#a6a8d4');
  const background = color(p.background, '#ffffff');
  const text = color(p.textColor, '#243b35');
  if (!business) return personalSignature(p, { preview, accent, background, text, escapeHtml, safeImage });
  const table = 'cellpadding="0" cellspacing="0" border="0" role="presentation"';
  const icon = (name, surface = background) => {
    const asset = themedIconName(name, p.iconColor, surface);
    return `<img src="${escapeHtml(preview ? `${import.meta.env.BASE_URL}icons/${asset}.png` : iconUrl(asset))}" alt="" width="16" height="16" style="vertical-align:middle;border:0;" />`;
  };
  const link = (href, label) => `<a href="${escapeHtml(href)}" style="color:${text};text-decoration:none;">${escapeHtml(label)}</a>`;
  const entries = [
    p.phone && ['phone', link(`tel:${p.phone.replace(/[^+\d]/g, '')}`, p.phone)],
    p.email && ['email', link(`mailto:${p.email}`, p.email)],
    p.website && isValidUrl(p.website) && ['website', link(p.website, p.website.replace(/^https?:\/\//, ''))],
  ].filter(Boolean);
  const cell = ([name, value]) => `<td style="padding:5px 12px 5px 0;vertical-align:top;font-size:11px;">${icon(name)} &nbsp;${value}</td>`;
  const contacts = `<table ${table} style="color:${text};">${business ? entries.map(e => `<tr>${cell(e)}</tr>`).join('') : entries.reduce((rows,e,i) => rows + (i%2===0?'<tr>':'') + cell(e) + (i%2===1 || i===entries.length-1?'</tr>':''),'')}</table>`;
  const rail = p.links.filter(l => l.enabled && l.url && isValidUrl(l.url)).map(l => {
    const name = socialIconName(l.label);
    return `<tr><td style="padding:7px 6px;text-align:center;"><a href="${escapeHtml(l.url)}" title="${escapeHtml(l.label)}" style="font-size:10px;font-weight:bold;color:${text};text-decoration:none;">${name ? icon(name, accent).replace('alt=""',`alt="${escapeHtml(l.label)}"`) : escapeHtml(l.label)}</a></td></tr>`;
  }).join('');
  const social = rail ? `<table ${table}>${rail}</table>` : '';
  const width = size(p.photoSize, business ? 120 : 100);
  const height = business ? Math.round(width * 1.5) : width;
  const hasPhoto = p.photoUrl && safeImage(p.photoUrl);
  const picture = hasPhoto ? `<img src="${escapeHtml(p.photoUrl)}" alt="${escapeHtml(p.fullName)}" width="${width}" height="${height}" style="display:block;object-fit:cover;border:0;border-radius:${business ? 0 : 50}%;" />` : '';
  const placeholder = preview && !hasPhoto ? `<div style="width:${width}px;height:${height}px;background-color:#f0f0f5;border-radius:${business?0:50}%;text-align:center;color:#77798d;font-size:11px;"><div style="padding-top:${Math.round(height/3)}px;font-size:26px;">＋</div>Upload photo</div>` : '';
  const photo = picture || placeholder;
  const photoCell = photo ? `<td style="vertical-align:middle;${business?'padding:0;':'padding:10px 24px 10px 10px;'}">${business ? photo : `<table ${table} style="border:1px solid ${accent};border-radius:50%;padding:7px;"><tr><td style="border:4px solid ${accent};border-radius:50%;padding:4px;">${photo}</td></tr></table>`}</td>` : '';
  const role = p.role ? `<span style="display:inline-block;background-color:${accent};color:#172033;border-radius:20px;padding:4px 10px;font-size:12px;line-height:16px;">${escapeHtml(p.role)}</span>` : '';
  const tagline = p.tagline ? `<div style="font-size:10px;padding-top:10px;">${escapeHtml(p.tagline)}</div>` : '';
  const title = `<div style="font-size:${business?25:23}px;font-weight:bold;line-height:1.1;padding-bottom:9px;">${escapeHtml(p.fullName)}</div>${role}`;
  const logo = business && p.logoUrl && safeImage(p.logoUrl) ? `<img src="${escapeHtml(p.logoUrl)}" alt="${escapeHtml(p.company || 'Business logo')}" width="${size(p.logoSize,80)}" style="display:block;height:auto;max-height:64px;object-fit:contain;" />` : '';
  let content;
  if (business) {
    const identity = `<td style="padding:20px;vertical-align:middle;">${logo}${p.company?`<div style="font-size:11px;font-weight:bold;margin:5px 0 16px;">${escapeHtml(p.company)}</div>`:''}${title}${tagline}</td>`;
    content = `${identity}<td style="padding:20px 16px 20px 0;vertical-align:middle;">${contacts}</td>${photoCell}<td width="32" style="background-color:${accent};padding:8px 2px;vertical-align:bottom;">${social || '&nbsp;'}</td>`;
  } else {
    const details = `<td style="padding:20px 16px 20px 0;vertical-align:middle;">${title}<div style="padding-top:12px;">${contacts}</div>${tagline}</td>`;
    content = `${social?`<td style="padding:16px 4px 16px 12px;vertical-align:middle;">${social}</td>`:''}${photoCell}${details}`;
    if (p.layout === 'stack') content = `<td style="padding:20px;"><table ${table}><tr>${photoCell}</tr><tr>${details}</tr></table>${social}</td>`;
  }
  return `<table ${table} data-template="${business?'business-portrait':'personal-circle'}" style="font-family:Arial,Helvetica,sans-serif;line-height:1.4;background-color:${background};color:${text};max-width:680px;border-radius:${business?16:0}px;"><tr>${content}</tr></table>`;
}
