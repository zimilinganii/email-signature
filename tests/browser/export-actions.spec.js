import {test,expect} from '@playwright/test';

test('all ready export options have equal emphasis and work independently',async({page})=>{
 await page.goto('/');
 await page.evaluate(()=>{window.copies=[];Object.defineProperty(navigator,'clipboard',{configurable:true,value:{write:async()=>window.copies.push('formatted'),writeText:async()=>window.copies.push('source')}});});
 await page.getByRole('button',{name:'Review & create →',exact:true}).click();
 const actions=page.locator('.export-panel > .actions');
 for(const button of await actions.getByRole('button').all()){
  await expect(button).toBeEnabled();
  await expect(button).toHaveCSS('background-color','rgb(38, 95, 71)');
  await expect(button).toHaveCSS('cursor','pointer');
 }
 await actions.getByRole('button',{name:'Copy signature',exact:true}).click();
 await expect.poll(()=>page.evaluate(()=>window.copies.at(-1))).toBe('formatted');
 await actions.getByRole('button',{name:'Copy HTML',exact:true}).click();
 await expect.poll(()=>page.evaluate(()=>window.copies.at(-1))).toBe('source');
 const download=page.waitForEvent('download');
 await actions.getByRole('button',{name:'↓ Download',exact:true}).click();
 expect((await download).suggestedFilename()).toBe('email-signature.html');
});
