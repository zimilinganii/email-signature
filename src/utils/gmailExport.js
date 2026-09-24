import { generateSignatureHtml } from './generateSignatureHtml';

// Leave room for markup the Gmail editor adds when it accepts clipboard HTML.
export const GMAIL_COPY_BUDGET = 8000;
export function compactSignatureHtml(html) {
  return html.replace(/\sdata-[\w-]+="[^"]*"/g, '').replace(/style="([^"]*)"/g, (_,css) => {
    const declarations=css.split(';').filter(Boolean);
    const last=new Map(declarations.map((declaration,index)=>[declaration.split(':')[0].trim(),index]));
    return `style="${declarations.filter((declaration,index)=>last.get(declaration.split(':')[0].trim())===index).join(';')}"`;
  }).replace(/>\s+</g,'><').trim();
}
export function prepareGmailExport(profile, { omitUploads=false }={}) {
  const copy={...profile};
  const fields=profile.mode==='business'?['photoUrl','logoUrl']:['photoUrl'];
  const uploads=fields.filter(field=>/^(data:|blob:)/i.test(copy[field] || ''));
  if(omitUploads)uploads.forEach(field=>{copy[field]='';});
  const html=compactSignatureHtml(generateSignatureHtml(copy));
  const hasUploads=uploads.length>0&&!omitUploads;
  let issue='';
  if(hasUploads)issue='Your uploaded photo or logo is embedded in the HTML. Gmail may reject it as too long. Use a public HTTPS image URL in Photos & logo, or choose Copy for Gmail without uploads below.';
  else if(html.length>GMAIL_COPY_BUDGET)issue='This signature has too much HTML for reliable Gmail pasting. Shorten long links or remove extra social links, then try again.';
  return {html,characters:html.length,hasUploads,issue,ready:!issue};
}
