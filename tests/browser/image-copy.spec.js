import {test,expect} from '@playwright/test';
test('photo optimizer limits image bytes and dimensions',async({page})=>{
 await page.goto('/');
 const result=await page.evaluate(async()=>{
  const {optimizeImageCanvas,dataUrlBytes}=await import('/src/utils/optimizeImage.js');
  const canvas=document.createElement('canvas');canvas.width=1000;canvas.height=1500;const ctx=canvas.getContext('2d');const data=ctx.createImageData(1000,1500);
  for(let i=0;i<data.data.length;i+=4){data.data[i]=(i*31)%256;data.data[i+1]=(i*47)%256;data.data[i+2]=(i*79)%256;data.data[i+3]=255;}ctx.putImageData(data,0,0);
  const url=optimizeImageCanvas(canvas,{photo:true});const image=new Image();image.src=url;await image.decode();return {bytes:dataUrlBytes(url),width:image.width,height:image.height,jpeg:url.startsWith('data:image/jpeg;')};
 });
 expect(result.bytes).toBeLessThanOrEqual(96*1024);expect(result.height).toBeLessThanOrEqual(540);expect(result.jpeg).toBe(true);
});
test('clipboard permission failure falls back to HTML, never plain-only copy',async({page})=>{
 await page.goto('/');
 const result=await page.evaluate(async()=>{
  const {copySignature}=await import('/src/utils/copySignature.js');
  Object.defineProperty(navigator,'clipboard',{configurable:true,value:{write:async()=>{throw new Error('blocked');}}});
  let html='';let plain='';document.execCommand=command=>{if(command!=='copy')return false;const data=new DataTransfer();const event=new ClipboardEvent('copy',{clipboardData:data});document.dispatchEvent(event);html=data.getData('text/html');plain=data.getData('text/plain');return true;};
  await copySignature('<table><tr><td><a href="https://example.com">Website</a></td></tr></table>','Website');return {html,plain};
 });
 expect(result.html).toContain('<table>');expect(result.html).toContain('href="https://example.com"');expect(result.plain).toBe('Website');
});
