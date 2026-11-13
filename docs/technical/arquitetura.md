# Arquitetura técnica

## Visão geral

O portfólio é uma aplicação client-side construída com React 19, TypeScript e Vite 6. O resultado publicado é estático e não utiliza autenticação, API própria ou banco de dados.

A página inicial e as duas rotas internas compartilham o mesmo ambiente de componentes e estilos. Conteúdo de projetos, trajetória, tecnologias e contato é mantido no código; o ensaio está isolado em um módulo de conteúdo.

## Estrutura

| Caminho | Responsabilidade |
| --- | --- |
| `index.html` | Abertura inicial em tela cheia, declarada antes do JavaScript para evitar flash da página |
| `src/main.tsx` | Montagem da aplicação e ordem de importação dos estilos |
| `src/App.tsx` | Landing, cabeçalho, estados, navegação e interações |
| `src/components/ProjectsSection.tsx` | Vitrine de Projetos e cards informativos |
| `src/components/ArrowIcon.tsx` | Setas SVG compartilhadas |
| `src/pages/EduCompPage.tsx` | Estudo de caso |
| `src/pages/FragmentosPage.tsx` | Apresentação e leitura do ensaio |
| `src/content/ensaio-fazer-digital.ts` | Texto integral, índice e metadados do ensaio |
| `src/navigation.ts` | Comportamento de links internos e cliques modificados |
| `src/seo.ts` | Atualização de título e metadados durante a navegação |
| `src/*.css` | Layout, componentes visuais, estados e media queries |
| `public/assets/` | Fotografias, ícones e imagens de apresentação |
| `site-meta.json` | Metadados de SEO por rota |
| `scripts/` | Verificações e geração dos documentos do build |

Os arquivos CSS são importados em ordem por `src/main.tsx`; as folhas das páginas internas são importadas pelos componentes correspondentes. Essa ordem faz parte da cascata e deve ser preservada em eventuais reorganizações.

## Rotas e navegação

| Rota | Conteúdo |
| --- | --- |
| `/` | Página principal |
| `/projetos/educomp` | Estudo de caso do EduComp |
| `/fragmentos/a-potencia-do-fazer-digital-na-educacao` | Ensaio de Fragmentos |

A abertura inicial com tipografia Archivo ocorre apenas no carregamento da página, com saída controlada pelo React após a montagem e movimento reduzido quando solicitado. A History API permite navegar sem recarregar a aplicação. O controle `shouldNavigateInApp` respeita abertura em nova aba e modificadores de teclado. O script de build gera um `index.html` para cada rota; a hospedagem precisa disponibilizar esses arquivos nos respectivos caminhos.

## Dados e recursos

As constantes da landing definem as cinco áreas, a faixa de 15 tecnologias, a trajetória e a galeria de nove fotografias. As imagens estão em `public/assets`, enquanto título, texto e data do ensaio são importados de um único arquivo em `src/content/`.

A ação do currículo busca `public/curriculo-pedro-albuquerque.pdf`. Se não encontrar um PDF válido, apresenta uma mensagem em vez de entregar um HTML de fallback como arquivo.

## SEO e publicação

`site-meta.json` define título, descrição, tipo Open Graph e indexação de cada página. `scripts/generate-seo.mjs` cria os HTMLs de entrada com metadados próprios, dados estruturados e, quando `VITE_SITE_URL` está definido, URL canônica e sitemap absoluto.

Para produção, configure `VITE_SITE_URL` com a origem pública (protocolo e domínio, sem barra ao final). O arquivo `.env.example` documenta o formato. Nenhuma credencial precisa estar no código-fonte.

## Verificação

```bash
npm ci
npm run verify
```

`verify` executa verificações de conteúdo, recursos, documentação, TypeScript e build. A configuração em `.github/workflows/ci.yml` repete o processo em pushes e pull requests para `main`.

Os scripts estáticos verificam convenções do projeto, mas não substituem testes de interação, contraste ou responsividade em navegador. O [plano de testes](../qa/plano-de-testes.md) descreve essa cobertura complementar.
