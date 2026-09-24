export const GMAIL_SCOPE = 'https://www.googleapis.com/auth/gmail.settings.basic';
export const getGoogleClientId = () => import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
let loading;
export function loadGoogleIdentityServices() {
  if (window.google?.accounts?.oauth2) return Promise.resolve();
  if (!loading) loading = new Promise((resolve,reject) => {
    const script = document.createElement('script'); script.src = 'https://accounts.google.com/gsi/client'; script.async = true;
    const timer = setTimeout(fail,15000);
    function fail() { clearTimeout(timer); script.remove(); loading = null; reject(new Error('Google could not load. Check your connection and retry.')); }
    script.onload = () => { clearTimeout(timer); resolve(); }; script.onerror = fail; document.head.appendChild(script);
  });
  return loading;
}
export function requestGmailAccess() {
  return new Promise((resolve,reject) => {
    if (!getGoogleClientId()) return reject(new Error('Google connection needs an OAuth client ID. Copy and download are available.'));
    if (!window.google?.accounts?.oauth2) return reject(new Error('Google is still loading. Please try again.'));
    window.google.accounts.oauth2.initTokenClient({ client_id:getGoogleClientId(), scope:GMAIL_SCOPE, include_granted_scopes:false,
      callback: r => { if (r.error || !r.access_token || !window.google.accounts.oauth2.hasGrantedAllScopes(r,GMAIL_SCOPE)) reject(new Error('Gmail settings permission was not granted.')); else resolve({token:r.access_token,expiresAt:Date.now()+Number(r.expires_in)*1000}); },
      error_callback: () => reject(new Error('Google sign-in was closed or blocked. Allow the popup and try again.')),
    }).requestAccessToken({prompt:'select_account'});
  });
}
export function revokeGmail(token) { return new Promise((resolve,reject) => window.google.accounts.oauth2.revoke(token,r => r.successful ? resolve() : reject(new Error('Remove access in your Google Account permissions.')))); }
