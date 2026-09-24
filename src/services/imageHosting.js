import { dataUrlBytes, MAX_EMAIL_IMAGE_BYTES } from '../utils/optimizeImage';
export function imageHostingConfigured() {return Boolean(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME && import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);}
const cache=new Map();
export async function uploadSignatureImage(dataUrl) {
  if(!/^data:image\/(jpeg|png);base64,[a-z0-9+/=]+$/i.test(dataUrl))throw new Error('Please upload a JPG or PNG image.');
  if(dataUrlBytes(dataUrl)>MAX_EMAIL_IMAGE_BYTES)throw new Error('This image needs resizing before upload. Please select it again.');
  if(!imageHostingConfigured())throw new Error('Photo hosting is not connected yet. The site owner must complete the Cloudinary setup below before signatures with uploads can be copied.');
  if(cache.has(dataUrl))return cache.get(dataUrl);
  const cloud=import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  if(!/^[a-z0-9_-]+$/i.test(cloud))throw new Error('The image-hosting configuration is invalid.');
  const binary=atob(dataUrl.split(',')[1]);
  const bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));
  const mime=dataUrl.slice(5,dataUrl.indexOf(';'));
  const form=new FormData();form.append('file',new Blob([bytes],{type:mime}),mime==='image/png'?'signature.png':'signature.jpg');form.append('upload_preset',import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  let response;
  try {response=await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`,{method:'POST',body:form,signal:AbortSignal.timeout(30000)});} catch {throw new Error('Photo upload failed. Check your connection and select Review & create to retry.');}
  if(!response.ok)throw new Error('The image host rejected the upload. Check the unsigned upload preset and account quota, then retry.');
  const result=await response.json();
  let url;try {url=new URL(result.secure_url);}catch {throw new Error('The image host did not return a usable image URL.');}
  if(url.protocol!=='https:'||url.hostname!=='res.cloudinary.com'||!url.pathname.startsWith(`/${cloud}/image/upload/`))throw new Error('The image host returned an unexpected URL.');
  if(cache.size>=32)cache.delete(cache.keys().next().value);
  cache.set(dataUrl,url.href);return url.href;
}
export async function hostProfileImages(profile) {
  const result={...profile};
  for(const key of profile.mode==='business'?['photoUrl','logoUrl']:['photoUrl']){
    if(result[key]?.startsWith('data:'))result[key]=await uploadSignatureImage(result[key]);
  }
  return result;
}
