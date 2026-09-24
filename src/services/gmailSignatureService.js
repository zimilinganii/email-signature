const API_ROOT = 'https://gmail.googleapis.com/gmail/v1/users/me/settings/sendAs';

async function gmailRequest(token, url, options = {}) {
  const response = await fetch(url, { ...options, signal: AbortSignal.timeout(20000), headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...(options.headers || {}) } });
  if (!response.ok) throw new Error(`Gmail returned ${response.status}. Check consent and API configuration.`);
  return response.json();
}

export async function installGmailSignature(token, signatureHtml) {
  const aliases = await gmailRequest(token, API_ROOT);
  const primary = aliases.sendAs?.find((alias) => alias.isPrimary);
  if (!primary) throw new Error('No primary Gmail send-as address was found.');
  return gmailRequest(token, `${API_ROOT}/${encodeURIComponent(primary.sendAsEmail)}`, {
    method: 'PATCH', body: JSON.stringify({ signature: signatureHtml }),
  });
}
