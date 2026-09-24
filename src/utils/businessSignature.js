import { platformIcons } from './socialRail';
import { isValidUrl } from './validateProfile';
import { iconUrl } from './signatureIcons';
import { themedIconName, resolveIconColor } from '../data/iconPalette';

export function businessSignature(p,{preview,accent,background,text,escapeHtml:esc,safeImage}) {
  const table='cellpadding="0" cellspacing="0" border="0" role="presentation"';
  const image=(name,dimension,surface,label='')=>{
    const asset=themedIconName('personal-'+name,p.iconColor==='default'?'auto':p.iconColor,surface);
    return `<img src="${esc(preview?`${import.meta.env.BASE_URL}icons/${asset}.png`:iconUrl(asset))}" alt="${esc(label)}" width="${dimension}" height="${dimension}" style="display:block;border:0;" />`;
  };
  const links=p.links.filter(l=>l.enabled&&isValidUrl(l.url)).slice(0,3);
  const socials=links.map(l=>`<td style="padding:0 0 0 9px;"><a href="${esc(l.url)}" title="${esc(l.label)}">${image(platformIcons[l.label.trim().toLowerCase()]||'website',26,background,l.label)}</a></td>`).join('');
  const company=String(p.company||'').trim();
  const strip=/^#[a-f0-9]{6}$/i.test(p.contactStripColor||'')?p.contactStripColor:accent;
  const size=company?Math.max(40,Math.min(160,Number(p.logoSize)||100)):Math.max(150,Math.min(170,(Number(p.logoSize)||100)*1.6));
  const logo=p.logoUrl&&safeImage(p.logoUrl)?`<img src="${esc(p.logoUrl)}" alt="${esc(company||'Business logo')}" width="${size}" style="display:block;width:${size}px;height:auto;border:0;margin:0 auto;" />`:preview?'<span style="font-size:12px;">Upload business logo</span>':'';
  const ink=resolveIconColor('auto',strip)==='white'?'#ffffff':'#242424';
  const entries=[p.email&&['email',p.email,`mailto:${p.email}`],p.phone&&['phone',p.phone,`tel:${p.phone.replace(/[^+\d]/g,'')}`],p.website&&isValidUrl(p.website)&&['website',p.website.replace(/^https?:\/\//,''),p.website]].filter(Boolean);
  const contacts=entries.map(([name,label,url],i)=>`<td style="padding:0 9px;vertical-align:middle;${i?'border-left:1px solid '+ink+';':''}"><table ${table}><tr><td width="21" style="vertical-align:middle;">${image(name,15,strip)}</td><td style="font-size:11px;line-height:15px;overflow-wrap:anywhere;word-break:break-word;"><a href="${esc(url)}" style="color:${ink};text-decoration:none;">${esc(label)}</a></td></tr></table></td>`).join('');
  return `<table ${table} width="660" data-template="business-logo" style="width:660px;table-layout:fixed;font-family:Arial,Helvetica,sans-serif;background-color:${background};color:${text};border-radius:16px;border-collapse:separate;"><tr><td width="180" rowspan="3" align="center" style="width:180px;padding:20px 0;text-align:center;vertical-align:middle;">${logo}${company?`<div style="padding:8px 12px 0;font-size:22px;line-height:26px;font-weight:bold;overflow-wrap:anywhere;">${esc(company)}</div>`:''}</td><td align="right" height="38" style="height:38px;padding:10px 16px 0 0;"><table ${table} data-business-socials="row"><tr>${socials}</tr></table></td></tr><tr><td height="94" style="height:94px;padding:0 20px 12px 0;"><table ${table} width="100%"><tr><td style="border-left:1px solid #999999;padding:14px 0 14px 24px;"><div style="font-size:26px;line-height:30px;font-weight:bold;overflow-wrap:anywhere;">${esc(p.fullName)}</div>${p.role?`<div style="font-size:15px;line-height:21px;">${esc(p.role)}</div>`:''}${p.tagline?`<div style="font-size:11px;padding-top:5px;">${esc(p.tagline)}</div>`:''}</td></tr></table></td></tr><tr><td height="48" style="height:48px;padding:0 8px 0 22px;background-color:${strip};border-radius:45px 0 14px 0;"><table ${table} width="100%" data-business-contacts="strip" style="width:100%;table-layout:fixed;"><tr>${contacts}</tr></table></td></tr></table>`.replace(/style="/g,'style="box-sizing:content-box;');
}
