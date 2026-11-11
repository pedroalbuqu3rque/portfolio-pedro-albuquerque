import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const base = join(dirname(fileURLToPath(import.meta.url)), '..');
const app = readFileSync(join(base, 'src/App.tsx'), 'utf8');
const style = readFileSync(join(base, 'src/styles.css'), 'utf8');
const casePage = readFileSync(join(base, 'src/pages/EduCompPage.tsx'), 'utf8');
const essay = readFileSync(join(base, 'src/pages/FragmentosPage.tsx'), 'utf8');
const galleryPaths = Array.from(app.matchAll(/src: '\/(assets\/galeria\/[^']+\.webp)'/g), match => match[1]);
const checks = [
  ['Colagem original incluída', existsSync(join(base, 'public/assets/hero-collage.png'))],
  ['Landing possui Projetos e Áreas', app.includes('id="projetos"') && app.includes('id="areas"')],
  ['Landing possui Fragmentos e Sobre mim', app.includes('id="fragmentos"') && app.includes('id="sobre"')],
  ['Rota de estudo de caso ativa', app.includes('<EduCompPage onNavigate={navigate}/>')],
  ['Rota do ensaio ativa', app.includes('<FragmentosPage onNavigate={navigate}')],
  ['Galeria editorial com quatro capturas', (casePage.match(/id: '0[1-4]'/g) || []).length === 4],
  ['EduComp possui três fluxos', casePage.includes("kind: 'search'") && casePage.includes("kind: 'detail'") && casePage.includes("kind: 'submit'")],
  ['Fragmentos contém índice com três âncoras', ['aprender', 'tecnologia', 'experimentar'].every(id => essay.includes(`id: '${id}'`))],
  ['Botão para o protótipo do EduComp', casePage.includes('https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/')],
  ['Suporte a movimento reduzido', style.includes('prefers-reduced-motion')],
  ['Carrossel acessível por teclado', app.includes("event.key === 'ArrowRight'")],
  ['Imagem WebP otimizada', existsSync(join(base, 'public/assets/hero-collage.webp'))],
  ['Favicon e imagem social disponiveis', existsSync(join(base, 'public/favicon.svg')) && existsSync(join(base, 'public/assets/og-portfolio.png'))],
  ['Metadados separados por rota', existsSync(join(base, 'site-meta.json')) && existsSync(join(base, 'src/seo.ts'))],
  ['Codigo da secao Areas contempla hover', style.includes('.area-card:hover') && style.includes('.area-card:hover .area-mark')],
  ['Link de salto ao conteudo', app.includes('className="skip-link"')],
  ['Fotografia provisória do ensaio documentada', existsSync(join(base, 'public/assets/README.md'))],
  ['Sobre mim com o texto final', app.includes('Minha trajetória passa pela sala de aula') && app.includes('Sou curioso, atento aos detalhes e gosto de entender como as coisas funcionam')],
  ['Galeria integrada ao Sobre mim com oito fotografias reais', app.includes('className="about-gallery"') && !app.includes('className="gallery-section"') && galleryPaths.length === 8 && galleryPaths.every(path => existsSync(join(base, 'public', path)))],
  ['Trajetoria no Sobre mim, sem secao repetida', app.includes('className="about-trajectory" id="trajetoria"') && !app.includes('className="trajectory" id="trajetoria"') && (app.match(/TIMELINE_POINTS\.map/g) || []).length === 1],
  ['Foto avulsa removida do Sobre mim', !app.includes('about-feature-photo')],
  ['Espacamento da faixa de tecnologias revisado', readFileSync(join(base, 'src/gallery-timeline-polish.css'), 'utf8').includes('.areas { height: 784px; }')],
  ['Timeline sem numeros e galeria sem legendas', !app.includes('className="timeline-point-index"') && !app.includes('{chosen.title}') && !app.includes('{photo.title}')],
  ['Botoes Ver projetos e Curriculo restaurados na abertura', app.includes('hero-projects-button') && app.includes('hero-cv-button')],
  ['Linha do tempo com os 12 registros atualizados', (app.match(/date: "/g) || []).length === 12 && app.includes('Desenvolvimento de Jogo Educacional') && app.includes('Laboratório de Sensoriamento Remoto e Geoprocessamento')],
  ['Galeria sem frase final', !app.includes('memory-gallery-outro')],
  ['Estagio em Geoprocessamento corrigido para jun/2024', app.includes('JUN/2024 · JAN/2024') && !app.includes('JUN/2025 · JAN/2024')],
  ['Secao Areas com fundo branco', style.includes('.areas { height: 715px; background: var(--white); }')],
  ['Tags de Jogos Serios sem largura restrita', !readFileSync(join(base, 'src/gallery-timeline-polish.css'), 'utf8').includes('.area-card:nth-child(5) .area-tags { max-width: 140px; }')],
  ['Galeria 4:3 e cantos arredondados', readFileSync(join(base, 'src/gallery-timeline-polish.css'), 'utf8').includes('aspect-ratio: 4 / 3') && readFileSync(join(base, 'src/gallery-timeline-polish.css'), 'utf8').includes('border-radius: 12px')],
];
let failed = false;
for (const [name, passed] of checks) {
  console.log(`${passed ? 'OK' : 'FALHOU'}: ${name}`);
  if (!passed) failed = true;
}
if (failed) process.exitCode = 1;
