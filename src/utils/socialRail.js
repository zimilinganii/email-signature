import { isValidUrl } from './validateProfile';
import { iconUrl } from './signatureIcons';
import { themedIconName } from '../data/iconPalette';

export const platformIcons = { linkedin:'linkedin', github:'github', facebook:'facebook', twitter:'twitter', 'x / twitter':'twitter', x:'twitter', instagram:'instagram', whatsapp:'whatsapp', portfolio:'website', website:'website', 'personal website':'website' };
export function socialRail(p, {preview, accent, background, escapeHtml: esc}) {
  const links=p.links.filter(l=>l.enabled && isValidUrl(l.url)).slice(0,3);
  if(!links.length)return '';
  const rows=links.map((l,i)=>{
    const name=platformIcons[l.label.trim().toLowerCase()] || 'website';
    const asset=themedIconName(`personal-${name}`,p.iconColor,background);
    const src=preview?`${import.meta.env.BASE_URL}icons/${asset}.png`:iconUrl(asset);
    return `<tr><td align="center" width="36" height="36" style="padding:0;width:36px;height:36px;vertical-align:middle;text-align:center;"><a href="${esc(l.url)}" title="${esc(l.label)}"><img src="${esc(src)}" alt="${esc(l.label)}" width="32" height="32" style="display:block;margin:0 auto;border:0;" /></a></td></tr>${i<links.length-1?`<tr><td align="center" style="padding:6px 0;"><table cellpadding="0" cellspacing="0" border="0" role="presentation" width="3"><tr><td width="3" height="20" style="width:3px;height:20px;background-color:${accent};font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>`:''}`;
  }).join('');
  return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" width="36" style="width:36px;">${rows}</table>`;
}
