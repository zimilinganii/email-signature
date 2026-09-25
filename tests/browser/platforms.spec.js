import {test,expect} from '@playwright/test';

test('platform selector exposes all options and permits more than three links in both modes',async({page})=>{
 await page.goto('/');
 await page.getByRole('button',{name:'Links',exact:true}).click();
 for(const platform of ['Facebook','Instagram','WhatsApp','Portfolio']){
  await page.getByRole('button',{name:'+ Add platform',exact:true}).click();
  const select=page.getByLabel('Platform name').last();
  await expect(select.locator('option')).toHaveCount(7);
  await select.selectOption(platform);
  await page.getByLabel(`${platform} URL`,{exact:true}).last().fill(`https://example.com/${platform}`);
 }
 await expect(page.getByLabel('Platform name')).toHaveCount(6);
 await expect(page.getByRole('button',{name:'+ Add platform',exact:true})).toBeEnabled();
 await expect(page.locator('[data-template] a[title]')).toHaveCount(6);
 await expect(page.locator('[data-template] img[alt="Instagram"]')).toHaveAttribute('width','18');
 await page.getByRole('button',{name:'▣ Business',exact:true}).click();
 await expect(page.locator('[data-business-socials] a')).toHaveCount(6);
 await expect(page.locator('[data-business-socials] img[alt="Instagram"]')).toHaveAttribute('width','18');
 await page.getByRole('button',{name:'+ Add platform',exact:true}).click();
 // An empty URL must not produce a ghost icon in either template.
 await expect(page.locator('[data-business-socials] a')).toHaveCount(6);
});

test('many business platforms form aligned rows and every valid link remains present',async({page},testInfo)=>{
 await page.goto('/');
 const html=await page.evaluate(async()=>{
  const {generateSignatureHtml}=await import('/src/utils/generateSignatureHtml.js');
  const {defaultProfile}=await import('/src/data/defaultProfile.js');
  return generateSignatureHtml({...defaultProfile,mode:'business',links:Array.from({length:12},(_,i)=>({label:'GitHub',enabled:true,url:`https://example.com/${i}`}))},{preview:true});
 });
 await page.setContent(html);
 const rows=page.locator('[data-business-socials] tr');
 await expect(rows).toHaveCount(2);await expect(rows.first().locator('a')).toHaveCount(10);await expect(rows.last().locator('a')).toHaveCount(2);
 for(const row of await rows.all()){
  const boxes=await row.locator('img').evaluateAll(items=>items.map(el=>{const r=el.getBoundingClientRect();return {x:r.x,right:r.right,y:r.y,width:r.width};}));
  for(let i=0;i<boxes.length;i++){expect(boxes[i].width).toBe(18);if(i){expect(boxes[i].y).toBe(boxes[0].y);expect(boxes[i].x).toBeGreaterThan(boxes[i-1].right);}}
 }
 await page.locator('[data-template]').screenshot({path:testInfo.outputPath('business-platforms.png')});
});

test('personal platforms form extra compact columns without dropping links',async({page},testInfo)=>{
 await page.goto('/');
 const html=await page.evaluate(async()=>{
  const {generateSignatureHtml}=await import('/src/utils/generateSignatureHtml.js');
  const {defaultProfile}=await import('/src/data/defaultProfile.js');
  return generateSignatureHtml({...defaultProfile,links:Array.from({length:12},(_,i)=>({label:'GitHub',enabled:true,url:`https://example.com/${i}`}))},{preview:true});
 });
 await page.setContent(html);
 const icons=page.locator('img[alt="GitHub"]');await expect(icons).toHaveCount(12);
 const boxes=await icons.evaluateAll(items=>items.map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,bottom:r.bottom};}));
 for(let i=0;i<8;i++){expect(boxes[i].width).toBe(18);expect(boxes[i].x).toBe(boxes[0].x);if(i)expect(boxes[i].y).toBeGreaterThan(boxes[i-1].bottom);}
 expect(boxes[8].x).toBeGreaterThan(boxes[0].x);
 await page.locator('[data-template]').screenshot({path:testInfo.outputPath('personal-platforms.png')});
});

test('manual includes every export method and both provider setup paths',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Review & create →',exact:true}).click();
 const guide=page.locator('.instructions');
 await expect(guide.getByLabel('Installation method').locator('option')).toHaveCount(4);
 await expect(guide.locator('.guide-steps')).toContainText('Gmail · web');await guide.getByLabel('Email provider').selectOption('classic');await expect(guide.locator('.guide-steps')).toContainText('File → Options → Mail');await expect(guide).toContainText('still working on automatic installation');
});
