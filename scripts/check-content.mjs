import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(join(root, path), 'utf8');
const has = path => existsSync(join(root, path));
const app = read('src/App.tsx');
const projects = read('src/components/ProjectsSection.tsx');
const casePage = read('src/pages/EduCompPage.tsx');
const essay = read('src/pages/FragmentosPage.tsx');
const projectCss = read('src/projects.css');
const seo = JSON.parse(read('site-meta.json'));
const pkg = JSON.parse(read('package.json'));
const lock = JSON.parse(read('package-lock.json'));
const photos = Array.from(app.matchAll(/src: '\/(assets\/galeria\/[^']+\.webp)'/g), m => m[1]);
const techIcons = Array.from(app.matchAll(/\{ name: '[^']+', icon: '([^']+)' \}/g), m => m[1]);
const areaIcons = Array.from(app.matchAll(/(?:education|qa|ux|development|games): '([^']+)'/g), m => m[1]);
const styles = ['styles.css', 'editorial.css', 'landing-refinement.css', 'gallery-timeline-polish.css', 'finishing-touches.css', 'projects.css'];
const tests = [
  ['Entrada principal e estilos presentes', has('src/main.tsx') && styles.every(css => has(`src/${css}`))],
  ['Projetos estão em componente próprio', app.includes('<ProjectsSection onNavigate={onNavigate}/>') && projects.includes('id="projetos"')],
  ['Projetos sem carrossel e sem slides de largura fixa', !projects.includes('<Carousel') && !styles.some(css => /\.projects-carousel|\.project-slide|\.secondary-projects/.test(read(`src/${css}`)))],
  ['EduComp é o primeiro card e possui navegação', projects.indexOf('className="project-featured"') < projects.indexOf('className="projects-upcoming"') && projects.includes('href="/projetos/educomp"')],
  ['Dois cards futuros sem links falsos', projects.includes("['02', '03']") && projects.includes('<article className="project-placeholder"')],
  ['Layout de projetos fluido para mobile', projectCss.includes('grid-template-columns: minmax(0, 1fr)') && projectCss.includes('@media (max-width: 700px)')],
  ['Rotas internas renderizadas', app.includes('<EduCompPage onNavigate={navigate}/>') && app.includes('<FragmentosPage onNavigate={navigate}/>')],
  ['Navegação preserva abrir em nova aba', has('src/navigation.ts') && projects.includes('shouldNavigateInApp') && casePage.includes('shouldNavigateInApp')],
  ['EduComp apresentado como concluído', casePage.includes('PROJETO DE PORTFÓLIO · CONCLUÍDO') && !casePage.includes('EM DESENVOLVIMENTO')],
  ['EduComp descreve todas as fases', ['Produto (PO)', 'UX/UI Design', 'Desenvolvimento', 'QA e testes'].every(phase => casePage.includes(phase))],
  ['EduComp possui os três fluxos', ["kind: 'search'", "kind: 'detail'", "kind: 'submit'"].every(kind => casePage.includes(kind))],
  ['Galeria do caso com quatro reservas de imagem', (casePage.match(/id: '0[1-4]'/g) || []).length === 4],
  ['Botão do protótipo do EduComp disponível', casePage.includes('https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/')],
  ['Ensaio possui data e controles de leitura', essay.includes('dateTime="2026-11-11"') && essay.includes('Compartilhar') && essay.includes('Voltar a Fragmentos')],
  ['Ensaio possui três seções e sua navegação', ['aprender', 'tecnologia', 'experimentar'].every(id => essay.includes(`id: '${id}'`))],
  ['Sobre mim integrado à galeria e trajetória', app.includes('className="about-gallery"') && app.includes('id="trajetoria"') && !app.includes('className="gallery-section"')],
  ['Sobre mim preserva texto atual', app.includes('Minha trajetória passa pela sala de aula') && app.includes('Acredito que boa parte do aprendizado')],
  ['Galeria com oito arquivos reais', photos.length === 8 && new Set(photos).size === 8 && photos.every(path => has(`public/${path}`))],
  ['Ícones das 15 tecnologias disponíveis', techIcons.length === 15 && techIcons.every(name => has(`public/assets/visuais/stack/${name}.png`))],
  ['Ícones das cinco áreas disponíveis', areaIcons.length === 5 && areaIcons.every(name => has(`public/assets/visuais/areas/${name}.png`))],
  ['Ícones de contato disponíveis', ['email', 'github', 'linkedin'].every(name => has(`public/assets/visuais/contato/${name}.png`))],
  ['Hero, favicon e imagem social disponíveis', ['public/assets/hero-collage.webp', 'public/assets/hero-collage.png', 'public/assets/og-portfolio.png', 'public/favicon.svg'].every(has)],
  ['SEO configurado nas três rotas', ['/', '/projetos/educomp', '/fragmentos/a-potencia-do-fazer-digital-na-educacao'].every(path => seo[path]?.title && seo[path]?.description)],
  ['Versão do pacote sincronizada', pkg.version === lock.version && pkg.version === lock.packages[''].version],
  ['Acessibilidade do teclado e movimento reduzido', app.includes("event.key === 'ArrowRight'") && app.includes('className="skip-link"') && read('src/styles.css').includes('prefers-reduced-motion')],
  ['Scripts de migração temporários removidos', !readdirSync(root).some(name => /^aplicar-ajustes-portfolio-v\d+\.mjs$/.test(name))],
];

let failures = 0;
for (const [name, passed] of tests) {
  console.log(`${passed ? 'OK' : 'FALHOU'}: ${name}`);
  if (!passed) failures++;
}
console.log(`\n${tests.length - failures}/${tests.length} verificações concluídas.`);
if (failures) process.exitCode = 1;
