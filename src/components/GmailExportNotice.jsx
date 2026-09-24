export function GmailExportNotice({result,onCopyWithoutUploads}) {
  return <div className={result.ready?'gmail-size-note':'image-warning'} role="status">
    {result.ready?<p>Compact HTML prepared for Gmail ({result.characters.toLocaleString()} characters). Gmail may still adjust formatting when pasted.</p>:<><p>{result.issue}</p>{result.hasUploads&&<><p>Your photo remains in the preview and downloaded file. The option below omits uploaded images only; your links stay clickable.</p><button className="secondary" onClick={onCopyWithoutUploads}>Copy for Gmail without uploads</button></>}</>}
  </div>;
}
