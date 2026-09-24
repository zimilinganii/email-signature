import { useRef, useState } from 'react';
function ImageEditor({ title, field, profile, onChange }) {
  const [error,setError] = useState(''); const [zoom,setZoom] = useState(1); const original = useRef(null); const version = useRef(0);
  function crop(image,scale) {
    const canvas = document.createElement('canvas'); const photo = field === 'photoUrl'; canvas.width = photo ? 360 : Math.min(600,image.width); canvas.height = photo ? 360 : Math.round(image.height*canvas.width/image.width);
    const ctx = canvas.getContext('2d');
    if (photo) { const edge = Math.min(image.width,image.height)/scale; ctx.drawImage(image,(image.width-edge)/2,(image.height-edge)/2,edge,edge,0,0,360,360); } else ctx.drawImage(image,0,0,canvas.width,canvas.height);
    onChange(field,canvas.toDataURL('image/png'));
  }
  function upload(event) {
    const file = event.target.files[0]; event.target.value = ''; if (!file) return; const ticket = ++version.current;
    if (!['image/png','image/jpeg','image/webp'].includes(file.type) || file.size > 5242880) { setError('Choose a PNG, JPG, or WebP image under 5 MB.'); return; }
    const url = URL.createObjectURL(file); const image = new Image(); image.onload = () => { URL.revokeObjectURL(url); if (ticket !== version.current) return; if (image.width*image.height > 40000000) { setError('Choose an image under 40 megapixels.'); return; } original.current = image; setZoom(1); crop(image,1); setError(''); }; image.onerror = () => { URL.revokeObjectURL(url); setError('Cannot open this image.'); }; image.src = url;
  }
  const sizeField = field === 'photoUrl' ? 'photoSize' : 'logoSize';
  return <div className="image-editor"><h3>{title}</h3><label className="upload-zone">＋ Upload {title.toLowerCase()}<input type="file" accept="image/png,image/jpeg,image/webp" onChange={upload}/></label><label><span>Or a public HTTPS image URL</span><input type="url" placeholder="https://your-site.com/image.png" value={profile[field].startsWith('data:') ? '' : profile[field]} onChange={e => { version.current++; original.current=null; onChange(field,e.target.value); }}/></label>{profile[field] && <><label><span>Size · {profile[sizeField]}px</span><input type="range" min="40" max="180" value={profile[sizeField]} onChange={e => onChange(sizeField,Number(e.target.value))}/></label>{field === 'photoUrl' && <><label><span>Rounded corners · {profile.photoRound}%</span><input type="range" min="0" max="50" value={profile.photoRound} onChange={e => onChange('photoRound',Number(e.target.value))}/></label>{original.current && <label><span>Photo zoom · {zoom.toFixed(1)}×</span><input type="range" min="1" max="3" step="0.1" value={zoom} onChange={e => { const v=Number(e.target.value); setZoom(v); crop(original.current,v); }}/></label>}</>}<button className="text-button" onClick={() => { version.current++; original.current=null; onChange(field,''); }}>Remove image</button></>}{error && <p role="alert" className="error">{error}</p>}</div>;
}
export function AppearanceForm({profile,onChange}) {
 return <><div className="color-grid">{[['accent','Accent'],['background','Background'],['textColor','Text']].map(([key,label]) => <label key={key}><span>{label}</span><input type="color" value={profile[key]} onChange={e=>onChange(key,e.target.value)}/></label>)}</div><label><span>Signature layout</span><select value={profile.layout} onChange={e=>onChange('layout',e.target.value)}><option value="side">Side by side</option><option value="stack">Stacked</option></select></label><ImageEditor title="Photo" field="photoUrl" profile={profile} onChange={onChange}/>{profile.mode==='business' && <ImageEditor title="Business logo" field="logoUrl" profile={profile} onChange={onChange}/>}<p className="hint">Uploads stay on your device. Use a public image URL for reliable delivery in Gmail. Adjustments appear instantly in your preview.</p></>;
}
