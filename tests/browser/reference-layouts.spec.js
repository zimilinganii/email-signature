import { test, expect } from '@playwright/test';
import sharp from 'sharp';

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
