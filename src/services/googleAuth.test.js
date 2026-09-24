import { afterEach, describe, expect, it, vi } from 'vitest';
import { requestGmailAccess, revokeGmail, GMAIL_SCOPE } from './googleAuth';
afterEach(()=>{vi.unstubAllGlobals();vi.unstubAllEnvs();});
function google(response, popupError=false){
 vi.stubEnv('VITE_GOOGLE_CLIENT_ID','123-test.apps.googleusercontent.com');
 const initTokenClient=vi.fn(config=>({requestAccessToken:()=>popupError?config.error_callback():config.callback(response)}));
 vi.stubGlobal('window',{google:{accounts:{oauth2:{initTokenClient,hasGrantedAllScopes:r=>r.scope===GMAIL_SCOPE,revoke:(_,cb)=>cb({successful:true})}}}});
 return initTokenClient;
}
describe('Google connection handling',()=>{
 it('requires real configuration',async()=>{vi.stubEnv('VITE_GOOGLE_CLIENT_ID','');await expect(requestGmailAccess()).rejects.toThrow('OAuth client ID');});
 it('requests only Gmail settings and returns an expiring session',async()=>{const init=google({access_token:'mock-token',expires_in:3600,scope:GMAIL_SCOPE});const session=await requestGmailAccess();expect(session.token).toBe('mock-token');expect(session.expiresAt).toBeGreaterThan(Date.now());expect(init.mock.calls[0][0].scope).toBe(GMAIL_SCOPE);});
 it('handles rejected consent',async()=>{google({error:'access_denied'});await expect(requestGmailAccess()).rejects.toThrow('not granted');});
 it('handles closed popups without staying busy',async()=>{google({},true);await expect(requestGmailAccess()).rejects.toThrow('closed or blocked');});
 it('revokes access on disconnect',async()=>{google({});await expect(revokeGmail('mock-token')).resolves.toBeUndefined();});
});
