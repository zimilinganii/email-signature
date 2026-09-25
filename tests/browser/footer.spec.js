import {test,expect} from '@playwright/test';

test('developer credit belongs to the website, not exported signatures',async({page})=>{
 await page.goto('/');
 const footer=page.locator('footer');
 await expect(footer).toContainText('Created by');
 await expect(footer.getByRole('link',{name:'Zimi Lingani'})).toHaveAttribute('href','https://github.com/zimilinganii');
 for(const mode of ['personal','business']){
  const html=await page.evaluate(async mode=>{
   const {generateSignatureHtml}=await import('/src/utils/generateSignatureHtml.js');
   const {defaultProfile}=await import('/src/data/defaultProfile.js');
   return generateSignatureHtml({...defaultProfile,mode});
  },mode);
  expect(html).not.toContain('Created by');expect(html).not.toContain('github.com/zimilinganii');
 }
 await page.setViewportSize({width:390,height:844});
 await footer.scrollIntoViewIfNeeded();
 await expect(footer.getByRole('link',{name:'Zimi Lingani'})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
});
