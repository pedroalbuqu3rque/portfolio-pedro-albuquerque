# Portfólio — Pedro Albuquerque

Site pessoal para apresentar projetos, áreas de atuação, percurso acadêmico e profissional e textos de autoria própria.

## Estrutura

O projeto é uma aplicação estática em React, TypeScript e Vite. Não depende de API, autenticação ou banco de dados.

- `src/App.tsx`: página inicial, navegação, trajetória, galeria e contato.
- `src/components/ProjectsSection.tsx`: vitrine de projetos.
- `src/pages/EduCompPage.tsx`: estudo de caso do EduComp.
- `src/pages/FragmentosPage.tsx`: leitura do ensaio.
- `src/content/ensaio-fazer-digital.ts`: texto integral do ensaio e metadados de publicação.
- `site-meta.json`: títulos e descrições usados no SEO.
- `public/assets/`: imagens, fotografias e marcas.
- `docs/`: documentação de produto, interface, arquitetura e testes.

## Executar

Requer Node.js e npm.

```bash
npm ci
npm run dev
```

Para conferir antes de publicar:

```bash
npm run check:content
npm run check:assets
npm run typecheck
npm run build
```

Ou rode tudo de uma vez com `npm run verify`.

No PowerShell do Windows, use `npm.cmd` se a política de execução impedir `npm.ps1`.

## Publicação

O build é gerado em `dist/`. Configure o servidor para disponibilizar as rotas internas e os arquivos estáticos. O script de SEO cria uma entrada HTML para cada uma das três rotas existentes.

Defina `VITE_SITE_URL` com a URL pública completa para gerar tags canônicas e sitemap absoluto. Use `.env.example` como referência (não envie `.env.production` ao GitHub por engano).

```text
VITE_SITE_URL=https://seu-dominio.com.br
```

O arquivo do currículo, quando disponível, deve ser colocado em `public/curriculo-pedro-albuquerque.pdf`. Até lá, o site informa que o download ainda não foi disponibilizado.

## Critérios desta edição

A identidade visual segue composição editorial, branco e preto como base e azul como cor de acento. O EduComp aparece como projeto concluído, com as fases de produto, UX/UI, desenvolvimento e QA. O ensaio em destaque é publicado na íntegra, com foto de capa e data de 12/11/2026.

Nenhum arquivo `.git`, backup local ou dependência instalada faz parte do pacote de entrega.
