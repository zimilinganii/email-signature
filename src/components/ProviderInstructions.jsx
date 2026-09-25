import { useState } from 'react';

const providers = {
  gmail: {label:'Gmail · web', steps:['Open a compose window’s ⋮ menu and turn off Plain text mode.', 'Open Settings → See all settings → General → Signature. Create a new signature or replace the old one.', 'Paste the rendered signature with Ctrl+V (Command+V on Mac), not paste-as-plain-text.', 'Choose Signature defaults for new messages and replies. Scroll down and Save Changes.', 'Start a new email and send yourself a test. Existing drafts may retain the old signature.'], url:'https://support.google.com/mail/answer/8395'},
  outlook: {label:'Outlook · web / new Outlook', steps:['Open Settings → Accounts → Signatures. Some versions use Mail → Compose and reply; search Settings for “signature” if needed.', 'Select your account and create or edit a signature.', 'Paste the rendered signature. Choose Keep source formatting if a paste menu appears.', 'Save and select the defaults for new messages and replies/forwards.', 'Start a new HTML-format email and send yourself a test.'], url:'https://support.microsoft.com/en-us/outlook/mail/how-to-add-and-change-an-email-signature-in-outlook'},
  classic: {label:'Outlook · classic Windows', steps:['Open File → Options → Mail → Signatures → New.', 'Name the signature and paste the rendered result into the editor. Keep source formatting if prompted.', 'Choose the email account and defaults for new messages and replies/forwards, then select OK.', 'Use HTML message format, not Plain Text. Start a new email and send yourself a test.'], url:'https://support.microsoft.com/en-us/outlook/mail/how-to-add-and-change-an-email-signature-in-outlook'},
  apple: {label:'Apple Mail · Mac', steps:['Open Mail → Settings → Signatures and choose your email account.', 'Add a signature, then paste the rendered result with Command+V.', 'If formatting changes, turn off “Always match my default message font”.', 'Choose the default signature for that account, then start a new message and send yourself a test.']}
};
const methods = {
  formatted:{label:'Copy signature · recommended', title:'Copy the finished design', detail:'Wait for image preparation to finish, then copy below. Your contact links and formatting are included.', action:'Copy signature'},
  imagefree:{label:'Copy without uploaded images', title:'Copy text, icons and links', detail:'This explicitly leaves out local uploaded photos/logos that are not hosted yet. Already hosted images remain included.', action:'Copy without uploads'},
  download:{label:'Download HTML file', title:'Open the file, then copy the design', detail:'Download below and open the .html file in your browser. Select the rendered signature (Ctrl+A / Command+A), then copy it. Do not copy the source code.', action:'Download HTML'},
  source:{label:'Copy HTML source · advanced', title:'Turn the source into a rendered signature', detail:'Copy below, paste into a plain-text editor, and save as a UTF-8 .html file. Open that file in your browser, select the rendered signature and copy it. Never paste HTML source directly into your email settings.', action:'Copy HTML source'}
};
export function ProviderInstructions({ onCopy, onCopyWithoutUploads, onDownload, onCopyHtml, ready=true }) {
  const [provider,setProvider]=useState('gmail');
  const [method,setMethod]=useState('formatted');
  const selected=providers[provider], chosen=methods[method];
  const action={formatted:onCopy,imagefree:onCopyWithoutUploads,download:onDownload,source:onCopyHtml}[method];
  return <section className="instructions install-guide" aria-labelledby="install-heading">
    <div className="guide-heading"><div><p className="eyebrow">MAKE IT YOUR DEFAULT</p><h2 id="install-heading">Install your signature</h2></div><span className="guide-badge">A one-time setup</span></div>
    <div className="guide-selectors">
      <label><span>Email provider</span><select value={provider} onChange={e=>setProvider(e.target.value)}>{Object.entries(providers).map(([key,value])=><option key={key} value={key}>{value.label}</option>)}</select></label>
      <label><span>Installation method</span><select value={method} onChange={e=>setMethod(e.target.value)}>{Object.entries(methods).map(([key,value])=><option key={key} value={key}>{value.label}</option>)}</select></label>
    </div>
    <div className="guide-content" aria-live="polite" aria-atomic="true">
      <article className="guide-preparation"><p className="eyebrow">FIRST · PREPARE</p><h3>{chosen.title}</h3><p>{chosen.detail}</p><button className="primary" disabled={!action||(method==='formatted'&&!ready)} onClick={action}>{chosen.action}</button>{!ready&&<p className="hint">Your signature is not ready for formatted copy yet. Resolve the image or size warning above. Raw HTML/download does not bypass email-provider limits.</p>}</article>
      <article className="guide-steps"><p className="eyebrow">THEN · INSTALL</p><h3>{selected.label}</h3><ol>{selected.steps.map(step=><li key={step}>{step}</li>)}</ol>{selected.url&&<a href={selected.url} target="_blank" rel="noopener noreferrer">Official setup guide ↗</a>}</article>
    </div>
    <p className="guide-note">We’re still working on automatic installation. Manual setup is available now; Google installation is experimental and requires configuration.</p>
    <details className="guide-troubleshooting"><summary>Images or formatting missing?</summary><p>Use normal paste, turn off plain-text mode and replace the old saved signature. Images must have public HTTPS URLs; wait for uploads before copying. Remote-image blocking, mobile apps and dark mode can change the result. Always test a new email.</p></details>
  </section>;
}
