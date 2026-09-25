// Explicit documentation publishing only; never runs during application deployment.
import { mkdtemp, readdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const prepareOnly=process.argv.includes('--prepare-only');
const docs=fileURLToPath(new URL('../docs/',import.meta.url));
const checkout=await mkdtemp(join(tmpdir(),'signature-wiki-'));
const git=(args)=>execFileSync('git',args,{cwd:checkout,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
const pageName=name=>name==='README.md'?'Home':name.replace(/\.md$/,'').split('-').map(s=>s[0].toUpperCase()+s.slice(1)).join('-');
try {
  if(!prepareOnly)git(['clone','https://github.com/zimilinganii/email-signature.wiki.git','.']);
  const files=(await readdir(docs)).filter(name=>name.endsWith('.md')).sort();
  const mapping=new Map(files.map(name=>[name,pageName(name)]));
  for(const name of files){
    const source=await readFile(join(docs,name),'utf8');
    const linked=source.replace(/\]\((?:\.\/)?([\w-]+\.md)(#[^)]+)?\)/g,(match,target,anchor='')=>mapping.has(target)?`](${mapping.get(target)}${anchor})`:match);
    await writeFile(join(checkout,`${mapping.get(name)}.md`),linked);
  }
  await writeFile(join(checkout,'_Sidebar.md'),files.map(name=>`- [${mapping.get(name).replaceAll('-',' ')}](${mapping.get(name)})`).join('\n')+'\n');
  if(prepareOnly){console.log(`Prepared ${files.length} Wiki pages and sidebar at ${checkout}. No remote changes.`);}
  else {
    git(['add','--',...files.map(name=>`${mapping.get(name)}.md`),'_Sidebar.md']);
    if(git(['diff','--cached','--name-only'])){
      git(['commit','-m','Update signature generator documentation and diagrams']);
      git(['push','origin','HEAD']);
      console.log(`Published ${files.length} documentation pages.`);
    }else console.log('Wiki already matches repository documentation.');
    console.log(`Wiki checkout retained at ${checkout}`);
  }
}catch(error){
  console.error(`Wiki publication failed. Enable the Wiki and save its first page; check Git permissions. Checkout retained at ${checkout}.`);
  console.error(error.stderr?.toString()||error.message);
  process.exitCode=1;
}
