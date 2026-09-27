import {test,expect} from '@playwright/test';
test('refresh restores personal and business drafts and explicit reset clears both',async({page})=>{
 await page.goto('/');await page.getByLabel('Full name',{exact:true}).fill('Personal Example');
 await page.getByRole('button',{name:'▣ Business',exact:true}).click();await page.getByLabel('Full name',{exact:true}).fill('Business Example');
 await expect(page.locator('.draft-save-status')).toContainText('Saved on this browser');
 await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('sincerely.signature-drafts.v1'))?.profile.fullName)).toBe('Business Example');
 await page.reload();await expect(page.getByLabel('Full name',{exact:true})).toHaveValue('Business Example');
 await page.getByRole('button',{name:'♡ Personal',exact:true}).click();await expect(page.getByLabel('Full name',{exact:true})).toHaveValue('Personal Example');
 page.once('dialog',dialog=>dialog.accept());await page.getByRole('button',{name:'Reset & clear saved data'}).click();
 await expect(page.getByLabel('Full name',{exact:true})).toHaveValue('Your Name');
 await expect.poll(()=>page.evaluate(()=>localStorage.getItem('sincerely.signature-drafts.v1')||'')).not.toContain('Example');
 await page.reload();await page.getByRole('button',{name:'▣ Business',exact:true}).click();await expect(page.getByLabel('Full name',{exact:true})).toHaveValue('Your Name');
});
