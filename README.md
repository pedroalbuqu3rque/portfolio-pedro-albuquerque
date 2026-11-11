# Portfólio — Pedro Albuquerque

Portfólio pessoal dedicado a projetos, áreas de atuação, experiências e textos reunidos em **Fragmentos**. A interface foi desenhada no Figma e desenvolvida com React, TypeScript e CSS. Preto e branco formam a base visual; o azul aparece nos detalhes e nas interações.

## O que há no site

A página inicial apresenta o EduComp como projeto principal, seguido de espaços reservados para outros trabalhos. Mais abaixo, estão as áreas de atuação, a faixa de tecnologias, os Fragmentos, a trajetória, uma galeria de fotografias autorais e o contato.

O **EduComp** possui uma página de estudo de caso com contexto, desafios, fluxos e as etapas de produto (PO), UX/UI, desenvolvimento e QA. O primeiro ensaio de **Fragmentos** tem página própria, índice de leitura e opção de compartilhamento. Os outros cards de projetos e textos são apenas reservas visuais: não são links para conteúdo inexistente.

## Tecnologias

React 19 · TypeScript · Vite 6 · CSS

Não há backend nem banco de dados neste repositório.

## Executar localmente

Requer Node.js e npm. Na pasta do projeto:

```bash
npm ci
npm run dev
```

Para validar antes da publicação:

```bash
npm run check:content
npm run typecheck
npm run build
npm run preview
```

O comando `build` gera os arquivos de produção em `dist/`. Não é necessário versionar ou enviar a pasta `node_modules/`: as dependências são instaladas com `npm ci` conforme o `package-lock.json`.

No PowerShell, se o Windows impedir a execução de `npm.ps1`, use `npm.cmd` nos comandos acima.

## Organização

```text
public/                   Imagens, ícones e arquivos públicos
src/
  App.tsx                 Landing, carrosséis, navegação e modais
  components/             Seção Projetos e ilustração editorial
  pages/                  Estudo de caso EduComp e ensaio Fragmentos
  navigation.ts           Regras para navegação entre páginas
  projects.css            Estilos da seção Projetos
  styles.css              Base da interface e estilos gerais
  editorial.css           Refinamentos editoriais e responsividade
  landing-refinement.css  Ajustes de áreas e trajetória
  gallery-timeline-polish.css   Galeria, trajetória e faixa de tecnologias
  finishing-touches.css   Acabamento dos Fragmentos e Sobre mim
  internal-pages.css      Estilos das páginas internas
  seo.ts                  Metadados durante a navegação
scripts/                   Verificação de conteúdo e geração de SEO
docs/                      Produto, UX/UI, desenvolvimento e QA
site-meta.json             Títulos e descrições por rota
```

Os estilos foram mantidos em arquivos por responsabilidade para preservar o trabalho visual já existente. A seção Projetos não depende mais do carrossel nem de dimensões fixas; seus cards estão organizados em fluxo vertical, incluindo no celular.

## Documentação

**Produto:** [Product brief](docs/product/product-brief.md) e [Escopo](docs/product/escopo-mvp.md).

**UX/UI:** [Arquitetura da informação](docs/ux-ui/arquitetura-da-informacao.md), [Objetivos de UX](docs/ux-ui/objetivos-de-ux.md), [Design system](docs/ux-ui/design-system.md) e [Handoff](docs/ux-ui/handoff.md).

**Técnico e qualidade:** [Arquitetura técnica](docs/technical/arquitetura.md) e [Plano de testes](docs/qa/plano-de-testes.md).

O [arquivo do portfólio no Figma](https://www.figma.com/design/Cv3t12N25QRmqZzPKko0L1/Portf%C3%B3lio?node-id=325-64) permanece como referência de design. As imagens da galeria e as decisões de preparação estão descritas em [`public/assets/galeria/README.md`](public/assets/galeria/README.md).

## Antes de publicar

É preciso adicionar o currículo `public/curriculo-pedro-albuquerque.pdf`, substituir as áreas reservadas por capturas reais do EduComp e revisar os links das redes sociais. O currículo não é oferecido como um download inválido: enquanto não existir, o site apresenta um aviso.

Para gerar URLs canônicas, Open Graph e sitemap, defina `VITE_SITE_URL` com o endereço definitivo da publicação, usando `.env.example` como modelo. O arquivo `.env` é ignorado pelo Git.
