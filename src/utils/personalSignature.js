import { isValidUrl } from './validateProfile';
import { iconUrl } from './signatureIcons';

// All geometry is inline so copying the signature preserves the reference layout.
export function personalSignature(p, { preview, accent, background, text, escapeHtml: esc, safeImage }) {
  const table = 'cellpadding="0" cellspacing="0" border="0" role="presentation"';
  const photoSize = Math.max(40, Math.min(180, Number(p.photoSize) || 132));
  const image = (name, label = '', dimension = 18) => `<img src="${esc(preview ? `${import.meta.env.BASE_URL}icons/personal-${name}.png` : iconUrl(`personal-${name}`))}" alt="${esc(label)}" width="${dimension}" height="${dimension}" style="display:block;border:0;" />`;
  const socialNames = { facebook:'facebook', twitter:'twitter', 'x / twitter':'twitter', x:'twitter', linkedin:'linkedin', github:'github', portfolio:'website', website:'website', 'personal website':'website' };
  const links = p.links.filter(l => l.enabled && l.url && isValidUrl(l.url));
  const rail = links.length ? `<table ${table} width="34" style="width:34px;">${links.map((l,i) => `<tr><td align="center" style="padding:0;text-align:center;"><a href="${esc(l.url)}" title="${esc(l.label)}" style="color:${accent};font-size:10px;font-weight:bold;text-decoration:none;">${socialNames[l.label.trim().toLowerCase()] ? image(socialNames[l.label.trim().toLowerCase()],l.label,socialNames[l.label.trim().toLowerCase()] === 'linkedin' ? 34 : 28) : esc(l.label)}</a></td></tr>${i<links.length-1?`<tr><td align="center" style="padding:8px 0;"><table ${table} width="1"><tr><td height="26" style="width:1px;height:26px;background-color:${accent};font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>`:''}`).join('')}</table>` : '';
  const hasPhoto = p.photoUrl && safeImage(p.photoUrl);
  const portrait = hasPhoto ? `<img src="${esc(p.photoUrl)}" alt="${esc(p.fullName)}" width="${photoSize}" height="${photoSize}" style="display:block;width:${photoSize}px;height:${photoSize}px;object-fit:cover;border-radius:50%;border:0;" />` : (preview ? `<div style="width:${photoSize}px;height:${photoSize}px;background-color:#e0e2fb;border-radius:50%;text-align:center;color:#737799;font-size:11px;"><div style="padding-top:${Math.round(photoSize*.32)}px;font-size:24px;">＋</div>Upload photo</div>` : '');
  const frame = portrait ? `<table ${table} data-personal-photo="frame" style="border:1px solid #d0d1e7;border-radius:50%;border-collapse:separate;"><tr><td style="padding:14px;"><table ${table} style="border:5px solid ${accent};border-radius:50%;border-collapse:separate;"><tr><td style="padding:0;">${portrait}</td></tr></table></td></tr></table>` : '';
  const contact = (type, value, href) => value ? `<table ${table} style="table-layout:auto;"><tr><td width="25" style="width:25px;padding:0;vertical-align:middle;">${image(type,'',17)}</td><td ${type==='website'?'':'nowrap="nowrap"'} style="padding:0;font-size:13px;line-height:19px;vertical-align:middle;${type==='website'?'overflow-wrap:break-word;word-break:normal;':'white-space:nowrap;word-break:normal;'}"><a href="${esc(href)}" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:19px;color:${text};text-decoration:none;${type==='website'?'':'white-space:nowrap;'}">${esc(value).replace(type==='phone'?/ /g:/$^/g,'&nbsp;')}</a></td></tr></table>` : '';
  const phone = contact('phone',p.phone,`tel:${p.phone.replace(/[^+\d]/g,'')}`);
  const email = contact('email',p.email,`mailto:${p.email}`);
  const website = p.website && isValidUrl(p.website) ? contact('website',p.website.replace(/^https?:\/\//,''),p.website) : '';
  const separateRows = String(p.phone || '').length + String(p.email || '').length > 43;
  const contacts = phone || email || website ? `<table ${table} data-personal-contacts="grid" style="table-layout:auto;">${separateRows ? `${phone?`<tr><td colspan="2" style="padding:0 0 8px;">${phone}</td></tr>`:''}${email?`<tr><td colspan="2" style="padding:0 0 8px;">${email}</td></tr>`:''}` : `<tr>${phone?`<td style="padding:0 16px 8px 0;vertical-align:top;">${phone}</td>`:''}${email?`<td style="padding:0 0 8px;vertical-align:top;">${email}</td>`:''}</tr>`}${website?`<tr><td colspan="2" style="padding:0;">${website}</td></tr>`:''}</table>` : '';
  const heading = `<div style="font-size:27px;line-height:32px;font-weight:700;letter-spacing:-0.5px;color:${text};padding:0 0 7px;overflow-wrap:anywhere;">${esc(p.fullName)}</div>`;
  const pill = p.role ? `<table ${table} style="margin:0 0 15px;"><tr><td align="center" style="background-color:${accent};border-radius:18px;padding:4px 18px;color:#ffffff;font-size:12px;line-height:16px;text-align:center;text-transform:uppercase;letter-spacing:.2px;">${esc(p.role)}</td></tr></table>` : '';
  const details = `${heading}${pill}${contacts}${p.tagline?`<div style="font-size:11px;line-height:16px;padding-top:12px;">${esc(p.tagline)}</div>`:''}`;
  const spacer = width => `<td width="${width}" style="width:${width}px;padding:0;font-size:0;line-height:0;">&nbsp;</td>`;
  const horizontal = `<tr>${rail?`<td width="34" style="width:34px;padding:0;vertical-align:middle;">${rail}</td>${spacer(29)}`:''}${frame?`<td width="${photoSize+40}" style="width:${photoSize+40}px;padding:0;vertical-align:middle;">${frame}</td>${spacer(42)}`:''}<td style="padding:0;vertical-align:middle;">${details}</td></tr>`;
  const stacked = `<tr><td style="padding:0 0 20px;">${frame}</td></tr><tr><td>${details}</td></tr>${rail?`<tr><td style="padding-top:18px;">${rail}</td></tr>`:''}`;
  const html = `<table ${table} width="660" data-template="personal-circle" style="width:660px;max-width:660px;font-family:Arial,Helvetica,sans-serif;line-height:1.4;background-color:${background};color:${text};border-collapse:separate;"><tr><td style="padding:24px 30px 24px 39px;"><table ${table} width="100%" style="width:100%;table-layout:fixed;">${p.layout==='stack'?stacked:horizontal}</table></td></tr></table>`;
  // Match native email table sizing even inside the editor's border-box reset.
  return html.replace(/<(table|td)\b([^>]*)>/g, (tag, name, attributes) => {
    const common = 'box-sizing:content-box;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:19px;';
    return attributes.includes('style="') ? '<'+name+attributes.replace('style="','style="'+common)+'>' : '<'+name+' style="'+common+'"'+attributes+'>';
  });
}
