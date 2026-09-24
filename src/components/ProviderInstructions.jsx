export function ProviderInstructions({ onCopy }) {
  return <section className="instructions"><h2>Install manually</h2><div className="provider-grid">
    <article><h3>Outlook</h3><p>Copy the rendered signature, open Outlook signature settings, create a new signature, paste it, and choose when it should be used.</p><button className="secondary" onClick={onCopy}>Copy signature</button></article>
    <article><h3>Apple Mail</h3><p>Copy the rendered signature, open Mail settings, choose Signatures, create a signature, and paste it into the signature editor.</p><button className="secondary" onClick={onCopy}>Copy signature</button></article>
  </div></section>;
}
