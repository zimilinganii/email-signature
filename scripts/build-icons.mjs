// Code-drawn reference-inspired artwork. PNG output avoids SVG restrictions in email clients.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
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
console.log('Rendered five 96px PNG icons for 16px display.');
