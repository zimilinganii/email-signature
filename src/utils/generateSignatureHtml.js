const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#039;');

const link = (href, text) => href ? `<a href="${escapeHtml(href)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(text)}</a>` : '';

export function generateSignatureHtml(profile) {
  const activeLinks = profile.links.filter((item) => item.enabled && item.url);
  const contact = [
    profile.email && link(`mailto:${profile.email}`, profile.email),
    profile.phone && link(`tel:${profile.phone.replace(/[^+\d]/g, '')}`, profile.phone),
    profile.website && link(profile.website, profile.website.replace(/^https?:\/\//, '').replace(/\/$/, '')),
    profile.location && escapeHtml(profile.location),
  ].filter(Boolean).join(' &nbsp;|&nbsp; ');

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:#172033;line-height:1.4;max-width:560px;">
  <tr>
    ${profile.photoUrl ? `<td style="padding:0 16px 0 0;vertical-align:top;"><img src="${escapeHtml(profile.photoUrl)}" alt="${escapeHtml(profile.fullName)}" width="72" height="72" style="display:block;border-radius:12px;object-fit:cover;"></td>` : ''}
    <td style="vertical-align:top;">
      <div style="font-size:18px;font-weight:700;color:#111827;">${escapeHtml(profile.fullName)}</div>
      <div style="font-size:13px;color:#4b5563;margin-top:2px;">${escapeHtml([profile.role, profile.company].filter(Boolean).join(' · '))}</div>
      <div style="font-size:12px;color:#374151;margin-top:9px;">${contact}</div>
      ${activeLinks.length ? `<div style="font-size:12px;margin-top:8px;">${activeLinks.map((item) => link(item.url, item.label)).join(' &nbsp;·&nbsp; ')}</div>` : ''}
    </td>
  </tr>
</table>`;
}
