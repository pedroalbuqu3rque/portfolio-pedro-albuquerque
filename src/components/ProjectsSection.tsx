/** Two editorial showcase slots on desktop; the compact upcoming list stays below. */
import ArrowIcon from './ArrowIcon';
import { shouldNavigateInApp } from '../navigation';

type Props = {
  onNavigate: (path: string) => void;
};

const UPCOMING_PROJECTS = ['02', '03'] as const;

function ProjectPlaceholder({ index }: { index: string }) {
  return (
    <article className="project-placeholder" aria-label={`Espaço reservado para o projeto ${index}`}>
      <div className="project-placeholder-media" aria-hidden="true">
        <span>{index} / PORTFÓLIO</span>
        <span className="project-placeholder-number">{index}</span>
      </div>
      <div className="project-placeholder-content">
        <span className="project-placeholder-status">EM PREPARAÇÃO</span>
        <h3>Novo projeto</h3>
        <p>Espaço reservado para um próximo trabalho.</p>
      </div>
    </article>
  );
}

function ShowcasePlaceholder() {
  return (
    <article className="project-showcase-placeholder" aria-label="Espaço reservado para um segundo projeto em destaque">
      <div className="project-showcase-media" aria-hidden="true">
        <span className="project-media-index">PRÓXIMO DESTAQUE</span>
        <span className="project-showcase-name">Em breve<span>.</span></span>
        <span className="project-media-caption">ESPAÇO RESERVADO / PORTFÓLIO</span>
      </div>
      <div className="project-showcase-content">
        <span className="project-placeholder-status">EM PREPARAÇÃO</span>
        <h3>Próximo projeto</h3>
        <p>Um novo trabalho terá seu espaço aqui.</p>
      </div>
    </article>
  );
}

export default function ProjectsSection({ onNavigate }: Props) {
  return (
    <section className="projects" id="projetos" aria-labelledby="projects-title">
      <div className="content-width projects-content">
        <p className="section-label">TRABALHOS EM DESTAQUE</p>
        <h2 id="projects-title" className="section-title">Projetos</h2>

        <div className="projects-list">
          <div className="projects-featured-row">
            <a
              className="project-featured"
              href="/projetos/educomp"
              onClick={(event) => {
                // Maintains SPA navigation and browser support for opening in a new tab.
                if (!shouldNavigateInApp(event)) return;
                event.preventDefault();
                onNavigate('/projetos/educomp');
              }}
              aria-label="Conhecer o projeto EduComp"
            >
              <div className="project-featured-media" aria-hidden="true">
                <span className="project-media-index">01 / PROJETO EM DESTAQUE</span>
                <span className="project-media-name">EduComp<span>.</span></span>
                <span className="project-media-caption">BIBLIOTECA COLABORATIVA / COMPUTAÇÃO NA EDUCAÇÃO</span>
              </div>
              <div className="project-featured-content">
                <div className="project-featured-meta">
                  <span>PO · UX/UI Design · Desenvolvimento · QA</span>
                  <time dateTime="2026">2026</time>
                </div>
                <div className="project-featured-main">
                  <div className="project-featured-copy">
                    <h3>EduComp</h3>
                    <p>Uma biblioteca colaborativa para encontrar e compartilhar materiais didáticos de Computação.</p>
                  </div>
                  <span className="project-featured-link">Acessar projeto <ArrowIcon direction="up-right" size={19}/></span>
                </div>
              </div>
            </a>
            <ShowcasePlaceholder />
          </div>
          <div className="projects-upcoming" aria-label="Próximos projetos">
            {UPCOMING_PROJECTS.map(index => <ProjectPlaceholder key={index} index={index} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
