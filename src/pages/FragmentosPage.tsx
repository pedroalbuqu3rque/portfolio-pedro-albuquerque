import React, { useEffect, useState } from 'react';
import { shouldNavigateInApp } from '../navigation';
import DeskIllustration from '../components/DeskIllustration';

type Props = {
  onNavigate: (path: string, anchor?: string) => void;
};

const relatedReadings = [
  { category: 'EM PREPARAÇÃO', title: 'Novo ensaio', description: 'Espaço reservado para uma futura publicação.' },
  { category: 'EM PREPARAÇÃO', title: 'Próxima leitura', description: 'Espaço reservado para uma futura publicação.' },
  { category: 'EM PREPARAÇÃO', title: 'Novas notas', description: 'Espaço reservado para uma futura publicação.' },
];

const outline = [
  { id: 'aprender', title: 'Aprender também é construir' },
  { id: 'tecnologia', title: 'Tecnologia como meio, não como fim' },
  { id: 'experimentar', title: 'O espaço de experimentar' },
] as const;

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
        await navigator.share({ title: 'A potência do fazer digital na educação', url });
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

      <h1 id="reading-title">A potência do fazer<br/>digital na educação.</h1>
      <span className="reading-blue-rule" aria-hidden="true"/>
      <p className="reading-lead">Como a cultura do fazer, os projetos e as tecnologias digitais podem ampliar a autonomia, a criatividade e o engajamento na aprendizagem.</p>
      <div className="reading-metadata"><strong>PEDRO ALBUQUERQUE</strong><span>EDUCAÇÃO &nbsp;·&nbsp; TECNOLOGIA &nbsp;·&nbsp; APRENDIZAGEM</span><time dateTime="2026-11-11">PUBLICADO EM 11 NOV 2026</time></div>
    </div></section>

    <section className="reading-hero-image" aria-label="Imagem e apresentação do ensaio"><div className="content-width">
      <div className="reading-media">
        <div className="reading-editorial-photo"><DeskIllustration/></div>
        <div className="reading-media-panel"><span>IMAGENS, IDEIAS E POSSIBILIDADES.</span><h2>Fazer é<br/>também<br/>pensar.</h2><span className="reading-blue-rule" aria-hidden="true"/><small>CULTURA DO FAZER&nbsp; / &nbsp;EDUCAÇÃO</small></div>
      </div>

    </div></section>

    <article className="reading-body" aria-label="Texto do ensaio"><div className="content-width reading-body-grid">
      <nav className="reading-outline" aria-label="Neste ensaio"><div className="reading-outline-heading">NESTE ENSAIO</div>
        {outline.map(({ id, title }, index) => <a key={id} href={`#${id}`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong></a>)}
      </nav>
      <div className="reading-prose">
        <p className="reading-opening">O fazer digital começa quando uma ideia encontra espaço para ser testada. Criar, experimentar e revisar são movimentos que ajudam a transformar uma pergunta em experiência de aprendizagem.</p>

        <section id="aprender" aria-labelledby="heading-aprender" className="reading-article-section">
          <h2 id="heading-aprender">Aprender também é construir</h2>
          <p>Uma atividade de criação abre espaço para escolhas que não cabem em respostas prontas. Ao decidir o que fazer, comparar caminhos e explicar um resultado, o estudante torna seu próprio raciocínio mais visível.</p>
          <p>Isso pode acontecer com programação, jogos, protótipos de papel ou pequenas investigações. O mais importante não é a quantidade de ferramentas disponíveis, mas a possibilidade de participar, produzir e compartilhar descobertas.</p>
        </section>

        <section id="tecnologia" aria-labelledby="heading-tecnologia" className="reading-article-section">
          <h2 id="heading-tecnologia">Tecnologia como meio, não como fim</h2>
          <p>Usar um dispositivo ou uma plataforma não torna, por si só, a aprendizagem mais ativa. Uma boa proposta começa com uma intenção pedagógica clara e considera o contexto, o tempo e as pessoas envolvidas.</p>
          <blockquote><span className="reading-quote-rule" aria-hidden="true" />A tecnologia ganha sentido<br/>quando amplia o que podemos<br/>pensar, criar e compartilhar.</blockquote>
          <p>Por isso, planejar as etapas de uma experiência importa tanto quanto escolher a ferramenta. Perguntas abertas, tempos para testar e momentos de conversa ajudam a dar significado ao que foi produzido.</p>
        </section>

        <section id="experimentar" aria-labelledby="heading-experimentar" className="reading-article-section">
          <h2 id="heading-experimentar">O espaço de experimentar</h2>
          <p>Quando o erro pode ser discutido e uma solução pode ser revista, o processo deixa de ser apenas um caminho até a resposta. Ele passa a ser parte do que se aprende.</p>
          <p>O fazer digital ganha potência justamente aí: na combinação entre autoria, colaboração e reflexão. Não se trata de fazer mais coisas com tecnologia, mas de criar condições para aprender de outras maneiras.</p>
        </section>
        <div className="reading-ending"><span aria-hidden="true"/> <strong>Pensar. Fazer. Refazer.</strong></div>
        <div className="reading-actions" aria-label="Ações do ensaio"><button className="reading-action reading-action-primary" type="button" onClick={shareEssay}>Compartilhar <span aria-hidden="true">↗</span></button><a className="reading-action reading-action-secondary" href="/#fragmentos" onClick={returnToFragments}><span aria-hidden="true">←</span> Voltar a Fragmentos</a></div>
        <p className="reading-share-feedback" role="status" aria-live="polite">{shareFeedback}</p>
      </div>
      <aside className="reading-sidenote" aria-label="Nota de leitura"><span>NOTA DE LEITURA</span><p>Projetos permitem observar os caminhos da aprendizagem, não apenas seus resultados.</p><span className="reading-sidenote-mark" aria-hidden="true">//</span></aside>
    </div></article>

    <section className="reading-related" aria-labelledby="related-title"><div className="content-width">
      <EssayEyebrow>FRAGMENTOS &nbsp;/&nbsp; OUTRAS LEITURAS</EssayEyebrow><h2 id="related-title">Novas leituras em breve.</h2>
      <div className="reading-related-grid">{relatedReadings.map(reading => <article className="reading-related-card reading-related-placeholder" key={reading.title}>
        <span>{reading.category}</span><strong>{reading.title}</strong><p>{reading.description}</p>
      </article>)}</div>
    </div></section>
    <footer className="reading-footer"><div className="content-width"><a href="/#inicio" onClick={event => { if (!shouldNavigateInApp(event)) return; event.preventDefault(); onNavigate('/', 'inicio'); }} aria-label="Voltar para o início">PA<span>.</span></a><span>Feito aqui. Por mim</span></div></footer>
  </div>;
}
