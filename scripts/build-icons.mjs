// Code-drawn reference-inspired artwork. PNG output avoids SVG restrictions in email clients.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { iconPalette } from '../src/data/iconPalette.js';
const destination = new URL('../public/icons/', import.meta.url);
await mkdir(destination, { recursive: true });
const gradient = '<defs><linearGradient id="blue" x2="0" y2="1"><stop stop-color="#8ebae8"/><stop offset=".5" stop-color="#1663af"/><stop offset="1" stop-color="#174a97"/></linearGradient></defs>';
const tile = `${gradient}<rect x="1" y="1" width="30" height="30" rx="7" fill="url(#blue)"/>`;
const art = {
  email: `${tile}<path d="M6 10h20v14H6z" fill="white"/><path d="m6 10 10 9 10-9M6 24l7-8m13 8-7-8" fill="none" stroke="#255f9e" stroke-width="1.7" stroke-linejoin="round"/>`,
  linkedin: `${tile}<circle cx="9" cy="10" r="2" fill="white"/><path fill="white" d="M7 14h4v12H7zm7 0h4v1.5c1-2 7-3 7 3.5v7h-4v-6c0-3-3-3-3 0v6h-4z"/>`,
  github: '<circle cx="16" cy="16" r="15" fill="#181818"/><path fill="white" d="M8 12 8 6 13 9Q16 8 19 9L24 6V12Q27 15 24 19Q22 21 19 21V29H13V24Q7 25 5 20Q4 18 3 18Q6 17 7 20Q9 23 13 21Q6 21 6 16Q6 14 8 12Z"/>',
  phone: '<path fill="#182b27" d="M4 4Q2 6 3 12Q7 25 21 29Q26 31 29 26L25 20Q24 19 22 21L19 23Q12 20 9 13L12 10Q13 9 12 7L8 2Q6 1 4 4Z"/><path d="M18 3a12 12 0 0 1 11 11M18 8a7 7 0 0 1 6 6" fill="none" stroke="#182b27" stroke-width="2.5" stroke-linecap="round"/>',
  website: '<rect x="2" y="3" width="28" height="26" rx="4" fill="white" stroke="#182b27" stroke-width="2.5"/><path d="M3 11h26" stroke="#182b27" stroke-width="2.5"/><path d="M6 7h9" stroke="#182b27" stroke-width="2" stroke-linecap="round"/><circle cx="21" cy="7" r="1.2" fill="#182b27"/><circle cx="26" cy="7" r="1.2" fill="#182b27"/><circle cx="11" cy="17" r="3" fill="#182b27"/><path d="M5 26v-2q0-5 6-5t6 5v2z" fill="#182b27"/><path d="M21 16h5m-5 5h5m-5 5h5" stroke="#182b27" stroke-width="2" stroke-linecap="round"/>',
};
for (const [name, body] of Object.entries(art)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 32 32">${body}</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(new URL(`${name}.png`, destination).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
}
const lavender = '#a6a8d4';
const disc = `<circle cx="16" cy="16" r="15" fill="${lavender}"/>`;
const personal = {
  instagram: `<rect x="4" y="4" width="24" height="24" rx="7" fill="none" stroke="${lavender}" stroke-width="3"/><circle cx="16" cy="16" r="6" fill="none" stroke="${lavender}" stroke-width="3"/><circle cx="24" cy="8" r="2" fill="${lavender}"/>`,
  whatsapp: `<path d="M5 26 3 30l7-2a13 13 0 1 0-5-2Z" fill="none" stroke="${lavender}" stroke-width="2"/><path d="m11 8-3 3c0 6 7 13 13 13l3-3-5-4-2 3c-3-1-5-3-6-6l3-2z" fill="${lavender}"/>`,
  phone: `${disc}<path d="M10 7 7 10c0 7 8 15 15 15l3-3-5-4-3 3c-3-1-5-3-6-6l3-3z" fill="white" transform="translate(1 -1) scale(.94)"/>`,
  email: `${disc}<rect x="8" y="10" width="16" height="12" rx="1" fill="white"/><path d="m8 10 8 7 8-7m-16 12 5-6m11 6-5-6" fill="none" stroke="${lavender}" stroke-width="1.3"/>`,
  website: `${disc}<g fill="none" stroke="white" stroke-width="1.2"><circle cx="16" cy="16" r="9"/><ellipse cx="16" cy="16" rx="4" ry="9"/><path d="M7 16h18M9 11h14M9 21h14"/></g>`,
  linkedin: art.linkedin.replace(tile,'').replaceAll('white',lavender),
  github: art.github.replace('#181818',lavender),
  facebook: `<path fill="${lavender}" d="M19 30V18h4l1-5h-5v-3c0-2 1-3 3-3h3V2h-4c-5 0-8 3-8 8v3H9v5h4v12z"/>`,
  twitter: `<path fill="${lavender}" d="M29 7l-3 1 2-4-5 2c-6-4-12 1-10 6C8 12 5 9 2 6c-2 4 0 7 3 9l-3-1c0 4 3 6 6 7l-3 1c2 3 4 4 7 4-4 2-7 2-11 1 16 10 28-3 27-17l3-4z"/>`,
};
for (const [name, body] of Object.entries(personal)) {
  await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 32 32">${body}</svg>`)).png().toFile(new URL(`personal-${name}.png`,destination).pathname.replace(/^\/([A-Za-z]:)/,'$1'));
}
for (const choice of iconPalette) {
  const folder = new URL(`colors/${choice.id}/`, destination);
  await mkdir(folder, { recursive:true });
  const ink = choice.id === 'white' ? '#242424' : '#ffffff';
  const variants = {...art, ...Object.fromEntries(Object.entries(personal).map(([name,body])=>[`personal-${name}`,body]))};
  for (const [name, body] of Object.entries(variants)) {
    const themed = body.replace(/#[a-f0-9]{6}|\bwhite\b/gi, value => value.toLowerCase()==='white' ? ink : choice.color);
    await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 32 32">${themed}</svg>`)).png().toFile(new URL(`${name}.png`,folder).pathname.replace(/^\/([A-Za-z]:)/,'$1'));
  }
}
console.log('Rendered original icons and ten email-compatible color palettes.');
