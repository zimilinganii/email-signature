import {test,expect} from '@playwright/test';
test('font selection persists and business address links to Maps with a themed pin',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'▣ Business',exact:true}).click();
 const address='12 Main Road, Cape Town & Gardens';
 await page.getByLabel('Business address / location (optional)',{exact:true}).fill(address);
 await page.getByRole('button',{name:'Style',exact:true}).click();
 await page.getByLabel('Signature font',{exact:true}).selectOption('georgia');
 const card=page.locator('[data-template="business-logo"]');
 const link=card.locator('[data-business-location] a');
 const url=new URL(await link.getAttribute('href'));expect(url.origin).toBe('https://www.google.com');expect(url.pathname).toBe('/maps/dir/');expect(url.searchParams.get('destination')).toBe(address);expect(url.searchParams.get('api')).toBe('1');
 await expect(link.locator('img')).toHaveAttribute('src',/personal-location\.png$/);
 await expect.poll(()=>link.locator('img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
 for(const element of await card.locator('a, [data-business-identity] > div').all()){
  expect(await element.evaluate(el=>getComputedStyle(el).fontFamily)).toContain('Georgia');
 }
 await page.reload();await page.getByRole('button',{name:'Style',exact:true}).click();
 await expect(page.getByLabel('Signature font',{exact:true})).toHaveValue('georgia');
 await page.getByRole('button',{name:'♡ Personal',exact:true}).click();
 await page.getByLabel('Signature font',{exact:true}).selectOption('verdana');
 await expect(page.locator('[data-business-location]')).toHaveCount(0);
 expect(await page.locator('[data-template] a[href^="mailto:"]').evaluate(el=>getComputedStyle(el).fontFamily)).toContain('Verdana');
});
