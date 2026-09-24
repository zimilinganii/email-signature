export function GmailInstallButton({ onInstall, status, disabled }) {
  return <div className="gmail-box"><div><strong>Install in Gmail</strong><p>Google will ask for permission to update your Gmail signature. No email-reading permission is requested.</p></div><button className="primary" disabled={disabled} onClick={onInstall}>{status === 'loading' ? 'Connecting…' : 'Connect Gmail'}</button>{status === 'success' && <p className="success">Signature installed in Gmail.</p>}{status === 'error' && <p className="error">Gmail installation failed. Copy the signature manually instead.</p>}</div>;
}
