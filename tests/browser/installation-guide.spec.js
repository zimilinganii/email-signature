import {test,expect} from '@playwright/test';

test('provider and method selectors show matching instructions and perform the selected action',async({page},testInfo)=>{
 await page.goto('/');
 await page.evaluate(()=>{window.copies=[];Object.defineProperty(navigator,'clipboard',{configurable:true,value:{write:async()=>window.copies.push('formatted'),writeText:async()=>window.copies.push('source')}});});
 await page.getByRole('button',{name:'Review & create →',exact:true}).click();
 const guide=page.locator('.install-guide');
 const providers={gmail:'General → Signature',outlook:'Accounts → Signatures',classic:'File → Options → Mail',apple:'Mail → Settings → Signatures'};
 const methods={formatted:'Copy the finished design',imagefree:'Copy text, icons and links',download:'Open the file, then copy the design',source:'Turn the source into a rendered signature'};
 for(const [provider,step] of Object.entries(providers)){
  await guide.getByLabel('Email provider').selectOption(provider);
  for(const [method,title] of Object.entries(methods)){
   await guide.getByLabel('Installation method').selectOption(method);
   await expect(guide.locator('.guide-steps')).toContainText(step);
   await expect(guide.locator('.guide-preparation h3')).toHaveText(title);
   await expect(guide.locator('.guide-preparation button')).toBeEnabled();
  }
 }
 await guide.locator('.guide-preparation button').click();
 await expect.poll(()=>page.evaluate(()=>window.copies.at(-1))).toBe('source');
 await guide.getByLabel('Installation method').selectOption('formatted');await guide.locator('.guide-preparation button').click();
 await expect.poll(()=>page.evaluate(()=>window.copies.at(-1))).toBe('formatted');
 await guide.getByLabel('Installation method').selectOption('imagefree');await guide.locator('.guide-preparation button').click();
 await expect.poll(()=>page.evaluate(()=>window.copies.length)).toBe(3);
 await guide.getByLabel('Installation method').selectOption('download');
 const download=page.waitForEvent('download');await guide.locator('.guide-preparation button').click();expect((await download).suggestedFilename()).toBe('email-signature.html');
 await guide.getByLabel('Email provider').selectOption('gmail');
 await guide.getByLabel('Installation method').selectOption('formatted');
 await guide.screenshot({path:testInfo.outputPath('installation-guide.png')});
 await page.setViewportSize({width:390,height:844});
 await guide.screenshot({path:testInfo.outputPath('installation-mobile.png')});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
});
