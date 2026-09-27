export function GmailExportNotice({result,onCopyWithoutUploads}) {
  return <div className={result.ready?'gmail-size-note':'image-warning'} role="status">
    {result.ready?<><div className="gmail-size-heading"><strong><span aria-hidden="true">✓ </span>HTML prepared for Gmail</strong><span className="gmail-size-count">{result.characters.toLocaleString()} characters</span></div><p>Gmail may slightly adjust the formatting when you paste your signature.</p></>:<><p>{result.issue}</p>{result.hasUploads&&<><p>Your photo remains in the preview and downloaded file. The option below omits uploaded images only; your links stay clickable.</p><button className="secondary" onClick={onCopyWithoutUploads}>Copy for Gmail without uploads</button></>}</>}
  </div>;
}
