import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const files = ['README.md'];
const visit = dir => {
  for (const name of readdirSync(dir)) {
    const file = join(dir, name);
    if (statSync(file).isDirectory()) visit(file);
    else if (extname(name) === '.md') files.push(file);
  }
};
visit(join(root, 'docs'));

let checked = 0;
const invalid = [];
for (const file of files) {
  const source = readFileSync(resolve(root, file), 'utf8');
  for (const match of source.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
    const href = match[1].trim().replace(/^<|>$/g, '');
    if (!href || /^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(href)) continue;
    const path = decodeURIComponent(href.split('#', 1)[0].split('?', 1)[0]);
    if (!path) continue;
    checked++;
    const target = resolve(dirname(resolve(root, file)), path);
    const relativeTarget = relative(root, target);
    const outsideRoot = relativeTarget === '..' || relativeTarget.startsWith(`..${sep}`) || isAbsolute(relativeTarget);
    if (outsideRoot || !existsSync(target)) {
      invalid.push(`${relative(root, resolve(root, file)).split(sep).join('/')}: ${href}`);
    }
  }
}
if (invalid.length) {
  for (const issue of invalid) console.error('FALHOU:', issue);
  process.exitCode = 1;
} else {
  console.log(`OK: ${files.length} documentos, ${checked} referÃªncias locais vÃ¡lidas.`);
}
