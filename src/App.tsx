import React, { useEffect, useRef, useState } from 'react';
import DeskIllustration from './components/DeskIllustration';
import EduCompPage from './pages/EduCompPage';
import FragmentosPage from './pages/FragmentosPage';
import './internal-pages.css';
import { updatePageMetadata } from './seo';

type PlaceholderKind = 'cv' | 'content' | null;
type IconName = 'linkedin' | 'github' | 'mail' | 'left' | 'right' | 'close';
type AreaType = 'education' | 'qa' | 'ux' | 'development' | 'games';

type Area = { kind: AreaType; title: string; description: string; tags: string[] };
type Reading = { category: string; title: string; description: string; visual: string };

const CONTACT = {
  email: 'p3dro.albuquerque@gmail.com',
  // Conferir estes endereços antes da publicação.
  github: 'https://github.com/pedroalbuqu3rque',
  linkedin: 'https://www.linkedin.com/in/pedroalbuqu3rque',
};

const AREAS: Area[] = [
  {
    kind: 'education', title: 'Ensino de\nComputação',
    description: 'Estudo de metodologias de ensino de Computação, com foco em pensamento computacional e crítico e inteligência artificial.',
    tags: ['METODOLOGIAS DE ENSINO', 'PENSAMENTO COMPUTACIONAL'],
  },
  {
    kind: 'qa', title: 'QA &\nTestes',
    description: 'Planejamento e execução de testes, identificação de falhas e automação para melhorar a qualidade e a confiabilidade do software.',
    tags: ['TESTES', 'AUTOMAÇÃO', 'VALIDAÇÃO'],
  },
  {
    kind: 'ux', title: 'UX/UI e Design\nInstrucional',
    description: 'Pesquisa, prototipação e criação de interfaces e materiais didáticos, considerando usabilidade, acessibilidade e aprendizagem.',
    tags: ['PESQUISA', 'PROTOTIPAÇÃO', 'ACESSIBILIDADE', 'MATERIAL DIDÁTICO'],
  },
  {
    kind: 'development', title: 'Desenvolvimento',
    description: 'Estudos e projetos em desenvolvimento de software, explorando programação, interfaces web e integração de funcionalidades.',
    tags: ['PROGRAMAÇÃO', 'APLICAÇÕES WEB', 'APRENDIZAGEM'],
  },
  {
    kind: 'games', title: 'Jogos\nSérios',
    description: 'Jogos com objetivos educacionais, pensados para estimular a participação, a resolução de problemas e a aprendizagem.',
    tags: ['GAME DESIGN', 'IMERSÃO', 'APRENDIZAGEM'],
  },
];

const READINGS: Reading[] = [
  { category: 'ESTUDO', title: 'Design instrucional\nna prática', description: 'Princípios e escolhas para criar experiências de aprendizagem mais efetivas.', visual: 'design' },
  { category: 'REFLEXÃO', title: 'Jogos, aprendizagem\ne território', description: 'Como jogos podem promover aprendizagens significativas e valorizar contextos locais.', visual: 'games' },
  { category: 'EXPERIMENTO', title: 'Tecnologia, pesquisa\ne experiência', description: 'Aprendizados na interseção entre pesquisa, design e tecnologia digital.', visual: 'research' },
];

type TimelinePoint = { date: string; title: string; detail: string };

// Percurso sem agrupamento por ano: cada marco é um ponto da mesma linha do tempo.
// Periodos e titulos fornecidos pelo autor, do mais recente ao mais antigo.
const TIMELINE_POINTS: TimelinePoint[] = [
  { date: "ATUALMENTE · SET/2026", title: "Projetos em Tecnologia", detail: "Level 5 Jr." },
  { date: "ATUALMENTE · SET/2026", title: "Desenvolvimento de Jogo Educacional", detail: "Universidade Federal de Goiás" },
  { date: "ATUALMENTE · 2026", title: "Licenciatura em Computação", detail: "Claretiano Centro Universitário" },
  { date: "JUL/2026 · FEV/2026", title: "Professor de Inteligência Artificial", detail: "Grupo Salta Educação" },
  { date: "JUL/2026 · JAN/2026", title: "Diagramador", detail: "Grupo Salta Educação" },
  { date: "AGO/2026 · SET/2025", title: "Pesquisa em Jogos Sérios", detail: "Universidade Federal de Goiás" },
  { date: "DEZ/2025 · MAIO/2025", title: "Apoio Pedagógico", detail: "Grupo Salta Educação" },
  { date: "AGO/2025 · SET/2024", title: "Pesquisa em Educação", detail: "Universidade Federal de Goiás" },
  { date: "SET/2025 · MAR/2024", title: "Membro e Diretor", detail: "Gaia Consultoria Ambiental Jr." },
  { date: "JUN/2024 · JAN/2024", title: "Estágio em Geoprocessamento", detail: "Laboratório de Sensoriamento Remoto e Geoprocessamento" },
  { date: "AGO/2024 · MAI/2023", title: "Iniciação à Docência", detail: "Universidade Federal de Goiás" },
  { date: "ATUALMENTE · 2023", title: "Licenciatura em Geografia", detail: "Universidade Federal de Goiás" },
];

// Fotografias autorais fornecidas para o portfólio, na ordem do arquivo recebido.
// As imagens foram padronizadas em 4:3, sem modificar seu conteúdo.
type GalleryPhoto = { src: string; alt: string };
const GALLERY_PHOTOS: GalleryPhoto[] = [
  { src: '/assets/galeria/01-leituras.webp', alt: 'Leitura acadêmica aberta em uma tela, sobre uma mesa.' },
  { src: '/assets/galeria/02-projetos.webp', alt: 'Dois monitores com uma conversa por vídeo e um projeto de interface aberto.' },
  { src: '/assets/galeria/03-anotacoes.webp', alt: 'Leitor digital com texto acadêmico, acompanhado de uma caneta.' },
  { src: '/assets/galeria/04-rotina.webp', alt: 'Notebooks e materiais de estudo sobre mesas em um espaço compartilhado.' },
  { src: '/assets/galeria/05-pesquisa.webp', alt: 'Copo térmico e tela com texto de pesquisa em ambiente de estudo.' },
  { src: '/assets/galeria/06-encontros.webp', alt: 'Crachá de Pedro Albuquerque em um encontro sobre inteligência artificial.' },
  { src: '/assets/galeria/07-experimentos.webp', alt: 'Tela de computador com programação visual em blocos.' },
  { src: '/assets/galeria/08-eventos.webp', alt: 'Crachá de equipe em um evento, em frente à tela de um notebook.' },
];

// A ordem segue a seleção de tecnologias do portfólio.
const TECHNOLOGIES: Array<{ name: string; icon?: string }> = [
  { name: 'Figma', icon: 'figma' },
  { name: 'React', icon: 'react' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Python', icon: 'python' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'Supabase', icon: 'supabase' },
  { name: 'Docker', icon: 'docker' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Jira', icon: 'jira' },
  { name: 'Qase', icon: 'qase' },
  { name: 'Playwright', icon: 'playwright' },
  { name: 'Postman', icon: 'postman' },
  { name: 'Unity', icon: 'unity' },
  { name: 'C#', icon: 'csharp' },
];

const AREA_ARTWORK: Record<AreaType, string> = {
  education: 'ensino-computacao', qa: 'qa-testes', ux: 'design',
  development: 'desenvolvimento', games: 'jogos-serios',
};

function Glyph({ name, size = 23 }: { name: IconName; size?: number }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const };
  if (name === 'mail') return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
  if (name === 'left') return <svg {...props}><path d="m14.5 5.5-6.5 6.5 6.5 6.5"/></svg>;
  if (name === 'right') return <svg {...props}><path d="m9.5 5.5 6.5 6.5-6.5 6.5"/></svg>;
  if (name === 'close') return <svg {...props}><path d="M5 5 19 19M19 5 5 19"/></svg>;
  if (name === 'linkedin') return <svg {...props} fill="currentColor" stroke="none"><path d="M4.8 2.6a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2ZM2.9 8.6h3.8v12.5H2.9V8.6ZM8.9 8.6h3.6v1.7h.1c.5-.9 1.8-2 3.7-2 3.9 0 4.6 2.4 4.6 5.4v7.4h-3.8v-6.6c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5v6.7H8.9V8.6Z"/></svg>;
  return <svg {...props} fill="currentColor" stroke="none"><path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.7-.2.7-.5v-2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8 2.2 3.3 2.6.4-.7.5-1.2.7-1.5-2.5-.3-5.2-1.2-5.2-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3.1 1.2a10.6 10.6 0 0 1 5.6 0c2.1-1.5 3.1-1.2 3.1-1.2.6 1.6.2 2.8.1 3.1.7.8 1.1 1.8 1.1 3 0 4.3-2.7 5.2-5.2 5.5.4.4.7 1.1.7 2.2v3.3c0 .3.2.6.8.5A11.1 11.1 0 0 0 12 .9Z"/></svg>;
}

function AreaMark({ kind }: { kind: AreaType }) {
  return <img className="area-mark" src={`/assets/visuais/areas/${AREA_ARTWORK[kind]}.png`}
    width={256} height={256} alt="" aria-hidden="true" decoding="async" />;
}

function TechnologyIcon({ icon }: { icon?: string }) {
  return <span className="tech-symbol" aria-hidden="true">
    {icon ? <img src={`/assets/visuais/stack/${icon}.png`} width={256} height={256} alt="" decoding="async" /> : null}
  </span>;
}

function ContactArtwork({ kind }: { kind: 'email' | 'github' | 'linkedin' }) {
  return <img className="contact-artwork" src={`/assets/visuais/contato/${kind}.png`}
    alt="" width={256} height={256} decoding="async" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) { return <div className="section-label">{children}</div>; }

function Carousel({ children, className = '', step = 440, label, controlsPosition = 'top' }: {
  children: React.ReactNode;
  className?: string;
  step?: number;
  label: string;
  controlsPosition?: 'top' | 'bottom';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ start: number; left: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [canBack, setCanBack] = useState(false);
  const [canForward, setCanForward] = useState(false);
  const [progress, setProgress] = useState(0);
  const viewportId = React.useId();
  function updateControls() {
    const el = ref.current;
    if (!el) return;
    const maximum = Math.max(0, el.scrollWidth - el.clientWidth);
    setCanBack(el.scrollLeft > 3);
    setCanForward(el.scrollLeft < maximum - 3);
    setProgress(maximum > 0 ? Math.min(100, Math.max(0, el.scrollLeft / maximum * 100)) : 100);
  }
  useEffect(() => {
    updateControls();
    const viewport = ref.current;
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(updateControls);
    if (viewport) observer?.observe(viewport);
    const track = viewport?.firstElementChild;
    if (track) observer?.observe(track);
    window.addEventListener('resize', updateControls);
    return () => { observer?.disconnect(); window.removeEventListener('resize', updateControls); };
  }, []);
  function move(dir: -1 | 1) {
    const el = ref.current;
    if (!el) return;
    const track = el.firstElementChild as HTMLElement | null;
    const positions = track ? Array.from(track.children, child => (child as HTMLElement).offsetLeft - track.offsetLeft) : [];
    const maximum = Math.max(0, el.scrollWidth - el.clientWidth);
    const target = dir === 1
      ? (positions.find(value => value > el.scrollLeft + 6) ?? el.scrollLeft + step)
      : (positions.filter(value => value < el.scrollLeft - 6).pop() ?? el.scrollLeft - step);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: Math.max(0, Math.min(maximum, target)), behavior: reduceMotion ? 'instant' : 'smooth' });
  }
  function keyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
  }
  function pointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    suppressClick.current = false;
    drag.current = { start: event.clientX, left: event.currentTarget.scrollLeft, moved: false };
  }
  function pointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current || event.buttons !== 1) return;
    const shift = event.clientX - drag.current.start;
    if (Math.abs(shift) < 5 && !drag.current.moved) return;
    if (!drag.current.moved) event.currentTarget.setPointerCapture(event.pointerId);
    drag.current.moved = true;
    suppressClick.current = true;
    event.currentTarget.scrollLeft = drag.current.left - shift;
  }
  function pointerEnd() { drag.current = null; }
  function preventAccidentalOpen(event: React.MouseEvent<HTMLDivElement>) {
    if (!suppressClick.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick.current = false;
  }
  const controls = <div className={`carousel-controls carousel-controls-${controlsPosition}`} role="group" aria-label={`Controles: ${label}`}>
    <button type="button" className="carousel-arrow" onClick={() => move(-1)} disabled={!canBack} aria-controls={viewportId} aria-label={`Ver anterior em ${label}`}><Glyph name="left" size={19}/></button>
    <span className="carousel-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></span>
    <button type="button" className="carousel-arrow" onClick={() => move(1)} disabled={!canForward} aria-controls={viewportId} aria-label={`Ver próximo em ${label}`}><Glyph name="right" size={19}/></button>
  </div>;
  return <div className={`carousel ${className}`}>
    <div id={viewportId} className="carousel-viewport" role="region" aria-roledescription="carrossel" aria-label={label} tabIndex={0} ref={ref} onScroll={updateControls} onKeyDown={keyDown} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={pointerEnd} onClickCapture={preventAccidentalOpen} onDragStart={event => event.preventDefault()}>
      <div className="carousel-track">{children}</div>
    </div>
    {controls}
  </div>;
}

function GalleryItem({ photo, index, onExpand }: { photo: GalleryPhoto; index: number; onExpand: () => void }) {
  return <figure className="memory-item">
    <button type="button" className="memory-photo" onClick={onExpand}
      aria-label={`Ampliar fotografia ${index + 1} de ${GALLERY_PHOTOS.length}`}>
      <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" width={1080} height={810}/>
    </button>
  </figure>;
}

function PhotoGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const chosen = selected === null ? null : GALLERY_PHOTOS[selected];
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (chosen && !dialog.open) dialog.showModal();
    if (!chosen && dialog.open) dialog.close();
  }, [chosen]);
  useEffect(() => {
    if (selected === null) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') setSelected(value => value === null ? null : (value - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
      if (event.key === 'ArrowRight') setSelected(value => value === null ? null : (value + 1) % GALLERY_PHOTOS.length);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selected]);
  return <div className="memory-gallery" aria-labelledby="memory-gallery-title">
    <div className="memory-gallery-intro"><h3 id="memory-gallery-title">Fora da tela, também tem história<span className="blue-text">.</span></h3></div>
    <Carousel className="memory-carousel" label="Galeria de fotografias de estudos e projetos" step={350} controlsPosition="bottom">
      {GALLERY_PHOTOS.map((photo, index) => <GalleryItem key={photo.src} photo={photo} index={index} onExpand={() => setSelected(index)}/>)}
    </Carousel>
    <dialog ref={dialogRef} className="memory-lightbox" aria-label={chosen ? `Fotografia ${selected! + 1} ampliada` : 'Fotografia ampliada'}
      onCancel={event => { event.preventDefault(); setSelected(null); }} onClose={() => setSelected(null)}
      onClick={event => { if (event.target === dialogRef.current) setSelected(null); }}>
      {chosen && <div className="memory-lightbox-inner">
        <div className="memory-lightbox-bar"><span>PA. / GALERIA</span><button type="button" onClick={() => setSelected(null)} aria-label="Fechar fotografia"><Glyph name="close" size={22}/></button></div>
        <img src={chosen.src} alt={chosen.alt} width={1080} height={810}/>
        <div className="memory-lightbox-bottom"><button type="button" aria-label="Fotografia anterior" onClick={() => setSelected(value => value === null ? null : (value - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length)}><Glyph name="left" size={24}/></button><button type="button" aria-label="Próxima fotografia" onClick={() => setSelected(value => value === null ? null : (value + 1) % GALLERY_PHOTOS.length)}><Glyph name="right" size={24}/></button></div>
      </div>}
    </dialog>
  </div>;
}

// Prévia estilizada da biblioteca: um elemento de composição, não uma captura do sistema.
function EduCompPreview() {
  return <div className="edu-preview" role="img" aria-label="Ilustração da biblioteca EduComp com busca, filtros e materiais de Computação">
    <span className="edu-preview-index" aria-hidden="true">01 / ESTUDO DE CASO</span>
    <span className="edu-preview-shape" aria-hidden="true" />
    <div className="edu-preview-window" aria-hidden="true">
      <div className="edu-preview-browser"><span className="edu-preview-browser-dots"><i/><i/><i/></span><span>educomp / biblioteca</span></div>
      <div className="edu-preview-navbar">
        <span className="edu-preview-identity"><i/>EduComp</span>
        <span className="edu-preview-menu"><b>Biblioteca</b><span>Salvos</span><span>Enviar material</span></span>
        <span className="edu-preview-account">Entrar</span>
      </div>
      <div className="edu-preview-page">
        <span className="edu-preview-eyebrow">MATERIAIS PARA ENSINAR COMPUTAÇÃO</span>
        <strong className="edu-preview-heading">Biblioteca</strong>
        <div className="edu-preview-search"><span>Buscar por título, tema ou palavra-chave</span><b>Buscar</b></div>
        <div className="edu-preview-filters"><span>Todos os materiais</span><span>Etapa de ensino</span><span>Tipo de atividade</span></div>
        <div className="edu-preview-cards">
          <div className="edu-preview-resource"><span className="edu-preview-resource-art art-one"><i/><i/><i/></span><span className="edu-preview-resource-copy"><small>ATIVIDADE · DESPLUGADA</small><b>Desafio dos algoritmos</b><em>Ensino Fundamental</em></span></div>
          <div className="edu-preview-resource"><span className="edu-preview-resource-art art-two"><i/><i/><i/></span><span className="edu-preview-resource-copy"><small>MATERIAL DE APOIO</small><b>Lógica e Computação</b><em>Ensino Médio</em></span></div>
          <div className="edu-preview-resource"><span className="edu-preview-resource-art art-three"><i/><i/><i/></span><span className="edu-preview-resource-copy"><small>JOGO · PLUGADA</small><b>Aprender jogando</b><em>Ensino Fundamental</em></span></div>
        </div>
      </div>
    </div>
    <span className="edu-preview-caption" aria-hidden="true">BIBLIOTECA COLABORATIVA / 2026</span>
  </div>;
}

function ProjectPlaceholder({ title, onOpen }: { title: string; onOpen: () => void }) {
  return <button className="project-small" type="button" onClick={onOpen}>
    <span className="project-small-art" aria-hidden="true"/>
    <span className="project-small-copy"><span className="tag-blue">TAG DE CONTEÚDO</span><strong>{title}</strong><span className="small-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</span><span className="text-link">Ver detalhes <span aria-hidden="true">→</span></span></span>
  </button>;
}

function ProjectFuture() {
  return <div className="project-slide project-future" aria-label="Espaços para projetos futuros">
    <div className="future-main"><div className="future-art"/><span className="eyebrow blue-text">PRÓXIMOS TRABALHOS</span><strong>Novos projetos<br/>em preparação.</strong></div>
    <div className="future-side"><div className="future-row"><div className="future-thumb"/><div><strong>Espaço reservado<br/>para um novo projeto.</strong><small>EM PREPARAÇÃO</small></div></div><div className="future-row"><div className="future-thumb"/><div><strong>Espaço reservado<br/>para um novo projeto.</strong><small>EM PREPARAÇÃO</small></div></div></div>
  </div>;
}

function ArticleArtwork({ visual }: { visual: string }) {
  if (visual === 'design') return <div className="article-art art-design" aria-hidden="true"><span className="art-top"/><span className="art-row"/><span className="art-row"/><span className="art-row"/><span className="art-check"/></div>;
  if (visual === 'games') return <div className="article-art art-games" aria-hidden="true"><span className="art-grid"/><span className="art-dots">•••</span><span className="art-connector"/></div>;
  return <div className="article-art art-research" aria-hidden="true"><span className="art-browser"/><span className="art-highlight"/><span className="art-check">✓</span></div>;
}


function SiteHeader({ onNavigate, currentPath }: { onNavigate: (path: string, anchor?: string) => void; currentPath: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 12);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [activeSection, setActiveSection] = useState('inicio');
  const NAV = [{ id: 'inicio', label: 'Início' }, { id: 'projetos', label: 'Projetos' }, { id: 'areas', label: 'Áreas' }, { id: 'fragmentos', label: 'Fragmentos' }, { id: 'sobre', label: 'Sobre mim' }];
  useEffect(() => {
    if (currentPath !== '/' || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach(entry => setActiveSection(entry.target.id));
    }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });
    NAV.forEach(item => { const element = document.getElementById(item.id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, [currentPath]);
  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButtonRef.current?.focus(); }
    };
    const onResize = () => { if (window.innerWidth > 700) setMenuOpen(false); };
    window.addEventListener('keydown', onEscape);
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('keydown', onEscape); window.removeEventListener('resize', onResize); };
  }, [menuOpen]);
  useEffect(() => setMenuOpen(false), [currentPath]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
    <div className="header-inner">
      <a href="/#inicio" className="monogram" onClick={(event) => { event.preventDefault(); setMenuOpen(false); onNavigate('/', 'inicio'); }} aria-label="Pedro Albuquerque — ir para início">PA<span>.</span></a>
      <button type="button" className={`mobile-toggle${menuOpen ? ' is-open' : ''}`} ref={menuButtonRef} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}><span className="menu-lines" aria-hidden="true"><span/><span/></span></button>
      <nav id="primary-navigation" className={menuOpen ? 'nav-menu is-open' : 'nav-menu'} aria-label="Navegação principal">
        {NAV.map(item => <a key={item.id} className={(currentPath === '/' ? activeSection : currentPath.startsWith('/projetos/') ? 'projetos' : currentPath.startsWith('/fragmentos/') ? 'fragmentos' : '') === item.id ? 'nav-active' : ''} aria-current={(currentPath === '/' ? activeSection : currentPath.startsWith('/projetos/') ? 'projetos' : currentPath.startsWith('/fragmentos/') ? 'fragmentos' : '') === item.id ? 'location' : undefined} href={`/#${item.id}`} onClick={(event) => { event.preventDefault(); setMenuOpen(false); setActiveSection(item.id); onNavigate('/', item.id); }}>{item.label}</a>)}
      </nav>
    </div>
  </header>;
}

const CV_FILE = '/curriculo-pedro-albuquerque.pdf';

async function downloadCurriculum(onUnavailable: () => void) {
  // On Vite, a missing public file may fall back to index.html with HTTP 200.
  // Checking the MIME type avoids a broken PDF download in that situation.
  try {
    const response = await fetch(CV_FILE, { method: 'HEAD', cache: 'no-store' });
    if (response.ok && response.headers.get('content-type')?.toLowerCase().includes('application/pdf')) {
      const anchor = document.createElement('a');
      anchor.href = CV_FILE;
      anchor.download = 'Pedro-Albuquerque-Curriculo.pdf';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      return;
    }
  } catch { /* CV ainda não disponível */ }
  onUnavailable();
}

function HomePage({ onNavigate, openPlaceholder, openContact }: { onNavigate: (path: string, anchor?: string) => void; openPlaceholder: (kind: Exclude<PlaceholderKind, null>) => void; openContact: () => void }) {
  const onDownloadCV = () => void downloadCurriculum(() => openPlaceholder('cv'));
  return <>
    <section className="hero" id="inicio" aria-labelledby="hero-title"><div className="hero-body content-width">
      <div className="hero-copy"><p className="hero-overline"><span className="blue-square"/>OLÁ, EU SOU<br/><strong>PEDRO ALBUQUERQUE _</strong></p><h1 id="hero-title">PENSAR,<br/>CRIAR,<br/>EXPERIMENTAR<span className="blue-text">.</span></h1>
        <p className="hero-description">Um espaço para reunir o que venho criando e estudando em educação, desenvolvimento, testes, design e jogos sérios.</p>
        <div className="hero-actions"><button className="button button-primary hero-projects-button" type="button" onClick={() => onNavigate('/', 'projetos')}>Ver projetos</button><button className="button button-outline hero-cv-button" type="button" onClick={onDownloadCV}>Currículo</button></div>
      </div>
      <picture><source srcSet="/assets/hero-collage.webp" type="image/webp"/><img className="hero-collage" src="/assets/hero-collage.png" width={1374} height={1145} fetchPriority="high" loading="eager" decoding="async" alt="Colagem editorial em preto, branco e azul com retrato de Pedro Albuquerque e referências a educação, testes, desenvolvimento, design e jogos sérios."/></picture>
      <div className="social-links" aria-label="Redes e contato"><a href={CONTACT.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><ContactArtwork kind="linkedin"/></a><a href={CONTACT.github} target="_blank" rel="noreferrer" aria-label="GitHub"><ContactArtwork kind="github"/></a><a href={`mailto:${CONTACT.email}`} aria-label="E-mail"><ContactArtwork kind="email"/></a></div>
    </div></section>
    <section className="projects" id="projetos" aria-labelledby="projects-title"><div className="content-width section-content">
      <SectionLabel>TRABALHOS EM DESTAQUE</SectionLabel><h2 id="projects-title" className="section-title">Projetos</h2>
      <Carousel className="projects-carousel" step={1336} label="Projetos em destaque">
        <div className="project-slide featured-projects">
          <a className="project-featured" href="/projetos/educomp" onClick={(event) => { event.preventDefault(); onNavigate('/projetos/educomp'); }} aria-label="Conhecer o projeto EduComp">
            <div className="featured-visual"><EduCompPreview/></div>
            <div className="featured-detail">
              <span className="featured-category">PLATAFORMA WEB · EDUCAÇÃO</span>
              <strong>EduComp</strong>
              <p>Uma biblioteca colaborativa para encontrar e compartilhar materiais didáticos de Computação.</p>
              <span className="featured-bottom"><small>UX/UI · DESIGN INSTRUCIONAL · 2026</small><span className="text-link">Conhecer o projeto <span aria-hidden="true">↗</span></span></span>
            </div>
          </a>
          <div className="secondary-projects"><ProjectPlaceholder title="Teste de Teste Apenas um Testchi" onOpen={() => openPlaceholder('content')}/><ProjectPlaceholder title="Olha o Textinho" onOpen={() => openPlaceholder('content')}/></div>
        </div><ProjectFuture/>
      </Carousel>
    </div></section>
    <section className="areas" id="areas" aria-labelledby="areas-title"><div className="content-width section-content">
      <SectionLabel>ÁREAS DE ATUAÇÃO</SectionLabel><h2 id="areas-title" className="section-title">Pontos de <span className="blue-text">encontro.</span></h2><p className="areas-lead">Entre aulas, testes, interfaces e jogos, estas são as áreas em que tenho trabalhado.</p>
      <div className="areas-grid">{AREAS.map(area => <article className="area-card" key={area.kind}><AreaMark kind={area.kind}/><h3>{area.title.split('\n').map((line, i) => <React.Fragment key={i}>{i > 0 && <br/>}{line}</React.Fragment>)}</h3><p>{area.description}</p><div className="area-tags">{area.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="area-accent" aria-hidden="true"/></article>)}</div>
    </div></section>
    <section className="stack-section" aria-label="Tecnologias e ferramentas"><div className="stack-marquee"><div className="stack-track">{[0, 1].map(group => <div className="stack-group" key={group} aria-hidden={group === 1 ? true : undefined}>{TECHNOLOGIES.map(tech => <div className="tech-item" key={tech.name}><TechnologyIcon icon={tech.icon}/><span>{tech.name}</span></div>)}</div>)}</div></div></section>
    <div className="section-spacer spacer-large" aria-hidden="true"/>
    <section className="fragments" id="fragmentos" aria-labelledby="fragments-title"><div className="content-width section-content">
      <div className="fragment-intro"><div className="fragment-copy"><SectionLabel>FRAGMENTOS</SectionLabel><h2 id="fragments-title" className="section-title">Notas,<br/>ensaios e<br/><span className="blue-text">ideias.</span></h2><p>Ideias e anotações que surgem entre projetos, leituras e experiências.</p></div>
        <a className="fragment-featured" href="/fragmentos/a-potencia-do-fazer-digital-na-educacao" onClick={(event) => { event.preventDefault(); onNavigate('/fragmentos/a-potencia-do-fazer-digital-na-educacao'); }}><div className="fragment-featured-image"><DeskIllustration/></div><div className="fragment-featured-text"><span className="tag-solid">ENSAIO</span><h3>A potência do fazer<br/>digital na educação</h3><p>Como a cultura do fazer, os projetos e as tecnologias digitais podem ampliar a autonomia, a criatividade e o engajamento na aprendizagem.</p><span className="fragment-read">Ler artigo <span aria-hidden="true">→</span></span></div></a>
      </div>
      <Carousel className="reading-carousel" label="Notas, ensaios e ideias" step={445} controlsPosition="bottom">
        {READINGS.map(reading => <button className="reading-card" type="button" key={reading.title} onClick={() => openPlaceholder('content')}><ArticleArtwork visual={reading.visual}/><span className="reading-info"><span className="tag-solid">{reading.category}</span><strong>{reading.title.split('\n').map((l, i) => <React.Fragment key={i}>{i > 0 && <br/>}{l}</React.Fragment>)}</strong><span className="reading-desc">{reading.description}</span><span className="text-link">Ler artigo <span aria-hidden="true">→</span></span></span></button>)}
        <article className="reading-card upcoming-reading"><span className="new-article-plus">+</span><span className="reading-info"><span className="eyebrow blue-text">EM PREPARAÇÃO</span><strong>Novas leituras<br/>em breve.</strong><span className="reading-desc">Espaço reservado para mais notas e ensaios.</span></span></article>
      </Carousel>
    </div></section>
    <section className="about about-editorial" id="sobre" aria-labelledby="about-title">
      <div className="content-width">
        <div className="about-inner">
          <div className="about-left">
            <div className="about-heading">
              <SectionLabel>SOBRE MIM</SectionLabel>
              <h2 id="about-title" className="section-title">Olá! Eu sou o<br/><span className="blue-text">Pedro Albuquerque.</span></h2>
              <span className="about-underline" aria-hidden="true"/>
            </div>
            <div className="about-trajectory" id="trajetoria" role="group" aria-label="Trajetória profissional e acadêmica">
              <Carousel className="timeline-carousel timeline-points about-timeline" label="Trajetória profissional e acadêmica" step={295} controlsPosition="bottom">
                {TIMELINE_POINTS.map(point => <article className="timeline-point" key={`${point.date}-${point.title}`}>
                  <time className="timeline-point-date">{point.date}</time>
                  <span className="timeline-point-dot" aria-hidden="true"/>
                  <div className="timeline-point-body"><h3>{point.title}</h3><p>{point.detail}</p></div>
                </article>)}
              </Carousel>
            </div>
            <div className="about-text">
              <p>Minha trajetória passa pela sala de aula, pela pesquisa e por projetos que vão de materiais didáticos e jogos educacionais a interfaces e testes de software. Já trabalhei com <strong>educação inclusiva</strong>, <strong>ensino de inteligência artificial</strong> e <strong>pesquisa em jogos digitais</strong>. Hoje, também exploro UX/UI, qualidade de software e desenvolvimento.</p>
              <p>Sou curioso, atento aos detalhes e gosto de entender como as coisas funcionam e podem ser melhores para quem as usa. Acredito que boa parte do aprendizado acontece quando a gente coloca a mão na massa. Por aqui, compartilho um pouco do que faço, estudo e invento pelo caminho.</p>
            </div>
          </div>
          <div className="about-gallery"><PhotoGallery/></div>
        </div>
      </div>
    </section>
    <section className="contact-section" id="contato" aria-labelledby="contact-title">
      <div className="content-width contact-inner">
        <div className="contact-copy">
          <SectionLabel><span className="blue-square"/>NOVAS CONEXÕES / CONTATO</SectionLabel>
          <h2 id="contact-title">O próximo encontro<br/>começa <span className="contact-highlight">aqui.</span></h2>
          <p className="contact-description">Projetos, ideias ou uma conversa sobre educação, design e tecnologia.</p>
        </div>
        <div className="contact-actions">
          <button className="button button-primary contact-button" type="button" onClick={openContact} aria-haspopup="dialog" aria-controls="contact-dialog">Entrar em contato <span className="contact-cta-arrow" aria-hidden="true">↗</span></button>
          <button className="button contact-cv" type="button" onClick={onDownloadCV}>Baixar currículo <span className="contact-cv-arrow" aria-hidden="true">↓</span></button>
        </div>
      </div>
    </section>
    <Footer/>
  </>;
}

function Footer() { return <footer className="site-footer"><div className="content-width footer-inner"><strong>PEDRO ALBUQUERQUE</strong><span>Feito aqui. Por mim</span></div></footer>; }


function ContactModal({ open, close }: { open: boolean; close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (open && element && !element.open) element.showModal();
    if (!open && element?.open) element.close();
  }, [open]);
  return <dialog id="contact-dialog" ref={ref} className="contact-dialog" aria-labelledby="contact-dialog-title" aria-describedby="contact-dialog-description" onCancel={event => { event.preventDefault(); close(); }} onClose={close} onClick={event => { if (event.target === ref.current) close(); }}>
    <div className="modal-header contact-dialog-header"><span>PA. / CONTATO</span><button type="button" onClick={close} aria-label="Fechar opções de contato"><Glyph name="close" size={21}/></button></div>
    <div className="contact-dialog-body">
      <SectionLabel>VAMOS CONVERSAR</SectionLabel>
      <h2 id="contact-dialog-title">Por onde começamos<span className="blue-text">?</span></h2>
      <p id="contact-dialog-description">Escolha o canal que preferir.</p>
      <div className="contact-channel-list">
        <a className="contact-channel" href={`mailto:${CONTACT.email}`} onClick={close}><span className="contact-channel-icon"><ContactArtwork kind="email"/></span><span className="contact-channel-copy"><strong>E-mail</strong><small>{CONTACT.email}</small></span><span className="contact-channel-arrow" aria-hidden="true">↗</span></a>
        <a className="contact-channel" href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" onClick={close}><span className="contact-channel-icon"><ContactArtwork kind="linkedin"/></span><span className="contact-channel-copy"><strong>LinkedIn</strong><small>Perfil profissional</small></span><span className="contact-channel-arrow" aria-hidden="true">↗</span></a>
        <a className="contact-channel" href={CONTACT.github} target="_blank" rel="noopener noreferrer" onClick={close}><span className="contact-channel-icon"><ContactArtwork kind="github"/></span><span className="contact-channel-copy"><strong>GitHub</strong><small>Projetos e código</small></span><span className="contact-channel-arrow" aria-hidden="true">↗</span></a>
      </div>
    </div>
  </dialog>;
}

function PlaceholderModal({ kind, close }: { kind: PlaceholderKind; close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (kind && element && !element.open) element.showModal();
    if (!kind && element?.open) element.close();
  }, [kind]);
  return <dialog ref={ref} className="placeholder-dialog" onClose={close} onCancel={close} onClick={event => { if (event.target === ref.current) close(); }} aria-labelledby="modal-title"><div className="modal-header"><span>PA. / PORTFÓLIO</span><button type="button" onClick={close} aria-label="Fechar aviso"><Glyph name="close" size={20}/></button></div><div className="modal-inner"><SectionLabel>EM PREPARAÇÃO</SectionLabel><h2 id="modal-title">{kind === 'cv' ? 'Currículo ainda não anexado.' : 'Conteúdo ainda não publicado.'}</h2><p>{kind === 'cv' ? 'O download estará disponível quando o currículo em PDF for adicionado ao portfólio.' : 'Este card é demonstrativo. A página completa será adicionada quando o material estiver pronto.'}</p><button type="button" className="button button-dark" onClick={close}>Voltar <span aria-hidden="true">→</span></button></div></dialog>;
}

function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, '') || '/';
}

export default function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const [placeholder, setPlaceholder] = useState<PlaceholderKind>(null);
  const [contactOpen, setContactOpen] = useState(false);
  useEffect(() => { const handle = () => setPath(normalizePath(window.location.pathname)); window.addEventListener('popstate', handle); return () => window.removeEventListener('popstate', handle); }, []);
  useEffect(() => {
    updatePageMetadata(path);
    if (path === '/' && window.location.hash) {
      const anchor = window.location.hash.slice(1);
      requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView());
    }
  }, [path]);
  function navigate(to: string, anchor?: string) {
    if (normalizePath(window.location.pathname) !== to) { window.history.pushState({}, '', to + (anchor ? `#${anchor}` : '')); setPath(to); }
    else if (anchor) window.history.replaceState({}, '', `/#${anchor}`);
    if (anchor) requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })));
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }
  return <><a href="#conteudo" className="skip-link">Pular para o conteúdo</a><SiteHeader onNavigate={navigate} currentPath={path}/><main id="conteudo" tabIndex={-1}>{path === '/projetos/educomp' ? <EduCompPage onNavigate={navigate}/> : path.startsWith('/fragmentos/') ? <FragmentosPage onNavigate={navigate} openPlaceholder={() => setPlaceholder('content')}/> : <HomePage onNavigate={navigate} openPlaceholder={setPlaceholder} openContact={() => setContactOpen(true)}/>}</main><PlaceholderModal kind={placeholder} close={() => setPlaceholder(null)}/><ContactModal open={contactOpen} close={() => setContactOpen(false)}/></>;
}
