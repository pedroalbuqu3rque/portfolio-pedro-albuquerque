# Handoff

Este documento relaciona as telas do Figma à implementação atual. Serve como referência de continuidade, não como declaração de que todos os testes já foram aprovados.

## Telas

| Tela | Referência | Código |
| --- | --- | --- |
| Landing — 1440 × 5039 px | [Figma](https://www.figma.com/design/Cv3t12N25QRmqZzPKko0L1/Portf%C3%B3lio?node-id=325-64) | `src/App.tsx` |
| EduComp — 1440 × 5227 px | [Figma](https://www.figma.com/design/Cv3t12N25QRmqZzPKko0L1/Portf%C3%B3lio?node-id=399-14) | `src/pages/EduCompPage.tsx` |
| Fragmentos — 1440 × 3787 px | [Figma](https://www.figma.com/design/Cv3t12N25QRmqZzPKko0L1/Portf%C3%B3lio?node-id=456-2459) | `src/pages/FragmentosPage.tsx` |

As alturas representam o protótipo desktop. No navegador, variam conforme fonte, conteúdo e largura.

## Estrutura atual

A landing reúne Início, Projetos, Áreas, tecnologias, Fragmentos e Sobre mim (com trajetória e galeria), seguida do contato. O cabeçalho continua visível durante a rolagem.

**Projetos:** a seção é vertical. O EduComp aparece primeiro, com uma área de imagem acima do texto; dois espaços reservados aparecem abaixo, um por linha. Os cards reservados não são interativos. A página interna do EduComp apresenta o caso, quatro espaços para futuras capturas, três fluxos e as fases PO, UX/UI Design, Desenvolvimento e QA. O projeto é apresentado como concluído.

**Fragmentos:** há um ensaio principal com data de publicação, índice de leitura, botão de compartilhar e retorno à seção. As publicações seguintes ainda são reservas de conteúdo. O carrossel horizontal permanece nessa área.

**Sobre mim:** a coluna esquerda reúne apresentação, trajetória horizontal de 12 marcos e texto; a direita contém a galeria de oito fotos 4:3, que podem ser ampliadas. Em telas menores, os blocos passam a ficar empilhados.

O contato abre um modal com e-mail, LinkedIn e GitHub. O currículo só é oferecido para download quando o PDF existe; caso contrário, a interface informa a ausência do arquivo.

## Antes da publicação

- Adicionar `public/curriculo-pedro-albuquerque.pdf`.
- Substituir os quatro espaços da galeria EduComp por capturas reais quando estiverem disponíveis.
- Conferir a imagem editorial do ensaio com a versão do Figma.
- Validar os destinos de redes sociais e do protótipo.
- Executar `npm ci`, `npm run check:content`, `npm run typecheck` e `npm run build` em uma instalação limpa.
- Conferir desktop e mobile, acessibilidade básica, navegação direta nas rotas e metadados no domínio definitivo.

## Continuidade

O Figma registra a direção visual, enquanto os componentes e estilos atuais definem o comportamento implementado. A seção Projetos está em `src/components/ProjectsSection.tsx` e `src/projects.css`, sem dependência do carrossel geral.

Para verificações funcionais, consultar o [plano de testes](../qa/plano-de-testes.md). Para dependências e rotas, consultar a [arquitetura técnica](../technical/arquitetura.md).
