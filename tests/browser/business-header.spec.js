import {test,expect} from '@playwright/test';
test('divider spans the whole header beside a tall logo',async({page})=>{
 await page.goto('/');
 const html=await page.evaluate(async()=>{
  const {generateSignatureHtml}=await import('/src/utils/generateSignatureHtml.js');
  const {defaultProfile}=await import('/src/data/defaultProfile.js');
  const canvas=document.createElement('canvas');canvas.width=150;canvas.height=170;
  return generateSignatureHtml({...defaultProfile,mode:'business',company:'',logoUrl:canvas.toDataURL()},{preview:true});
 });
 await page.setContent(html);
 const header=page.locator('[data-business-header]');
 await expect(header).toHaveCSS('border-left-width','3px');
 await expect(page.locator('[data-business-identity]')).toHaveCSS('border-left-width','0px');
 const box=await header.boundingBox();
 const identity=await page.locator('[data-business-identity]').boundingBox();
 const strip=await page.locator('[data-business-contacts]').locator('..').boundingBox();
 expect(box.height).toBeGreaterThan(identity.height);
 expect(Math.abs(box.y+box.height-strip.y)).toBeLessThan(1);
});
test('business header shares the name row with icons and omits empty social space',async({page},testInfo)=>{
 await page.goto('/');
 for(const count of [0,2,9]){
  const html=await page.evaluate(async count=>{
   const {generateSignatureHtml}=await import('/src/utils/generateSignatureHtml.js');
   const {defaultProfile}=await import('/src/data/defaultProfile.js');
   return generateSignatureHtml({...defaultProfile,mode:'business',links:Array.from({length:count},(_,i)=>({enabled:true,label:'GitHub',url:`https://example.com/${i}`}))},{preview:true});
  },count);
  await page.setContent(html);
  await expect(page.locator('[data-business-header]')).toHaveCount(1);
  await expect(page.locator('[data-business-socials] a')).toHaveCount(count);
  if(!count)await expect(page.locator('[data-business-platform-area]')).toHaveCount(0);
  else{
   const name=await page.locator('[data-business-identity]').boundingBox();
   const icons=await page.locator('[data-business-platform-area]').boundingBox();
   expect(Math.abs(name.y-icons.y)).toBeLessThan(1);expect(icons.x).toBeGreaterThanOrEqual(name.x+name.width);
  }
  await page.locator('[data-template]').screenshot({path:testInfo.outputPath(`header-${count}.png`)});
 }
});
