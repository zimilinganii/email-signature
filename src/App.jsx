import { useMemo, useState } from 'react';
import { ContactForm } from './components/ContactForm';
import { SocialLinksForm } from './components/SocialLinksForm';
import { SignaturePreview } from './components/SignaturePreview';
import { GmailInstallButton } from './components/GmailInstallButton';
import { ProviderInstructions } from './components/ProviderInstructions';
import { CopyButton } from './components/CopyButton';
import { defaultProfile } from './data/defaultProfile';
import { validateProfile } from './utils/validateProfile';
import { sanitizeSignatureHtml } from './utils/sanitizeSignatureHtml';
import { generateSignatureHtml } from './utils/generateSignatureHtml';
import { requestGmailAccess } from './services/googleAuth';
import { installGmailSignature } from './services/gmailSignatureService';
import './styles/global.css';

export default function App() {
  const [profile, setProfile] = useState(defaultProfile);
  const [gmailStatus, setGmailStatus] = useState('idle');
  const [notice, setNotice] = useState('');
  const errors = useMemo(() => validateProfile(profile), [profile]);
  const html = useMemo(() => sanitizeSignatureHtml(generateSignatureHtml(profile)), [profile]);
  const update = (key, value) => setProfile((current) => ({ ...current, [key]: value }));
  async function copyHtml() { await navigator.clipboard.writeText(html); setNotice('Signature HTML copied.'); }
  async function copyRendered() { const blob = new Blob([html], { type: 'text/html' }); await navigator.clipboard.write([new ClipboardItem({ 'text/html': blob, 'text/plain': new Blob([profile.fullName], { type: 'text/plain' }) })]); setNotice('Rendered signature copied.'); }
  function download() { const blob = new Blob([html], { type: 'text/html' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'email-signature.html'; anchor.click(); URL.revokeObjectURL(url); }
  function installGmail() { setGmailStatus('loading'); requestGmailAccess(async (response) => { if (response.error) { setGmailStatus('error'); return; } try { await installGmailSignature(response.access_token, html); setGmailStatus('success'); } catch { setGmailStatus('error'); } }).catch(() => setGmailStatus('error')); }
  return <main className="app-shell"><header className="hero"><p className="eyebrow">PERSONAL PROJECT · EMAIL TOOLS</p><h1>Create a signature people remember.</h1><p className="hero-copy">Build a polished signature once, then use it across Gmail, Outlook, Apple Mail, and your professional platforms.</p></header>
    <div className="workspace"><section className="panel"><div className="section-heading"><div><p className="eyebrow">01 · PROFILE</p><h2>Your details</h2></div><button className="text-button" onClick={() => setProfile(defaultProfile)}>Reset</button></div><ContactForm profile={profile} onChange={update} errors={errors} /><div className="section-heading links-heading"><div><p className="eyebrow">02 · PLATFORMS</p><h2>Where to find you</h2></div></div><SocialLinksForm links={profile.links} onChange={(links) => update('links', links)} errors={errors} /></section>
      <section className="panel preview-panel"><div className="section-heading"><div><p className="eyebrow">03 · PREVIEW</p><h2>See it in action</h2></div></div><SignaturePreview html={html} /><div className="actions"><CopyButton onClick={copyRendered}>Copy signature</CopyButton><CopyButton onClick={copyHtml}>Copy HTML</CopyButton><button className="secondary" onClick={download}>Download HTML</button></div>{notice && <p className="success notice">{notice}</p>}<GmailInstallButton onInstall={installGmail} status={gmailStatus} disabled={Object.keys(errors).length > 0 || gmailStatus === 'loading'} /><ProviderInstructions onCopy={copyRendered} /></section></div>
    <footer>Keep your signature simple, accessible, and easy to use. Your information stays in this browser unless you choose Gmail installation.</footer>
  </main>;
}
