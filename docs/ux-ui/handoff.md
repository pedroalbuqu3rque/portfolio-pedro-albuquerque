# Handoff — Figma e implementação

Este documento relaciona as referências de interface ao código. O Figma orientou a linguagem visual; os arquivos da aplicação descrevem o comportamento efetivamente entregue.

## Páginas

| Página | Referência | Implementação |
| --- | --- | --- |
| Landing | [Figma](https://www.figma.com/design/Cv3t12N25QRmqZzPKko0L1/Portf%C3%B3lio?node-id=325-64) | `src/App.tsx` |
| EduComp | [Figma](https://www.figma.com/design/Cv3t12N25QRmqZzPKko0L1/Portf%C3%B3lio?node-id=399-14) | `src/pages/EduCompPage.tsx` |
| Fragmentos | [Figma](https://www.figma.com/design/Cv3t12N25QRmqZzPKko0L1/Portf%C3%B3lio?node-id=456-2459) | `src/pages/FragmentosPage.tsx` |

As dimensões do protótipo não são reproduzidas como telas fixas. A largura de conteúdo e os pontos de quebra são definidos por CSS.

## Correspondência dos elementos

**Início.** A composição reúne headline, colagem pessoal, acessos a Projetos e Currículo e ícones de contato. Os estados de foco, hover e a composição mobile estão no CSS.

**Projetos.** O EduComp ocupa o primeiro dos dois destaques superiores. O segundo espaço é editorial e não interativo. Dois cards compactos permanecem abaixo em lista vertical. Essa composição está em `src/components/ProjectsSection.tsx` e `src/projects.css`.

**EduComp.** O estudo de caso apresenta contexto, desafio, três percursos e as fases de PO, UX/UI, desenvolvimento e QA. A capa do card usa a imagem da página inicial, enquanto a galeria e os percursos usam capturas reais da plataforma. As ações externas levam à aplicação publicada e ao repositório no GitHub.

**Fragmentos.** A capa usa a fotografia autoral, seguida da rota do ensaio. A página interna dispõe a imagem e uma apresentação editorial lado a lado no desktop, sem filete azul entre elas. O texto aparece integralmente em seis partes, com índice, progresso de leitura, compartilhamento e retorno.

**Sobre mim.** A trajetória acompanha o texto na coluna de conteúdo; a galeria utiliza nove imagens em proporção 4:3. As fotografias podem ser percorridas e ampliadas. Na versão mobile, os blocos ficam empilhados.

**Contato.** O modal reúne e-mail, LinkedIn e GitHub. A ação do currículo verifica a presença do PDF antes de tentar o download.

## Pontos de manutenção

Mudanças em cards ou textos da landing partem de `src/App.tsx` e `src/components/ProjectsSection.tsx`. O ensaio fica em `src/content/ensaio-fazer-digital.ts`; sua apresentação fica em `src/pages/FragmentosPage.tsx`. Mudanças de endereço ou descrição de páginas também precisam ser refletidas em `site-meta.json`.

As imagens servidas diretamente estão em `public/assets/`. Não há dependência de CMS ou de recursos remotos além da fonte tipográfica externa e dos destinos de links.

## Referências

- [Design system](design-system.md)
- [Arquitetura técnica](../technical/arquitetura.md)
- [Plano de testes](../qa/plano-de-testes.md)
