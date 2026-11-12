# Arquitetura técnica

## Visão geral

O portfólio utiliza React 19, TypeScript, Vite 6 e CSS. É uma aplicação estática, sem backend ou banco de dados. Os conteúdos desta versão estão definidos no próprio código. O ensaio está separado em `src/content/ensaio-fazer-digital.ts`.

## Organização do código

- `src/App.tsx`: landing, cabeçalho, carrosséis de Fragmentos, trajetória e galeria, modais e dados das seções.
- `src/pages/EduCompPage.tsx`: estudo de caso EduComp.
- `src/pages/FragmentosPage.tsx`: página do ensaio.
- `src/components/ProjectsSection.tsx`: cards verticais de projetos, separados dos carrosséis.
- `src/components/`: componentes da landing.
- `src/projects.css`: composição e responsividade exclusivas da seção Projetos.
- `src/finishing-touches.css`: acabamento editorial de Fragmentos e Sobre mim.
- `src/navigation.ts`: preserva clique modificado e abertura em nova aba nos links internos.
- `src/styles.css`: estilos principais.
- `src/internal-pages.css`: estilos das páginas internas.
- `src/editorial.css`: ajustes de tipografia, composição e responsividade.
- `src/gallery-timeline-polish.css`: barra de navegação, pontos da trajetória e galeria de fotografias.
- `src/seo.ts`: atualização de metadados durante a navegação.
- `public/`: imagens e arquivos servidos diretamente.
- `scripts/`: verificações e geração dos documentos de SEO.

## Rotas

| Caminho | Página |
| --- | --- |
| `/` | Landing |
| `/projetos/educomp` | EduComp |
| `/fragmentos/a-potencia-do-fazer-digital-na-educacao` | Ensaio publicado |

A navegação usa a History API do navegador, controlada pelo React, sem biblioteca de roteamento.

O build prepara documentos de entrada para as rotas atuais, mas as URLs diretas ainda precisam ser conferidas na hospedagem escolhida.

## Conteúdo e assets

Os textos dos cards, os marcos individuais da linha do tempo, a lista de fotografias, as áreas e os links de contato estão em `src/App.tsx`. As oito fotografias otimizadas do Sobre mim estão em `public/assets/galeria` e são vinculadas pela constante `GALLERY_PHOTOS`. A colagem do hero está em `public/assets/hero-collage.webp`. A imagem do ensaio está em `public/assets/fragmentos/fazer-digital.webp`.

O currículo deve ser colocado em:

```text
public/curriculo-pedro-albuquerque.pdf
```

Na ausência do arquivo, o botão informa que o download não está disponível.

## SEO

O arquivo `site-meta.json` define título, descrição e indexação por rota. O script `scripts/generate-seo.mjs` gera os metadados do build e o sitemap quando a URL pública está configurada.

Após definir o domínio, configure `VITE_SITE_URL` em `.env.production`, sem barra final. As três rotas atuais estão configuradas para indexação. Antes de publicar, conferir se cada texto e metadado está pronto para divulgação.

## Comandos

```bash
npm ci
npm run dev
npm run check:content
npm run typecheck
npm run build
npm run preview
```

`check:content` é uma verificação estrutural. Não substitui testes no navegador.

Consulte [Recursos visuais](recursos.md) para detalhes dos arquivos utilizados.

## Limites da versão atual

Não existe CMS, sistema de autenticação, envio de mensagens por servidor ou persistência de dados. Novas páginas precisam ser adicionadas ao código e às regras de navegação.
