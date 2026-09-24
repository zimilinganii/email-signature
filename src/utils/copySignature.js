// Both paths explicitly supply HTML. Never silently replace a formatted copy with plain text.
export async function copySignature(html, plain) {
  try {
    if(!navigator.clipboard?.write||!window.ClipboardItem)throw new Error('Rich clipboard unavailable');
    await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([html],{type:'text/html'}),'text/plain':new Blob([plain],{type:'text/plain'})})]);
    return;
  } catch {
    const element=document.createElement('div');
    element.contentEditable='true';element.innerHTML=html;
    Object.assign(element.style,{position:'fixed',left:'-10000px',top:'0'});
    const selection=window.getSelection();
    const ranges=Array.from({length:selection.rangeCount},(_,i)=>selection.getRangeAt(i).cloneRange());
    const active=document.activeElement;
    document.body.appendChild(element);element.focus();
    const range=document.createRange();range.selectNodeContents(element);selection.removeAllRanges();selection.addRange(range);
    let wroteHtml=false;
    const handler=event=>{if(event.clipboardData){event.preventDefault();event.clipboardData.setData('text/html',html);event.clipboardData.setData('text/plain',plain);wroteHtml=true;}};
    document.addEventListener('copy',handler);
    let success=false;
    try {success=document.execCommand('copy')&&wroteHtml;} finally {document.removeEventListener('copy',handler);element.remove();selection.removeAllRanges();ranges.forEach(r=>selection.addRange(r));active?.focus();}
    if(!success)throw new Error('Your browser blocked formatted copying. Allow clipboard access, or download HTML, open it in a browser and copy the rendered signature.');
  }
}
