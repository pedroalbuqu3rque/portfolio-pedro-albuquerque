import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(join(root, path), 'utf8');
const has = path => existsSync(join(root, path));
const app = read('src/App.tsx');
const html = read('index.html');
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
  ['EduComp apresentado como plataforma concluída', casePage.includes('<CaseEyebrow>EDUCAÇÃO DIGITAL</CaseEyebrow>') && !casePage.includes('EM DESENVOLVIMENTO') && !casePage.includes('PROTOTYPE_URL')],
  ['EduComp descreve todas as fases', ['Produto (PO)', 'UX/UI Design', 'Desenvolvimento', 'QA e testes'].every(phase => casePage.includes(phase))],
  ['EduComp possui os três fluxos', ['BUSCAR', 'EXPLORAR', 'CONTRIBUIR'].every(action => casePage.includes(`action: '${action}'`))],
  ['Galeria com quatro capturas da plataforma', (casePage.match(/id: '0[1-4]'/g) || []).length === 4 && ['biblioteca-educomp.png', 'detalhes-material-educomp.png', 'enviar-materiais-educomp.png', 'comunidade-educomp.png'].every(image => has(`public/assets/educomp/${image}`) && casePage.includes(image))],
  ['Capa do EduComp com tela inicial real', projects.includes('src="/assets/educomp/tela-inicial-educomp.png"') && has('public/assets/educomp/tela-inicial-educomp.png')],
  ['Plataforma e código-fonte acessíveis em duas ações', casePage.includes('https://portaleducomp.vercel.app') && casePage.includes('https://github.com/pedroalbuqu3rque/educomp.git') && casePage.includes('<ProjectLinks position="hero" />') && casePage.includes('<ProjectLinks position="final" />')],
  ['Marcação redundante e seção de ferramentas removidas', !casePage.includes('case-flow-intro') && !casePage.includes('case-tools') && !casePage.includes('case-process-copy small')],
  ['Dois destaques na faixa superior e lista inferior preservada', projects.includes('className="projects-featured-row"') && projects.includes('<ShowcasePlaceholder />') && projects.includes("['02', '03']") && projectCss.includes('grid-template-columns: repeat(2, minmax(0, 1fr))') && projectCss.includes('@media (max-width: 850px)')],
  ['Hover do currículo em preto', /\.hero-actions \.hero-cv-button:is\(:hover, :focus-visible\) \{\s*background: #111;\s*color: #fff;\s*border-color: #111;/.test(read('src/gallery-timeline-polish.css'))],
  ['Fragmentos sem faixa azul na borda da imagem', read('src/finishing-touches.css').includes('border: 0;') && !read('src/styles.css').includes('border-right: 7px solid var(--blue);') && !read('src/styles.css').includes('border-bottom: 6px solid var(--blue);')],
  ['Setas vetoriais sem caracteres com aparência de emoji', has('src/components/ArrowIcon.tsx') && [app, projects, casePage, essay].every(source => !/[←→↗↓]/.test(source)) && app.includes('ArrowIcon direction="down"') && projects.includes('ArrowIcon direction="up-right"')],
  ['Ensaio possui data e controles de leitura', essay.includes('dateTime={ESSAY_PUBLISHED}') && essay.includes('Compartilhar') && essay.includes('Voltar a Fragmentos') && read('src/content/ensaio-fazer-digital.ts').includes('ESSAY_PUBLISHED = "2026-11-12"') && app.includes('dateTime={ESSAY_PUBLISHED}')],
  ['Ensaio possui seis seções e sua navegação', (() => {
    const page = read('src/pages/FragmentosPage.tsx');
    const essay = read('src/content/ensaio-fazer-digital.ts');
    const ids = [...essay.matchAll(/\{\s*id:\s*"([^"\n]+)"\s*,\s*title:\s*"[^"\n]+"\s*,\s*paragraphs:\s*\[/g)].map(x => x[1]);
    return ids.length === 6 && new Set(ids).size === 6
      && ids.join(',') === 'pensar,autonomia,tecnologia,experimentar,compartilhar,aprendizagem'
      && page.includes('ESSAY_SECTIONS.map')
      && page.includes('outline.map')
      && page.includes('id={section.id}')
      && /href\s*=\s*\{[^}]*#/.test(page)
      && page.includes('ESSAY_ENDING');
  })()],
  ['Sobre mim integrado à galeria e trajetória', app.includes('className="about-gallery"') && app.includes('id="trajetoria"') && !app.includes('className="gallery-section"')],
  ['Sobre mim preserva texto atual', app.includes('Minha trajetória passa pela sala de aula') && app.includes('Acredito que boa parte do aprendizado')],
  ['Galeria com nove arquivos reais e foto principal', photos.length === 9 && photos[0] === 'assets/galeria/00-apresentacao.webp' && new Set(photos).size === 9 && photos.every(path => has(`public/${path}`))],
  ['Ícones das 15 tecnologias disponíveis', techIcons.length === 15 && techIcons.every(name => has(`public/assets/visuais/stack/${name}.png`))],
  ['Ícones das cinco áreas disponíveis', areaIcons.length === 5 && areaIcons.every(name => has(`public/assets/visuais/areas/${name}.png`))],
  ['Ícones de contato disponíveis', ['email', 'github', 'linkedin'].every(name => has(`public/assets/visuais/contato/${name}.png`))],
  ['Favicon é apenas um quadrado azul', read('public/favicon.svg').includes('fill="#054fff"') && !read('public/favicon.svg').includes('<text') && html.includes('/favicon.svg?v=20261113')],
  ['Capa de Fragmentos sem selo sobre a foto', !app.includes('fragment-image-label') && !read('src/fragmentos-essay.css').includes('.fragment-image-label') && !read('src/finishing-touches.css').includes('.fragment-image-label')],
  ['Hero, favicon e imagem social disponíveis', ['public/assets/hero-collage.webp', 'public/assets/og-portfolio.png', 'public/favicon.svg'].every(has)],
  ['SEO configurado nas três rotas', ['/', '/projetos/educomp', '/fragmentos/a-potencia-do-fazer-digital-na-educacao'].every(path => seo[path]?.title && seo[path]?.description)],
  ['Versão do pacote sincronizada', pkg.version === lock.version && pkg.version === lock.packages[''].version],
  ['Acessibilidade do teclado e movimento reduzido', app.includes("event.key === 'ArrowRight'") && app.includes('className="skip-link"') && read('src/styles.css').includes('prefers-reduced-motion')],
  ['Ensaio sem textos ou datas duplicados', essay.includes('ESSAY_TITLE') && !essay.includes('11 NOV 2026') && !app.includes('11 NOV 2026')],
  ['Capturas reais no EduComp sem instruções editoriais', !casePage.includes('ADICIONAR CAPTURA') && casePage.includes('<img src={image}') && casePage.includes('className="case-flow-screen"')],
  ['Frase de apresentação em negrito', app.includes('<strong>Acredito que boa parte do aprendizado acontece quando a gente coloca a mão na massa.</strong>')],
  ['Abertura inicial com fonte do rodapé', html.includes('id="portfolio-intro"') && html.includes('PEDRO ALBUQUERQUE</span>') && html.includes("font-family: 'Archivo'") && app.includes('portfolio-intro--leave')],
  ['Fontes e estilos antigos removidos', !['src/portfolio-v22.css','src/portfolio-v23.css','src/portfolio-v24.css','src/portfolio-v25.css','src/portfolio-v26.css','src/components/DeskIllustration.tsx'].some(has)],
  ['Documentação e configuração de publicação presentes', ['README.md','.gitignore','.env.example','site-meta.json'].every(has)],
  ['Scripts de migração temporários removidos', !readdirSync(root).some(name => /^aplicar-ajustes-portfolio-v\d+\.mjs$/.test(name))],
];

let failures = 0;
for (const [name, passed] of tests) {
  console.log(`${passed ? 'OK' : 'FALHOU'}: ${name}`);
  if (!passed) failures++;
}
console.log(`\n${tests.length - failures}/${tests.length} verificações concluídas.`);
if (failures) process.exitCode = 1;
