export const MAX_EMAIL_IMAGE_BYTES = 96 * 1024;
export function dataUrlBytes(value) { return Math.ceil((value.split(',')[1] || '').length * 3 / 4); }
// Hosting keeps these bytes out of signature HTML; optimization improves loading time.
export function optimizeImageCanvas(source, { photo=false }={}) {
  const output=document.createElement('canvas');
  const scale=Math.min(1,540/Math.max(source.width,source.height));
  output.width=Math.max(1,Math.round(source.width*scale));output.height=Math.max(1,Math.round(source.height*scale));
  const draw=()=>{const context=output.getContext('2d');if(photo){context.fillStyle='#ffffff';context.fillRect(0,0,output.width,output.height);}context.drawImage(source,0,0,output.width,output.height);};
  draw();
  let result=output.toDataURL(photo?'image/jpeg':'image/png',0.82);
  if(photo)for(const quality of [0.7,0.55,0.4]){if(dataUrlBytes(result)<=MAX_EMAIL_IMAGE_BYTES)break;result=output.toDataURL('image/jpeg',quality);}
  while(dataUrlBytes(result)>MAX_EMAIL_IMAGE_BYTES&&Math.max(output.width,output.height)>80){output.width=Math.max(1,Math.round(output.width*0.8));output.height=Math.max(1,Math.round(output.height*0.8));draw();result=output.toDataURL(photo?'image/jpeg':'image/png',0.55);}
  if(dataUrlBytes(result)>MAX_EMAIL_IMAGE_BYTES)throw new Error('This image could not be optimized. Please choose a simpler image.');
  return result;
}
