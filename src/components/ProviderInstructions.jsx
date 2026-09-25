export function ProviderInstructions({ onCopy }) {
  return <section className="instructions"><h2>Install your signature</h2>
    <p className="hint">We’re still working on automatic installation. For now, use the manual steps below; Google installation is experimental and requires site configuration.</p>
    <details open><summary>Choose a copy method</summary><ol>
      <li><strong>Copy signature (recommended):</strong> Select Review &amp; create, wait for image uploads, then Copy signature. Paste with Ctrl+V (Command+V on Mac), not paste-as-plain-text.</li>
      <li><strong>Copy for Gmail without uploads:</strong> This fallback excludes uploaded photos/logos but keeps formatted text and links. Paste using the same steps below.</li>
      <li><strong>Download HTML:</strong> Open the downloaded .html file in your browser. Select the rendered signature (Ctrl+A), copy (Ctrl+C), and paste it into the provider’s signature editor. Hosted image URLs are needed for reliable email images.</li>
      <li><strong>Copy HTML (advanced):</strong> This copies source code, not a formatted signature. Save it as a UTF-8 .html file using a plain-text editor, open it in your browser, then select and copy the rendered result. Do not paste HTML source directly into Gmail or Outlook.</li>
    </ol></details>
    <div className="provider-grid">
      <article><h3>Gmail on a computer</h3><ol>
        <li>In a compose window, open ⋮ and ensure Plain text mode is off.</li>
        <li>Open Settings → See all settings → General → Signature → Create new.</li>
        <li>Name your signature, click inside its editor, and paste the formatted signature. Replace any old text-only version.</li>
        <li>Under Signature defaults, choose it for new emails and, optionally, replies/forwards.</li>
        <li>Scroll down and Save Changes. Open a new message to check the result; an existing draft may retain the old signature.</li>
      </ol><button className="secondary" onClick={onCopy}>Copy signature</button><p><a href="https://support.google.com/mail/answer/8395">Google’s signature guide</a></p></article>
      <article><h3>Outlook web / new Outlook</h3><ol>
        <li>Open Settings → Accounts → Signatures. Some versions use Mail → Compose and reply; search Settings for “signature” if needed.</li>
        <li>Select your account, create a signature, and paste the formatted result into its editor. If offered paste choices, keep source formatting.</li>
        <li>Save and select the signature for new messages and replies/forwards.</li>
        <li>Compose a new HTML-format message and verify images and links.</li>
      </ol><h4>Classic Outlook for Windows</h4><p>Open File → Options → Mail → Signatures → New. Paste, choose your default account/new-message/reply signature, and select OK. Use HTML message format, not Plain Text.</p><button className="secondary" onClick={onCopy}>Copy signature</button><p><a href="https://support.microsoft.com/en-us/outlook/mail/how-to-add-and-change-an-email-signature-in-outlook">Microsoft’s signature guide</a></p></article>
      <article><h3>Apple Mail</h3><p>Open Mail → Settings → Signatures, choose your account, add a signature and paste the rendered result. If formatting changes, check “Always match my default message font”. Choose the signature for that account and test a new message.</p></article>
    </div><p className="hint">If only text appears, check HTML/plain-text mode and paste again normally. If images are missing, ensure uploads completed and the image links are publicly accessible. Mobile apps and dark mode can render signatures differently. Send yourself a test email before regular use.</p>
  </section>;
}
