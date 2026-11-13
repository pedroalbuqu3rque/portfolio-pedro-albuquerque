import React from 'react';
import { shouldNavigateInApp } from '../navigation';
import ArrowIcon from '../components/ArrowIcon';

type Props = {
  onNavigate: (path: string, anchor?: string) => void;
};

const PLATFORM_URL = 'https://portaleducomp.vercel.app';
const REPOSITORY_URL = 'https://github.com/pedroalbuqu3rque/educomp.git';

const galleryItems = [
  { id: '01', title: 'Biblioteca e descoberta', image: '/assets/educomp/biblioteca-educomp.png', alt: 'Biblioteca do EduComp com busca, filtros e materiais didáticos', className: 'case-gallery-feature' },
  { id: '02', title: 'Detalhes do material', image: '/assets/educomp/detalhes-material-educomp.png', alt: 'Página de um recurso com informações pedagógicas e arquivo para acessar', className: 'case-gallery-small' },
  { id: '03', title: 'Envio de materiais', image: '/assets/educomp/enviar-materiais-educomp.png', alt: 'Formulário para compartilhar materiais na plataforma', className: 'case-gallery-small' },
  { id: '04', title: 'Comunidade e participação', image: '/assets/educomp/comunidade-educomp.png', alt: 'Área de comunidade com comentários, relatos e discussões', className: 'case-gallery-wide' },
] as const;

const process = [
  { title: 'Produto (PO)', description: 'Definição do escopo, organização do acervo e priorização dos fluxos principais.' },
  { title: 'UX/UI Design', description: 'Arquitetura, prototipação e refinamento de usabilidade e acessibilidade.' },
  { title: 'Desenvolvimento', description: 'Implementação das interfaces e integração das funcionalidades da plataforma.' },
  { title: 'QA e testes', description: 'Verificação dos fluxos, registro de falhas e revisão do comportamento da aplicação.' },
];

const flows = [
  { number: '01', action: 'BUSCAR', title: 'Encontrar materiais', description: 'Busca e filtros organizam os recursos por tema, tipo, etapa e abordagem.', decision: 'Organizar a descoberta por tema e etapa de ensino, sem exigir que o professor conheça o acervo.', image: '/assets/educomp/biblioteca-educomp.png', alt: 'Tela de busca e biblioteca do EduComp' },
  { number: '02', action: 'EXPLORAR', title: 'Conhecer o recurso', description: 'Informações do material, autoria e discussões ajudam na escolha do que utilizar.', decision: 'Apresentar o contexto pedagógico e a autoria antes da decisão de utilizar o material.', image: '/assets/educomp/detalhes-material-educomp.png', alt: 'Tela com os detalhes de um material didático' },
  { number: '03', action: 'CONTRIBUIR', title: 'Enviar material', description: 'Um formulário guiado reúne as informações necessárias para publicar novos recursos.', decision: 'Separar o envio da publicação: o material passa pela etapa de revisão.', image: '/assets/educomp/enviar-materiais-educomp.png', alt: 'Tela de envio de material para revisão' },
] as const;

function CaseEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="case-eyebrow"><span className="case-marker" aria-hidden="true" />{children}</p>;
}

function ProjectLinks({ position }: { position: 'hero' | 'final' }) {
  return <div className={position === 'hero' ? 'case-hero-actions' : 'case-final-actions'}>
    <a href={PLATFORM_URL} className="button button-primary" target="_blank" rel="noopener noreferrer">
      Acessar a plataforma <ArrowIcon direction="up-right" size={19} />
    </a>
    <a href={REPOSITORY_URL} className="button button-outline" target="_blank" rel="noopener noreferrer">
      Ver repositório no GitHub <ArrowIcon direction="up-right" size={19} />
    </a>
  </div>;
}

function GallerySlot({ number, label, image, alt, className }: { number: string; label: string; image: string; alt: string; className: string }) {
  return <figure className={`case-gallery-item ${className}`}>
    <div className="case-gallery-image">
      <img src={image} alt={alt} loading="lazy" decoding="async" />
    </div>
    <figcaption><span>{number} /</span><strong>{label}</strong></figcaption>
  </figure>;
}

export default function EduCompPage({ onNavigate }: Props) {
  return <div className="case-page">
    <section className="case-hero" aria-labelledby="case-title">
      <div className="content-width case-hero-inner">
        <a className="case-back" href="/#projetos" onClick={event => { if (!shouldNavigateInApp(event)) return; event.preventDefault(); onNavigate('/', 'projetos'); }}><ArrowIcon direction="left" size={17}/> VOLTAR A PROJETOS</a>
        <div className="case-hero-copy">
          <CaseEyebrow>EDUCAÇÃO DIGITAL</CaseEyebrow>
          <h1 id="case-title">EduComp</h1><span className="case-hero-rule" aria-hidden="true" />
          <h2>Uma biblioteca colaborativa<br />para ensinar Computação.</h2>
          <p>Um espaço para encontrar, compartilhar e organizar materiais didáticos de Computação. Recursos, pessoas e ideias reunidos em uma experiência simples de usar.</p>
          <ProjectLinks position="hero" />
        </div>
        <dl className="case-facts">
          <div><dt>TIPO DE PROJETO</dt><dd>Plataforma web colaborativa</dd></div>
          <div><dt>MINHA ATUAÇÃO</dt><dd>PO · UX/UI Design · Desenvolvimento · QA</dd></div>
          <div><dt>PÚBLICO</dt><dd>Professores de Computação</dd></div>
        </dl>
      </div>
    </section>

    <section className="case-gallery" aria-labelledby="case-gallery-title">
      <div className="content-width">
        <CaseEyebrow>A PLATAFORMA EM FOCO</CaseEyebrow>
        <h2 id="case-gallery-title">Uma plataforma, diferentes experiências.</h2>
        <p className="case-lead">Da descoberta de materiais à participação na comunidade.</p>
        <div className="case-gallery-layout">
          {galleryItems.map(item => <GallerySlot key={item.id} number={item.id} label={item.title} image={item.image} alt={item.alt} className={item.className}/>)}
        </div>
      </div>
    </section>

    <section className="case-context" aria-labelledby="case-context-title">
      <div className="content-width">
        <CaseEyebrow>01 &nbsp;/&nbsp; O PROJETO</CaseEyebrow>
        <div className="case-context-grid"><h2 id="case-context-title">Compartilhar também<br/>é uma forma de ensinar.</h2>
          <div className="case-context-copy"><p>O EduComp reúne materiais e atividades voltados ao ensino de Computação na Educação Básica. A proposta é facilitar a descoberta de recursos, a troca entre professores e a circulação de boas ideias.</p><p>Busca, filtros, salvos, páginas de materiais, discussões e envio de novas contribuições fazem parte dessa experiência.</p></div>
        </div>
        <dl className="case-context-meta"><div><dt>O QUE É</dt><dd>Biblioteca colaborativa</dd></div><div><dt>PARA QUEM</dt><dd>Professores de Computação</dd></div><div><dt>FORMATO</dt><dd>Plataforma web</dd></div></dl>
      </div>
    </section>

    <section className="case-challenge" aria-labelledby="case-challenge-title">
      <div className="content-width">
        <CaseEyebrow>02 &nbsp;/&nbsp; O DESAFIO</CaseEyebrow>
        <div className="case-challenge-intro"><h2 id="case-challenge-title">Os recursos existem.<br/>O difícil é fazê-los circular.</h2><p>Uma boa plataforma precisa ajudar o professor a encontrar o que procura e contribuir com o que já criou — sem acrescentar complexidade ao seu trabalho.</p></div>
        <ol className="case-challenge-steps"><li><span>01</span><strong>ENCONTRAR</strong><p>Busca clara e filtros que façam sentido.</p></li><li><span>02</span><strong>EXPLORAR</strong><p>Informações suficientes para escolher um material.</p></li><li><span>03</span><strong>COMPARTILHAR</strong><p>Um percurso de envio direto e organizado.</p></li></ol>
      </div>
    </section>

    <section className="case-flows" aria-labelledby="case-flows-title">
      <div className="content-width">
        <CaseEyebrow>03 &nbsp;/&nbsp; EXPERIÊNCIA</CaseEyebrow>
        <h2 id="case-flows-title">Da descoberta à contribuição.</h2>
        <p className="case-lead">Três percursos que conectam quem procura materiais a quem quer compartilhá-los.</p>
        <div className="case-flow-grid">{flows.map(flow => <article className="case-flow-card" key={flow.number}>
          <div className="case-flow-screen"><img src={flow.image} alt={flow.alt} loading="lazy" decoding="async" /></div>
          <div className="case-flow-label">{flow.number} / {flow.action}</div>
          <h3>{flow.title}</h3><p>{flow.description}</p>
          <div className="case-flow-decision"><span>DECISÃO DE UX</span><p>{flow.decision}</p></div>
        </article>)}</div>
      </div>
    </section>

    <section className="case-process" aria-labelledby="case-process-title">
      <div className="content-width case-process-layout">
        <div className="case-process-copy"><CaseEyebrow>04 &nbsp;/&nbsp; DA IDEIA À INTERFACE</CaseEyebrow><h2 id="case-process-title">O trabalho por trás<br/>das telas.</h2><p>Entre estrutura, conteúdo e interface, cada decisão procura tornar o acesso aos materiais mais claro e a participação mais simples.</p><span className="case-process-rule"/></div>
        <ol className="case-process-grid">{process.map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.description}</p></li>)}</ol>
      </div>
    </section>

    <section className="case-final" aria-labelledby="case-final-title"><div className="content-width">
      <div className="case-final-cta"><div><CaseEyebrow>EXPLORAR O PROJETO</CaseEyebrow><h2 id="case-final-title">Veja o EduComp<br/>por dentro.</h2><span className="case-process-rule"/><p>Acesse a plataforma publicada ou consulte o código-fonte no GitHub.</p></div><ProjectLinks position="final" /></div>
    </div></section>
    <footer className="case-page-footer"><div className="content-width"><a href="/#inicio" onClick={event => { if (!shouldNavigateInApp(event)) return; event.preventDefault(); onNavigate('/', 'inicio'); }} aria-label="Voltar para o início">PA<span>.</span></a><span>Feito aqui. Por mim.</span></div></footer>
  </div>;
}
