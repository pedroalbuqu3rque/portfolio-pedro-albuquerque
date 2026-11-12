import React, { useEffect, useState } from 'react';
import { ESSAY_AUTHOR, ESSAY_TITLE, ESSAY_SUBTITLE, ESSAY_ENDING, ESSAY_SECTIONS, ESSAY_PUBLISHED, ESSAY_PUBLISHED_LABEL } from '../content/ensaio-fazer-digital';
import { shouldNavigateInApp } from '../navigation';
import ArrowIcon from '../components/ArrowIcon';
import '../fragmentos-essay.css';

type Props = {
  onNavigate: (path: string, anchor?: string) => void;
};

const relatedReadings = [
  { category: 'EM PREPARAÇÃO', title: 'Novo ensaio', description: 'Espaço reservado para uma futura publicação.' },
  { category: 'EM PREPARAÇÃO', title: 'Próxima leitura', description: 'Espaço reservado para uma futura publicação.' },
  { category: 'EM PREPARAÇÃO', title: 'Novas notas', description: 'Espaço reservado para uma futura publicação.' },
];

const outline = ESSAY_SECTIONS.map(({ id, title }) => ({ id, title }));
const totalParagraphs = ESSAY_SECTIONS.reduce((count, section) => count + section.paragraphs.length, 0);

function EssayEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="essay-eyebrow"><span className="case-marker" aria-hidden="true" />{children}</p>;
}
function EssayProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const article = document.querySelector<HTMLElement>('.reading-body');
        if (!article) return;
        const start = window.scrollY + article.getBoundingClientRect().top;
        const extent = Math.max(1, article.offsetHeight - window.innerHeight * 0.65);
        setProgress(Math.max(0, Math.min(100, ((window.scrollY - start) / extent) * 100)));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  return <div className="reading-scroll-progress" aria-hidden="true"><span style={{ width: `${progress}%` }}/></div>;
}

export default function FragmentosPage({ onNavigate }: Props) {
  const [shareFeedback, setShareFeedback] = useState('');
  async function shareEssay() {
    const url = new URL('/fragmentos/a-potencia-do-fazer-digital-na-educacao', window.location.origin).toString();
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: ESSAY_TITLE, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareFeedback('Link copiado para compartilhar.');
    } catch {
      window.prompt('Copie o link do ensaio:', url);
    }
  }
  function returnToFragments(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!shouldNavigateInApp(event)) return;
    event.preventDefault();
    onNavigate('/', 'fragmentos');
  }


  return <div className="reading-page">
    <EssayProgress />
    <section className="reading-hero" aria-labelledby="reading-title"><div className="content-width">
      <div className="reading-topline"><EssayEyebrow>FRAGMENTOS &nbsp;/&nbsp; ENSAIO</EssayEyebrow></div>

      <h1 id="reading-title">{ESSAY_TITLE}<span className="blue-text">.</span></h1>
      <span className="reading-blue-rule" aria-hidden="true"/>
      <p className="reading-lead">{ESSAY_SUBTITLE}</p>
      <div className="reading-metadata"><strong>{ESSAY_AUTHOR.toUpperCase()}</strong><time dateTime={ESSAY_PUBLISHED}>PUBLICADO EM {ESSAY_PUBLISHED_LABEL}</time></div>
    </div></section>

    <section className="reading-hero-image" aria-label="Imagem e apresentação do ensaio"><div className="content-width">
      <div className="reading-media">
        <figure className="reading-editorial-figure">
          <div className="reading-editorial-photo"><img src="/assets/fragmentos/fazer-digital.webp" width={1080} height={810} alt="Leitor digital com texto acadêmico, caneta e fones de ouvido sobre uma mesa." decoding="async" /></div>
          <figcaption className="reading-image-caption">Anotação, leitura e tecnologia como parte do processo de aprender, testar e refazer ideias.</figcaption>
        </figure>
        <aside className="reading-media-panel" aria-label="Apresentação editorial do ensaio">
          <div className="reading-media-panel-top">
            <span>ENSAIO</span>
            <small>{ESSAY_PUBLISHED_LABEL}</small>
          </div>
          <h2>{ESSAY_TITLE}</h2>
          <p>{ESSAY_SUBTITLE}</p>
          <dl className="reading-media-facts">
            <div><dt>Formato</dt><dd>Leitura integral</dd></div>
            <div><dt>Seções</dt><dd>{outline.length} partes</dd></div>
            <div><dt>Extensão</dt><dd>{totalParagraphs} parágrafos</dd></div>
          </dl>
          <a className="reading-media-jump" href={`#${outline[0]?.id ?? 'pensar'}`}>
            Começar leitura <ArrowIcon direction="down" size={18} />
          </a>
        </aside>
      </div>

    </div></section>

    <article className="reading-body" aria-label="Texto do ensaio"><div className="content-width reading-body-grid">
      <nav className="reading-outline" aria-label="Neste ensaio"><div className="reading-outline-heading">NESTE ENSAIO</div>
        {outline.map(({ id, title }, index) => <a key={id} href={`#${id}`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong></a>)}
      </nav>
      <div className="reading-prose">
        {ESSAY_SECTIONS.map((section, sectionIndex) => (
          <section key={section.id} id={section.id} className="reading-article-section" aria-labelledby={`section-${section.id}`}>
            <h2 id={`section-${section.id}`} className="reading-section-sr-only">{section.title}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={index} className={sectionIndex === 0 && index === 0 ? 'reading-opening' : undefined}>{paragraph}</p>
            ))}
          </section>
        ))}
        <div className="reading-ending"><span aria-hidden="true"/><strong>{ESSAY_ENDING}</strong></div>
        <div className="reading-essay-actions">
          <a href="/#fragmentos" onClick={returnToFragments}><ArrowIcon direction="left" size={19}/> Voltar a Fragmentos</a>
          <div className="reading-share"><button type="button" onClick={() => { void shareEssay(); }}>Compartilhar <ArrowIcon direction="up-right" size={19}/></button><span className="reading-share-feedback" role="status" aria-live="polite">{shareFeedback}</span></div>
        </div>
      </div>
      <aside className="reading-sidenote" aria-label="Nota de leitura"><span>NOTA DE LEITURA</span><p>Quando construímos alguma coisa, não estamos apenas produzindo um resultado. Estamos organizando, de alguma forma, o nosso próprio pensamento.</p><span className="reading-sidenote-mark" aria-hidden="true">//</span></aside>
    </div></article>

    <section className="reading-related" aria-labelledby="related-title"><div className="content-width">
      <EssayEyebrow>FRAGMENTOS &nbsp;/&nbsp; OUTRAS LEITURAS</EssayEyebrow><h2 id="related-title">Novas leituras em breve.</h2>
      <div className="reading-related-grid">{relatedReadings.map(reading => <article className="reading-related-card reading-related-placeholder" key={reading.title}>
        <span>{reading.category}</span><strong>{reading.title}</strong><p>{reading.description}</p>
      </article>)}</div>
    </div></section>
    <footer className="reading-footer"><div className="content-width"><a href="/#inicio" onClick={event => { if (!shouldNavigateInApp(event)) return; event.preventDefault(); onNavigate('/', 'inicio'); }} aria-label="Voltar para o início">PA<span>.</span></a><span>Feito aqui. Por mim.</span></div></footer>
  </div>;
}
