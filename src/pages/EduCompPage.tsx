import React from 'react';

type Props = {
  onNavigate: (path: string, anchor?: string) => void;
};

const PROTOTYPE_URL = 'https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32684';

const galleryItems = [
  { id: '01', title: 'Biblioteca e descoberta', className: 'case-gallery-feature' },
  { id: '02', title: 'Detalhes do material', className: 'case-gallery-small' },
  { id: '03', title: 'Envio de materiais', className: 'case-gallery-small' },
  { id: '04', title: 'Perfis e comunidade', className: 'case-gallery-wide' },
] as const;

const process = [
  { title: 'Estruturar a biblioteca', description: 'Tipos de materiais, categorias e formas de encontrar recursos.' },
  { title: 'Desenhar os fluxos', description: 'Caminhos de consulta, salvamento, envio e moderação.' },
  { title: 'Refinar a interface', description: 'Hierarquia, consistência visual e legibilidade das telas.' },
  { title: 'Construir e revisar', description: 'Implementação gradual e ajustes ao longo do projeto.' },
];

function CaseEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="case-eyebrow"><span className="case-marker" aria-hidden="true" />{children}</p>;
}

function GallerySlot({ number, label, className }: { number: string; label: string; className: string }) {
  return <figure className={`case-gallery-item ${className}`}>
    <div className="case-gallery-image" role="img" aria-label={`Espaço reservado para captura da tela ${label} do EduComp`}>
      <span className="case-placeholder-plus" aria-hidden="true">+</span>
      <span>ADICIONAR CAPTURA</span>
    </div>
    <figcaption><span>{number} /</span><strong>{label}</strong></figcaption>
  </figure>;
}

function EduCompMiniature({ kind }: { kind: 'search' | 'detail' | 'submit' }) {
  return <div className="case-mini-outer" role="img" aria-label={`Prévia ilustrativa: ${kind === 'search' ? 'biblioteca' : kind === 'detail' ? 'detalhes de um material' : 'envio de material'}`}>
    <div className="case-mini-window">
      <div className="case-mini-nav"><span className="case-mini-logo"><i />EduComp</span><span>Biblioteca&nbsp;&nbsp; Salvos&nbsp;&nbsp; Enviar</span></div>
      {kind === 'search' && <div className="case-mini-main">
        <h4>Biblioteca</h4>
        <div className="case-mini-search"><span>Buscar por título ou tema...</span><b>Buscar</b></div>
        <div className="case-mini-results">{['Algoritmos', 'Lógica', 'Scratch'].map(label => <div key={label}><small>RECURSO</small><strong>{label}</strong><i /></div>)}</div>
      </div>}
      {kind === 'detail' && <div className="case-mini-main"><small className="case-mini-blue">BIBLIOTECA / MATERIAL</small><h4>Jogos de lógica</h4>
        <div className="case-mini-detail"><div className="case-mini-figures"><i /><i /><i /></div><div className="case-mini-facts"><small>SOBRE O JOGO</small><span>EF · 5º ano</span><span>Desplugada</span><span>Raciocínio</span></div></div>
      </div>}
      {kind === 'submit' && <div className="case-mini-main case-mini-form"><small className="case-mini-blue">COMPARTILHE UM RECURSO</small><h4>Enviar material</h4>
        <div className="case-mini-fields"><span>Título do material</span><span>Tipo <i>⌄</i></span></div>
        <div className="case-mini-desc">Descrição do recurso</div><b className="case-mini-send">Enviar para revisão</b>
      </div>}
    </div>
  </div>;
}

const flows = [
  { number: '01', action: 'BUSCAR', title: 'Encontrar materiais', description: 'Busca e filtros organizam os recursos por tema, tipo, etapa e abordagem.', decision: 'Organizar a descoberta por tema e etapa de ensino, sem exigir que o professor conheça o acervo.', kind: 'search' },
  { number: '02', action: 'EXPLORAR', title: 'Conhecer o recurso', description: 'Informações do material, autoria e discussões ajudam na escolha do que utilizar.', decision: 'Apresentar o contexto pedagógico e a autoria antes da decisão de utilizar o material.', kind: 'detail' },
  { number: '03', action: 'CONTRIBUIR', title: 'Enviar material', description: 'Um formulário guiado reúne as informações necessárias para publicar novos recursos.', decision: 'Separar o envio da publicação: o material passa pela etapa de revisão.', kind: 'submit' },
] as const;

export default function EduCompPage({ onNavigate }: Props) {
  return <div className="case-page">
    <section className="case-hero" aria-labelledby="case-title">
      <div className="content-width case-hero-inner">
        <a className="case-back" href="/#projetos" onClick={event => { event.preventDefault(); onNavigate('/', 'projetos'); }}>← VOLTAR A PROJETOS</a>
        <div className="case-hero-copy">
          <CaseEyebrow>ESTUDO DE CASO&nbsp; / &nbsp;EDUCAÇÃO DIGITAL</CaseEyebrow>
          <h1 id="case-title">EduComp</h1><span className="case-hero-rule" aria-hidden="true" />
          <h2>Uma biblioteca colaborativa<br />para ensinar Computação.</h2>
          <p>Um espaço para encontrar, compartilhar e organizar materiais didáticos de Computação. Recursos, pessoas e ideias reunidos em uma experiência simples de usar.</p>
          <div className="case-hero-actions"><a href={PROTOTYPE_URL} className="button button-primary" target="_blank" rel="noopener noreferrer">Explorar o protótipo&nbsp; →</a><span>PROJETO EM DESENVOLVIMENTO &nbsp;·&nbsp; 2026</span></div>
        </div>
        <dl className="case-facts">
          <div><dt>TIPO DE PROJETO</dt><dd>Plataforma web colaborativa</dd></div>
          <div><dt>MINHA ATUAÇÃO</dt><dd>UX/UI Design · Desenvolvimento</dd></div>
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
          {galleryItems.map(item => <GallerySlot key={item.id} number={item.id} label={item.title} className={item.className}/>)}
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
        <p className="case-flow-intro">Cada percurso apresenta a tela, sua função e a escolha de interface por trás dela.</p>
        <div className="case-flow-grid">{flows.map(flow => <article className="case-flow-card" key={flow.number}>
          <EduCompMiniature kind={flow.kind}/>
          <div className="case-flow-label">{flow.number} / {flow.action}</div>
          <h3>{flow.title}</h3><p>{flow.description}</p>
          <div className="case-flow-decision"><span>DECISÃO DE UX</span><p>{flow.decision}</p></div>
        </article>)}</div>
      </div>
    </section>

    <section className="case-process" aria-labelledby="case-process-title">
      <div className="content-width case-process-layout">
        <div className="case-process-copy"><CaseEyebrow>04 &nbsp;/&nbsp; DA IDEIA À INTERFACE</CaseEyebrow><h2 id="case-process-title">O trabalho por trás<br/>das telas.</h2><p>Entre estrutura, conteúdo e interface, cada decisão procura tornar o acesso aos materiais mais claro e a participação mais simples.</p><span className="case-process-rule"/><small>ESTRUTURA · EXPERIÊNCIA · DESENVOLVIMENTO</small></div>
        <ol className="case-process-grid">{process.map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.description}</p></li>)}</ol>
      </div>
    </section>

    <section className="case-final" aria-labelledby="case-final-title"><div className="content-width">
      <div className="case-tools"><span>FERRAMENTAS E CONTEXTO</span><div className="case-tool-list">{['FIGMA', 'GITHUB', 'SUPABASE', 'PROTÓTIPO INTERATIVO'].map(t => <span key={t}>{t}</span>)}</div><small>PROJETO DE PORTFÓLIO · EM DESENVOLVIMENTO</small></div>
      <div className="case-final-cta"><div><CaseEyebrow>EXPLORAR O PROJETO</CaseEyebrow><h2 id="case-final-title">Veja o EduComp<br/>por dentro.</h2><span className="case-process-rule"/><p>O protótipo reúne as principais telas e fluxos da plataforma.</p></div><a className="button button-primary" href={PROTOTYPE_URL} target="_blank" rel="noopener noreferrer">Abrir protótipo no Figma&nbsp; →</a></div>
    </div></section>
    <footer className="case-page-footer"><div className="content-width"><a href="/#inicio" onClick={e => {e.preventDefault();onNavigate('/', 'inicio')}} aria-label="Voltar para o início">PA<span>.</span></a><span>Feito aqui. Por mim</span></div></footer>
  </div>;
}
