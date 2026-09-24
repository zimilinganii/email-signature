import {test,expect} from '@playwright/test';

test('business contacts grow without wrapping in standalone exported HTML',async({page},testInfo)=>{
 await page.goto('/');
 const html=await page.evaluate(async()=>{
  const {generateSignatureHtml}=await import('/src/utils/generateSignatureHtml.js');
  const {defaultProfile}=await import('/src/data/defaultProfile.js');
  return generateSignatureHtml({...defaultProfile,mode:'business',company:'',fullName:'Zimi Lingani',role:'Founder & Director',email:'z.lingani@lingservices.co.za',phone:'+27 21 556 8775',website:'https://www.linganicleaningservices.co.za'} ,{preview:true});
 });
 await page.setContent(html);
 const links=page.locator('[data-business-contacts] a');
 await expect(links).toHaveCount(3);
 for(const link of await links.all()){
  const box=await link.boundingBox();expect(box.height).toBeLessThan(20);
  expect(await link.evaluate(el=>getComputedStyle(el).whiteSpace)).toBe('nowrap');
 }
 const boxes=await links.evaluateAll(items=>items.map(el=>{const r=el.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top};}));
 expect(boxes[0].top).toBe(boxes[1].top);expect(boxes[1].top).toBe(boxes[2].top);
 expect(boxes[0].right).toBeLessThan(boxes[1].left);expect(boxes[1].right).toBeLessThan(boxes[2].left);
 await expect(page.locator('img[alt="LinkedIn"]')).toHaveAttribute('width','36');
 await page.locator('[data-template]').screenshot({path:testInfo.outputPath('business-long-contacts.png')});
});
