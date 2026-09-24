export const GMAIL_SCOPE = 'https://www.googleapis.com/auth/gmail.settings.basic';
export const GOOGLE_SCRIPT_URL = 'https://accounts.google.com/gsi/client';

export function getGoogleClientId() {
  return import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
}

export function loadGoogleIdentityServices() {
  if (window.google?.accounts?.oauth2) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${GOOGLE_SCRIPT_URL}"]`);
    if (existing) { existing.addEventListener('load', resolve); existing.addEventListener('error', reject); return; }
    const script = document.createElement('script');
    script.src = GOOGLE_SCRIPT_URL; script.async = true; script.defer = true;
    script.onload = resolve; script.onerror = reject; document.head.appendChild(script);
  });
}

export async function requestGmailAccess(onToken) {
  const clientId = getGoogleClientId();
  if (!clientId) throw new Error('Gmail integration is not configured. Add VITE_GOOGLE_CLIENT_ID to your .env file.');
  await loadGoogleIdentityServices();
  const client = window.google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: GMAIL_SCOPE,
    callback: onToken,
  });
  client.requestAccessToken();
}
