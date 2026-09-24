export function SignaturePreview({ html }) {
  return <div className="preview-card"><div className="preview-label">Live email preview</div><div className="email-canvas" dangerouslySetInnerHTML={{ __html: html }} /></div>;
}
