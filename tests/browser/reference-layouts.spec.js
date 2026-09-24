import { test, expect } from '@playwright/test';
import sharp from 'sharp';

test('exported contacts retain alignment without application styles',async({page},testInfo)=>{
  await page.goto('/');
  const markup=await page.evaluate(async()=>{
    const {generateSignatureHtml}=await import('/src/utils/generateSignatureHtml.js');
    const {defaultProfile}=await import('/src/data/defaultProfile.js');
    return generateSignatureHtml({...defaultProfile,fullName:'Alex Riley',role:'Data engineer / data scientist',phone:'+27 67 239 8773',email:'alexriley123@gmail.com',website:'https://ab123cd4.personal-website-c21.pages.dev/',photoUrl:'https://example.com/photo.png'});
  });
  async function measure(){return page.locator('[data-personal-contacts]').evaluate(grid=>{
    const phone=grid.querySelector('a[href^="tel:"]').getBoundingClientRect();
    const email=grid.querySelector('a[href^="mailto:"]').getBoundingClientRect();
    const site=grid.querySelector('a[href^="https:"]').getBoundingClientRect();
    return {phone:{x:phone.x,y:phone.y,height:phone.height},email:{x:email.x,y:email.y,height:email.height},site:{x:site.x,y:site.y},width:document.querySelector('[data-template]').getBoundingClientRect().width};
  });}
  await page.setContent(`<style>*{box-sizing:border-box}body{margin:0}</style>${markup}`);
  const preview=await measure();
  await page.setContent(`<body style="margin:0">${markup}</body>`);
  const exported=await measure();
  expect(exported).toEqual(preview);
  expect(exported.phone.height).toBeLessThan(20);
  expect(exported.email.height).toBeLessThan(20);
  expect(exported.phone.y).toBe(exported.email.y);
  expect(exported.phone.x).toBe(exported.site.x);
  expect(exported.width).toBe(660);
  await page.locator('[data-template]').screenshot({path:testInfo.outputPath('standalone-export.png')});
});

test('personal reference geometry keeps contact columns aligned', async ({page},testInfo)=>{
  await page.goto('/');
  const photo = await sharp({create:{width:400,height:400,channels:3,background:'#dce0fc'}}).png().toBuffer();
  await page.evaluate(async source=>{
    const {generateSignatureHtml}=await import('/src/utils/generateSignatureHtml.js');
    const {defaultProfile}=await import('/src/data/defaultProfile.js');
    document.body.innerHTML=generateSignatureHtml({...defaultProfile,fullName:'Michel Hansen',role:'Marketing expert',phone:'000 123 456 789',email:'hello@example.com',website:'https://example.com',photoUrl:source,links:[{label:'Facebook',url:'https://facebook.com',enabled:true},{label:'Twitter',url:'https://x.com',enabled:true},{label:'LinkedIn',url:'https://linkedin.com',enabled:true}]},{preview:true});
    document.body.style.margin='0';
  },`data:image/png;base64,${photo.toString('base64')}`);
  const card=page.locator('[data-template="personal-circle"]');
  const bounds=await card.boundingBox();expect(bounds.width).toBe(660);
  const grid=page.locator('[data-personal-contacts]');
  const phone=await grid.getByRole('link',{name:'000 123 456 789'}).boundingBox();
  const website=await grid.getByRole('link',{name:'example.com',exact:true}).boundingBox();
  expect(Math.abs(phone.x-website.x)).toBeLessThan(1);
  const frame=await page.locator('[data-personal-photo]').boundingBox();
  expect(Math.abs(frame.width-frame.height)).toBeLessThan(1);
  await card.screenshot({path:testInfo.outputPath('personal-reference.png')});
});

test('personal and business uploads, crop controls, and independent drafts', async ({ page }, testInfo) => {
  // A generated geometric fixture avoids publishing anyone's portrait in tests.
  const photo = await sharp({create:{width:400,height:600,channels:3,background:'#aaa5d3'}}).png().toBuffer();
  await page.goto('/');
  await page.getByRole('button', { name: /Upload your photo/ }).click();
  await page.getByLabel('Upload your photo', {exact:true}).setInputFiles({name:'portrait.png',mimeType:'image/png',buffer:photo});
  const personal = page.locator('[data-template="personal-circle"]');
  await expect(personal.locator('img[alt="Your Name"]')).toBeVisible();
  await expect(page.getByText('Horizontal position · 50%')).toBeVisible();
  await page.getByLabel('Zoom · 1×').fill('1.5');
  await expect(page.getByText('Zoom · 1.5×')).toBeVisible();
  const personalSrc = await personal.locator('img[alt="Your Name"]').getAttribute('src');
  await page.screenshot({path:testInfo.outputPath('personal.png'),fullPage:true});
  await page.getByRole('button', {name:'▣ Business',exact:true}).click();
  await page.getByLabel('Upload your photo', {exact:true}).setInputFiles({name:'portrait.png',mimeType:'image/png',buffer:photo});
  await page.getByLabel('Upload business logo', {exact:true}).setInputFiles('public/icons/website.png');
  const business = page.locator('[data-template="business-portrait"]');
  const portrait = business.locator('img[alt="Your Name"]');
  await expect(portrait).toHaveAttribute('height','180');
  await expect(business.locator('img[alt="Your Company"]')).toBeVisible();
  await page.screenshot({path:testInfo.outputPath('business.png'),fullPage:true});
  await page.getByRole('button',{name:'♡ Personal',exact:true}).click();
  await expect(personal.locator('img[alt="Your Name"]')).toHaveAttribute('src',personalSrc);
  await page.getByRole('button',{name:'Review & create →',exact:true}).click();
  await expect(page.getByRole('button',{name:'Download',exact:false})).toBeVisible();
  await page.getByRole('button',{name:'Details',exact:true}).click();
  await page.getByLabel('Full name').fill('New name');
  await expect(page.getByText('Your signature is ready')).toHaveCount(0);
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:testInfo.outputPath('mobile.png'),fullPage:true});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
});
