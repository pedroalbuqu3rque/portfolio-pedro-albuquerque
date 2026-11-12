import React, { useEffect, useRef, useState } from 'react';
import EduCompPage from './pages/EduCompPage';
import FragmentosPage from './pages/FragmentosPage';
import ProjectsSection from './components/ProjectsSection';
import ArrowIcon from './components/ArrowIcon';
import './internal-pages.css';
import { updatePageMetadata } from './seo';
import { shouldNavigateInApp } from './navigation';
import { ESSAY_TITLE, ESSAY_SUBTITLE, ESSAY_PUBLISHED, ESSAY_PUBLISHED_LABEL } from './content/ensaio-fazer-digital';

type PlaceholderKind = 'cv' | null;
type IconName = 'left' | 'right' | 'close';
type AreaType = 'education' | 'qa' | 'ux' | 'development' | 'games';

type Area = { kind: AreaType; title: string; description: string; tags: string[] };
type Reading = { category: string; title: string; description: string };

const CONTACT = {
  email: 'p3dro.albuquerque@gmail.com',
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
  { category: 'EM PREPARAÇÃO', title: 'Novo ensaio', description: 'Espaço reservado para uma futura publicação.' },
  { category: 'EM PREPARAÇÃO', title: 'Novas notas', description: 'Espaço reservado para uma futura publicação.' },
  { category: 'EM PREPARAÇÃO', title: 'Próxima reflexão', description: 'Espaço reservado para uma futura publicação.' },
];

type TimelinePoint = { date: string; title: string; detail: string };

// Percurso sem agrupamento por ano: cada marco é um ponto da mesma linha do tempo.
// Periodos e titulos fornecidos pelo autor, do mais recente ao mais antigo.
const TIMELINE_POINTS: TimelinePoint[] = [
  { date: "SET/2026 — ATUALMENTE", title: "Projetos em Tecnologia", detail: "Level 5 Jr." },
  { date: "SET/2026 — ATUALMENTE", title: "Desenvolvimento de Jogo Educacional", detail: "Universidade Federal de Goiás" },
  { date: "2026 — ATUALMENTE", title: "Licenciatura em Computação", detail: "Claretiano Centro Universitário" },
  { date: "FEV/2026 — JUL/2026", title: "Professor de Inteligência Artificial", detail: "Grupo Salta Educação" },
  { date: "JAN/2026 — JUL/2026", title: "Diagramador", detail: "Grupo Salta Educação" },
  { date: "SET/2025 — AGO/2026", title: "Pesquisa em Jogos Sérios", detail: "Universidade Federal de Goiás" },
  { date: "MAIO/2025 — DEZ/2025", title: "Apoio Pedagógico", detail: "Grupo Salta Educação" },
  { date: "SET/2024 — AGO/2025", title: "Pesquisa em Educação", detail: "Universidade Federal de Goiás" },
  { date: "MAR/2024 — SET/2025", title: "Membro e Diretor", detail: "Gaia Consultoria Ambiental Jr." },
  { date: "JAN/2024 — JUN/2024", title: "Estágio em Geoprocessamento", detail: "Laboratório de Sensoriamento Remoto e Geoprocessamento" },
  { date: "MAI/2023 — AGO/2024", title: "Iniciação à Docência", detail: "Universidade Federal de Goiás" },
  { date: "2023 — ATUALMENTE", title: "Licenciatura em Geografia", detail: "Universidade Federal de Goiás" },
];

// Fotografias autorais fornecidas para o portfólio, na ordem do arquivo recebido.
// As imagens foram padronizadas em 4:3, sem modificar seu conteúdo.
type GalleryPhoto = { src: string; alt: string };
const GALLERY_PHOTOS: GalleryPhoto[] = [
  { src: '/assets/galeria/03-anotacoes.webp', alt: 'Leitor digital com texto acadêmico, acompanhado de uma caneta.' },
  { src: '/assets/galeria/01-leituras.webp', alt: 'Leitura acadêmica aberta em uma tela, sobre uma mesa.' },
  { src: '/assets/galeria/02-projetos.webp', alt: 'Dois monitores com uma conversa por vídeo e um projeto de interface aberto.' },
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
  if (name === 'left') return <svg {...props}><path d="m14.5 5.5-6.5 6.5 6.5 6.5"/></svg>;
  if (name === 'right') return <svg {...props}><path d="m9.5 5.5 6.5 6.5-6.5 6.5"/></svg>;
  return <svg {...props}><path d="M5 5 19 19M19 5 5 19"/></svg>;
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

function ArticleArtwork() {
  return <div className="article-art art-placeholder" aria-hidden="true"><span>+</span></div>;
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
      <a href="/#inicio" className="monogram" onClick={(event) => { if (!shouldNavigateInApp(event)) return; event.preventDefault(); setMenuOpen(false); onNavigate('/', 'inicio'); }} aria-label="Pedro Albuquerque — ir para início">PA<span>.</span></a>
      <button type="button" className={`mobile-toggle${menuOpen ? ' is-open' : ''}`} ref={menuButtonRef} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}><span className="menu-lines" aria-hidden="true"><span/><span/></span></button>
      <nav id="primary-navigation" className={menuOpen ? 'nav-menu is-open' : 'nav-menu'} aria-label="Navegação principal">
        {NAV.map(item => <a key={item.id} className={(currentPath === '/' ? activeSection : currentPath.startsWith('/projetos/') ? 'projetos' : currentPath.startsWith('/fragmentos/') ? 'fragmentos' : '') === item.id ? 'nav-active' : ''} aria-current={(currentPath === '/' ? activeSection : currentPath.startsWith('/projetos/') ? 'projetos' : currentPath.startsWith('/fragmentos/') ? 'fragmentos' : '') === item.id ? 'location' : undefined} href={`/#${item.id}`} onClick={(event) => { if (!shouldNavigateInApp(event)) return; event.preventDefault(); setMenuOpen(false); setActiveSection(item.id); onNavigate('/', item.id); }}>{item.label}</a>)}
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
      <div className="hero-visual"><img className="hero-collage" src="/assets/hero-collage.webp" width={1374} height={1145} fetchPriority="high" loading="eager" decoding="async" alt="Colagem editorial em preto, branco e azul com retrato de Pedro Albuquerque e referências a educação, testes, desenvolvimento, design e jogos sérios."/></div>
      <div className="social-links" aria-label="Redes e contato"><a href={CONTACT.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><ContactArtwork kind="linkedin"/></a><a href={CONTACT.github} target="_blank" rel="noreferrer" aria-label="GitHub"><ContactArtwork kind="github"/></a><a href={`mailto:${CONTACT.email}`} aria-label="E-mail"><ContactArtwork kind="email"/></a></div>
    </div></section>
    <ProjectsSection onNavigate={onNavigate}/>
    <section className="areas" id="areas" aria-labelledby="areas-title"><div className="content-width section-content">
      <SectionLabel>ÁREAS DE ATUAÇÃO</SectionLabel><h2 id="areas-title" className="section-title">Pontos de <span className="blue-text">encontro.</span></h2><p className="areas-lead">Entre aulas, testes, interfaces e jogos, estas são as áreas em que tenho trabalhado.</p>
      <div className="areas-grid">{AREAS.map(area => <article className="area-card" key={area.kind}><AreaMark kind={area.kind}/><h3>{area.title.split('\n').map((line, i) => <React.Fragment key={i}>{i > 0 && <br/>}{line}</React.Fragment>)}</h3><p>{area.description}</p><div className="area-tags">{area.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="area-accent" aria-hidden="true"/></article>)}</div>
    </div></section>
    <section className="stack-section" aria-label="Tecnologias e ferramentas"><div className="stack-marquee"><div className="stack-track">{[0, 1].map(group => <div className="stack-group" key={group} aria-hidden={group === 1 ? true : undefined}>{TECHNOLOGIES.map(tech => <div className="tech-item" key={tech.name}><TechnologyIcon icon={tech.icon}/><span>{tech.name}</span></div>)}</div>)}</div></div></section>
    <div className="section-spacer spacer-large" aria-hidden="true"/>
    <section className="fragments" id="fragmentos" aria-labelledby="fragments-title"><div className="content-width section-content">
      <div className="fragment-intro"><div className="fragment-copy"><SectionLabel>FRAGMENTOS</SectionLabel><h2 id="fragments-title" className="section-title">Notas,<br/>ensaios e<br/><span className="blue-text">ideias.</span></h2><p>Ideias e anotações que surgem entre projetos, leituras e experiências.</p></div>
        <a className="fragment-featured" href="/fragmentos/a-potencia-do-fazer-digital-na-educacao" onClick={(event) => { if (!shouldNavigateInApp(event)) return; event.preventDefault(); onNavigate('/fragmentos/a-potencia-do-fazer-digital-na-educacao'); }} aria-label="Ler ensaio A potência do fazer digital na educação"><div className="fragment-featured-image"><img className="fragment-featured-photo" src="/assets/fragmentos/fazer-digital.webp" width={1080} height={810} loading="lazy" decoding="async" alt="Leitor digital com texto, caneta e fones de ouvido sobre uma mesa."/><span className="fragment-image-label">01 / FRAGMENTOS</span></div><div className="fragment-featured-text"><div className="fragment-featured-top"><span className="fragment-featured-type"><i aria-hidden="true"/>ENSAIO</span><time dateTime={ESSAY_PUBLISHED} title="Data de publicação">{ESSAY_PUBLISHED_LABEL}</time></div><h3>{ESSAY_TITLE}</h3><p>{ESSAY_SUBTITLE}</p><span className="fragment-read"><span>Ler ensaio</span><span className="fragment-read-arrow" aria-hidden="true"><ArrowIcon direction="right" size={26}/></span></span></div></a>
      </div>
      <Carousel className="reading-carousel" label="Notas, ensaios e ideias" step={445} controlsPosition="bottom">
        {READINGS.map(reading => <article className="reading-card reading-card-placeholder" key={reading.title} aria-label={`${reading.title} - em preparação`}><ArticleArtwork/><span className="reading-info"><span className="tag-blue">{reading.category}</span><strong>{reading.title}</strong><span className="reading-desc">{reading.description}</span></span></article>)}

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
                  <span className="timeline-point-date">{point.date}</span>
                  <span className="timeline-point-dot" aria-hidden="true"/>
                  <div className="timeline-point-body"><h3>{point.title}</h3><p>{point.detail}</p></div>
                </article>)}
              </Carousel>
            </div>
            <div className="about-text"><p>Minha trajetória passa pela sala de aula, pela pesquisa e por projetos que vão de materiais didáticos e jogos educacionais a interfaces e testes de software. Já trabalhei com educação inclusiva, ensino de inteligência artificial e pesquisa em jogos digitais. Hoje, também exploro UX/UI, qualidade de software e desenvolvimento. Acredito que boa parte do aprendizado acontece quando a gente coloca a mão na massa. Por aqui, compartilho um pouco do que faço, estudo e invento pelo caminho.</p></div>
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
          <button className="button button-primary contact-button" type="button" onClick={openContact} aria-haspopup="dialog" aria-controls="contact-dialog">Entrar em contato <span className="contact-cta-arrow" aria-hidden="true"><ArrowIcon direction="right" size={22}/></span></button>
          <button className="button contact-cv" type="button" onClick={onDownloadCV}>Baixar currículo <span className="contact-cv-arrow" aria-hidden="true"><ArrowIcon direction="down" size={22}/></span></button>
        </div>
      </div>
    </section>
    <Footer/>
  </>;
}

function Footer() { return <footer className="site-footer"><div className="content-width footer-inner"><strong>PEDRO ALBUQUERQUE</strong><span>Feito aqui. Por mim.</span></div></footer>; }


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
        <a className="contact-channel" href={`mailto:${CONTACT.email}`} onClick={close}><span className="contact-channel-icon"><ContactArtwork kind="email"/></span><span className="contact-channel-copy"><strong>E-mail</strong><small>{CONTACT.email}</small></span><span className="contact-channel-arrow" aria-hidden="true"><ArrowIcon direction="up-right" size={19}/></span></a>
        <a className="contact-channel" href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" onClick={close}><span className="contact-channel-icon"><ContactArtwork kind="linkedin"/></span><span className="contact-channel-copy"><strong>LinkedIn</strong><small>Perfil profissional</small></span><span className="contact-channel-arrow" aria-hidden="true"><ArrowIcon direction="up-right" size={19}/></span></a>
        <a className="contact-channel" href={CONTACT.github} target="_blank" rel="noopener noreferrer" onClick={close}><span className="contact-channel-icon"><ContactArtwork kind="github"/></span><span className="contact-channel-copy"><strong>GitHub</strong><small>Projetos e código</small></span><span className="contact-channel-arrow" aria-hidden="true"><ArrowIcon direction="up-right" size={19}/></span></a>
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
  return <dialog ref={ref} className="placeholder-dialog" onClose={close} onCancel={close} onClick={event => { if (event.target === ref.current) close(); }} aria-labelledby="modal-title"><div className="modal-header"><span>PA. / PORTFÓLIO</span><button type="button" onClick={close} aria-label="Fechar aviso"><Glyph name="close" size={20}/></button></div><div className="modal-inner"><SectionLabel>EM PREPARAÇÃO</SectionLabel><h2 id="modal-title">Currículo ainda não anexado.</h2><p>O download estará disponível quando o currículo em PDF for adicionado ao portfólio.</p><button type="button" className="button button-dark" onClick={close}>Voltar <span aria-hidden="true"><ArrowIcon direction="right" size={19}/></span></button></div></dialog>;
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
    if (window.location.hash) {
      const anchor = decodeURIComponent(window.location.hash.slice(1));
      requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView()));
    }
  }, [path]);
  function navigate(to: string, anchor?: string) {
    if (normalizePath(window.location.pathname) !== to) { window.history.pushState({}, '', to + (anchor ? `#${anchor}` : '')); setPath(to); }
    else if (anchor) window.history.replaceState({}, '', `/#${anchor}`);
    if (anchor) requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })));
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }
  return <><a href="#conteudo" className="skip-link">Pular para o conteúdo</a><SiteHeader onNavigate={navigate} currentPath={path}/><main id="conteudo" tabIndex={-1}>{path === '/projetos/educomp' ? <EduCompPage onNavigate={navigate}/> : path.startsWith('/fragmentos/') ? <FragmentosPage onNavigate={navigate}/> : <HomePage onNavigate={navigate} openPlaceholder={setPlaceholder} openContact={() => setContactOpen(true)}/>}</main><PlaceholderModal kind={placeholder} close={() => setPlaceholder(null)}/><ContactModal open={contactOpen} close={() => setContactOpen(false)}/></>;
}
