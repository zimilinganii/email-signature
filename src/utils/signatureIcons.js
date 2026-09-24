// Set this to a permanent public asset location when hosting moves.
const configured = import.meta.env.VITE_PUBLIC_ASSET_BASE_URL;
const fallback = 'https://zimilinganii.github.io/email-signature/';
export function iconUrl(name) {
  const root = configured || (typeof window !== 'undefined' && window.location.protocol === 'https:' ? new URL(import.meta.env.BASE_URL, window.location.href).href : fallback);
  const base = new URL(root.endsWith('/') ? root : `${root}/`);
  if (base.protocol !== 'https:') throw new Error('Public signature assets require an HTTPS URL.');
  return new URL(`icons/${name}.png`, base).href;
}
export const socialIconName = label => ({ github: 'github', linkedin: 'linkedin', portfolio: 'website', website: 'website', 'personal website': 'website' })[label.trim().toLowerCase()];
