import {test,expect} from '@playwright/test';
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
