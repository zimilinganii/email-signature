import { isValidUrl } from './validateProfile';
import { iconUrl } from './signatureIcons';
import { themedIconName } from '../data/iconPalette';

export const platformIcons = { linkedin:'linkedin', github:'github', facebook:'facebook', twitter:'twitter', 'x / twitter':'twitter', x:'twitter', instagram:'instagram', whatsapp:'whatsapp', portfolio:'website', website:'website', 'personal website':'website' };

export const socialIconSize = count => Math.max(18, Math.min(26, Math.floor(90 / Math.max(3, count))));
const enabledLinks = links => links.filter(l=>l.enabled && l.url && isValidUrl(l.url));
export const socialRailWidth = links => Math.max(1, Math.ceil(enabledLinks(links).length / 8)) * 36;
export function socialRail(p, {preview, accent, background, escapeHtml: esc}) {
  const links=enabledLinks(p.links);
  if(!links.length)return '';
  const dimension=links.length<=3?32:socialIconSize(links.length);
  const lineHeight=links.length<=3?20:8;
  const table='cellpadding="0" cellspacing="0" border="0" role="presentation"';
  const columns=Array.from({length:Math.ceil(links.length/8)},(_,column)=>{
    const group=links.slice(column*8,column*8+8);
    const rows=group.map((l,i)=>{
      const name=platformIcons[l.label.trim().toLowerCase()] || 'website';
      const asset=themedIconName(`personal-${name}`,p.iconColor,background);
      const src=preview?`${import.meta.env.BASE_URL}icons/${asset}.png`:iconUrl(asset);
      return `<tr><td align="center" width="36" height="${dimension}" style="padding:0;width:36px;height:${dimension}px;vertical-align:middle;text-align:center;"><a href="${esc(l.url)}" title="${esc(l.label)}"><img src="${esc(src)}" alt="${esc(l.label)}" width="${dimension}" height="${dimension}" style="display:block;margin:0 auto;border:0;" /></a></td></tr>${i<group.length-1?`<tr><td align="center" style="padding:3px 0;"><table ${table} width="3"><tr><td width="3" height="${lineHeight}" style="width:3px;height:${lineHeight}px;background-color:${accent};font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>`:''}`;
    }).join('');
    return `<td style="padding:0;vertical-align:middle;"><table ${table} width="36">${rows}</table></td>`;
  }).join('');
  return `<table ${table} width="${socialRailWidth(p.links)}" style="width:${socialRailWidth(p.links)}px;"><tr>${columns}</tr></table>`;
}
