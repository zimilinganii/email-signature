import { socialRail } from './socialRail';
import { isValidUrl } from './validateProfile';
import { iconUrl } from './signatureIcons';
import { themedIconName } from '../data/iconPalette';

export function businessSignature(p,{preview,accent,background,text,escapeHtml:esc,safeImage}) {
  const table='cellpadding="0" cellspacing="0" border="0" role="presentation"';
  const rail=socialRail(p,{preview,accent,background,escapeHtml:esc});
  const size=Math.max(40,Math.min(180,Number(p.logoSize)||100));
  const logo=p.logoUrl&&safeImage(p.logoUrl)?`<img src="${esc(p.logoUrl)}" alt="${esc(p.company||'Business logo')}" width="${size}" style="display:block;width:${size}px;height:auto;border:0;" />`:preview?'<span style="font-size:12px;">Upload business logo</span>':'';
  const entries=[p.phone&&['phone',p.phone,`tel:${p.phone.replace(/[^+\d]/g,'')}`],p.email&&['email',p.email,`mailto:${p.email}`],p.website&&isValidUrl(p.website)&&['website',p.website.replace(/^https?:\/\//,''),p.website]].filter(Boolean);
  const contacts=entries.map(([name,label,url])=>{
    const asset=themedIconName(`personal-${name}`,p.iconColor,accent);
    return `<tr><td width="24" style="padding:4px 0;vertical-align:middle;"><img src="${esc(preview?`${import.meta.env.BASE_URL}icons/${asset}.png`:iconUrl(asset))}" alt="" width="17" height="17" style="display:block;border:0;" /></td><td style="padding:4px 0;font-size:13px;line-height:18px;word-break:break-word;"><a href="${esc(url)}" style="color:${text};text-decoration:none;">${esc(label)}</a></td></tr>`;
  }).join('');
  return `<table ${table} width="660" data-template="business-logo" style="width:660px;font-family:Arial,Helvetica,sans-serif;background-color:${background};color:${text};border-radius:16px;border-collapse:separate;"><tr>${rail?`<td width="36" style="padding:20px 16px;vertical-align:middle;">${rail}</td>`:''}<td width="${size}" style="padding:24px 22px;text-align:center;vertical-align:middle;">${logo}${p.company?`<div style="padding-top:8px;font-size:17px;font-weight:bold;">${esc(p.company)}</div>`:''}</td><td style="padding:22px 20px 0 0;vertical-align:middle;"><table ${table} width="100%"><tr><td style="border-left:2px solid ${accent};padding:8px 0 16px 22px;"><div style="font-size:27px;line-height:32px;font-weight:bold;">${esc(p.fullName)}</div>${p.role?`<div style="font-size:15px;line-height:21px;padding-top:3px;">${esc(p.role)}</div>`:''}${p.tagline?`<div style="font-size:11px;padding-top:8px;">${esc(p.tagline)}</div>`:''}</td></tr><tr><td style="padding:12px 16px;background-color:${accent};border-radius:28px 0 12px 0;"><table ${table} width="100%">${contacts}</table></td></tr></table></td></tr></table>`.replace(/style="/g,'style="box-sizing:content-box;');
}
