import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const app = readFileSync(join(root, 'src/App.tsx'), 'utf8');
const content = readFileSync(join(root, 'src/pages/FragmentosPage.tsx'), 'utf8');
const educomp = readFileSync(join(root, 'src/pages/EduCompPage.tsx'), 'utf8');
const projects = readFileSync(join(root, 'src/components/ProjectsSection.tsx'), 'utf8');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const manifest = JSON.parse(readFileSync(join(root, 'public/manifest.webmanifest'), 'utf8'));
const urls = new Set();
for (const code of [app, content, educomp, projects, html]) {
  for (const match of code.matchAll(/(?:src|href)=["'](\/[^"']+\.(?:webp|png|jpg|jpeg|svg))["']/g)) urls.add(match[1]);
}
for (const { src } of manifest.icons) urls.add(src);
for (const match of educomp.matchAll(/image: '(\/assets\/educomp\/[^']+\.png)'/g)) urls.add(match[1]);
for (const match of app.matchAll(/(?:src:\s*['"])(\/assets\/[^'"]+\.webp)/g)) urls.add(match[1]);
for (const dir of ['areas','stack','contato']) {
  const pattern = dir === 'stack' ? /icon: '([^']+)'/g : dir === 'areas' ? /(?:education|qa|ux|development|games): '([^']+)'/g : /kind: '([^']+)'/g;
  if (dir === 'contato') {
    for (const icon of ['email','github','linkedin']) urls.add(`/assets/visuais/contato/${icon}.png`);
  } else {
    for (const match of app.matchAll(pattern)) urls.add(`/assets/visuais/${dir}/${match[1]}.png`);
  }
}
let errors = 0;
for (const url of [...urls].sort()) {
  const file = join(root, 'public', url.slice(1));
  const exists = existsSync(file);
  console.log(`${exists ? 'OK' : 'FALHOU'}: ${url}`);
  if (!exists) errors++;
}
for (const dir of ['public/assets/galeria','public/assets/visuais/stack','public/assets/visuais/areas']) {
  if (!readdirSync(join(root,dir)).length) errors++;
}
console.log(`\n${urls.size-errors}/${urls.size} recursos conferidos.`);
if (errors) process.exitCode = 1;
