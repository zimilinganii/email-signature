import { useRef, useState } from 'react';
import { IconColorControl } from './IconColorControl';
import { optimizeImageCanvas } from '../utils/optimizeImage';

function ImageEditor({ title, field, profile, onChange }) {
  const [error,setError] = useState('');
  const [cropState,setCropState] = useState({ zoom:1, x:50, y:50 });
  const original = useRef(null);
  const version = useRef(0);
  const photo = field === 'photoUrl';
  const portrait = photo && profile.mode === 'business';
  function crop(image, settings) {
    const canvas = document.createElement('canvas');
    canvas.width = photo ? 360 : Math.min(600,image.width);
    canvas.height = photo ? (portrait ? 540 : 360) : Math.round(image.height*canvas.width/image.width);
    const ctx = canvas.getContext('2d');
    if(photo) {
      const ratio = canvas.width/canvas.height;
      const w = Math.min(image.width,image.height*ratio)/settings.zoom;
      const h = w/ratio;
      ctx.drawImage(image,(image.width-w)*settings.x/100,(image.height-h)*settings.y/100,w,h,0,0,canvas.width,canvas.height);
    } else ctx.drawImage(image,0,0,canvas.width,canvas.height);
    try {onChange(field,optimizeImageCanvas(canvas,{photo}));setError('');} catch(e) {setError(e.message);}
  }
  function upload(event) {
    const file=event.target.files[0];event.target.value='';if(!file)return;
    const ticket=++version.current;
    if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>5242880){setError('Choose a PNG, JPG, or WebP image under 5 MB.');return;}
    const url=URL.createObjectURL(file);const image=new Image();
    image.onload=()=>{URL.revokeObjectURL(url);if(ticket!==version.current)return;if(image.width*image.height>40000000){setError('Choose an image under 40 megapixels.');return;}original.current=image;const initial={zoom:1,x:50,y:50};setCropState(initial);crop(image,initial);setError('');};
    image.onerror=()=>{URL.revokeObjectURL(url);setError('Cannot open this image.');};image.src=url;
  }
  const sizeField=photo?'photoSize':'logoSize';
  const current=profile[field];
  return <div className="image-editor"><h3>{title}</h3><p className="hint">{photo ? (portrait?'Your portrait appears on the right of the business card.':'Your picture appears in the circular frame.') : 'Your logo appears on the left, beside your name and contact details.'}</p>{current&&<img className={`upload-thumbnail ${portrait?'portrait':''}`} src={current} alt={`${title} preview`}/>}<label className="upload-zone">＋ {current?'Replace':'Upload'} {title.toLowerCase()}<input aria-label={`Upload ${title.toLowerCase()}`} type="file" accept="image/png,image/jpeg,image/webp" onChange={upload}/></label><details><summary>Use a hosted image instead</summary><label><span>Public HTTPS image URL</span><input type="url" placeholder="https://your-site.com/image.png" value={current.startsWith('data:')?'':current} onChange={e=>{version.current++;original.current=null;onChange(field,e.target.value);}}/></label></details>{current&&<><label><span>Display size · {profile[sizeField]}px</span><input type="range" min="40" max="180" value={profile[sizeField]} onChange={e=>onChange(sizeField,Number(e.target.value))}/></label>{photo&&original.current&&[['zoom','Zoom',1,3,.1],['x','Horizontal position',0,100,1],['y','Vertical position',0,100,1]].map(([key,label,min,max,step])=><label key={key}><span>{label} · {cropState[key]}{key==='zoom'?'×':'%'}</span><input type="range" min={min} max={max} step={step} value={cropState[key]} onChange={e=>{const next={...cropState,[key]:Number(e.target.value)};setCropState(next);crop(original.current,next);}}/></label>)}<button className="text-button" onClick={()=>{version.current++;original.current=null;onChange(field,'');}}>Remove image</button></>}{error&&<p role="alert" className="error">{error}</p>}</div>;
}
export function ImageFields({profile,onChange}) {
  return <>{profile.mode==='personal'&&<ImageEditor key={`${profile.mode}-photo`} title="Your photo" field="photoUrl" profile={profile} onChange={onChange}/>}{profile.mode==='business'&&<ImageEditor title="Business logo" field="logoUrl" profile={profile} onChange={onChange}/>}<p className="hint">Images are resized for email and may lose some quality.</p><p className="hint">When you create your signature, uploaded images are hosted publicly so email recipients can see them.</p></>;
}
export function AppearanceForm({profile,onChange}) {
  return <><div className="color-grid">{[['accent','Accent'],['background','Background'],['textColor','Text']].map(([key,label])=><label key={key}><span>{label}</span><input type="color" value={profile[key]} onChange={e=>onChange(key,e.target.value)}/></label>)}</div><IconColorControl profile={profile} onChange={onChange}/>{profile.mode==='personal'&&<label><span>Signature layout</span><select value={profile.layout} onChange={e=>onChange('layout',e.target.value)}><option value="side">Circular photo · reference layout</option><option value="stack">Stacked</option></select></label>}<p className="hint">{profile.mode==='business'?'Business layout: logo left, name and role beside a divider, platforms top right, and a horizontal contact strip below.':'Personal layout: social links, framed circular portrait, then your name and contact details.'}</p></>;
}
