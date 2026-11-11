# Handoff

Este documento relaciona as telas do Figma à implementação atual. Serve como referência de continuidade, não como declaração de que todos os testes já foram aprovados.

## Telas

| Tela | Referência | Código |
| --- | --- | --- |
| Landing — 1440 × 5039 px | [Figma](https://www.figma.com/design/Cv3t12N25QRmqZzPKko0L1/Portf%C3%B3lio?node-id=325-64) | `src/App.tsx` |
| EduComp — 1440 × 5227 px | [Figma](https://www.figma.com/design/Cv3t12N25QRmqZzPKko0L1/Portf%C3%B3lio?node-id=399-14) | `src/pages/EduCompPage.tsx` |
| Fragmentos — 1440 × 3787 px | [Figma](https://www.figma.com/design/Cv3t12N25QRmqZzPKko0L1/Portf%C3%B3lio?node-id=456-2459) | `src/pages/FragmentosPage.tsx` |

As alturas representam o protótipo desktop. No navegador, variam conforme fonte, conteúdo e largura.

## Pontos implementados

A landing contém apresentação, projetos, áreas, tecnologias, Fragmentos, trajetória, Sobre mim e contato. Os cards usam navegação horizontal quando necessário, com controles acessíveis.

O EduComp apresenta o contexto do projeto, quatro espaços reservados para capturas, três fluxos e decisões de UX. A página de Fragmentos tem estrutura editorial para leitura, índice e outras publicações.

O modal de contato reúne e-mail, LinkedIn e GitHub. O rodapé usa **“Feito aqui. Por mim”**. A linha do tempo tem rolagem horizontal sem grupos por ano; a seção Sobre mim apresenta um texto pessoal e a linha do tempo. A galeria integra a coluna direita do Sobre mim e reúne oito fotografias reais em preto e branco, em proporção 4:3, com ampliação e cantos arredondados.

## Materiais pendentes

| Item | Situação |
| --- | --- |
| Currículo | Adicionar `public/curriculo-pedro-albuquerque.pdf` |
| Galeria EduComp | Substituir quatro espaços por capturas reais |
| Imagem do ensaio | Exportar a fotografia do Figma, sem alterar a composição |
| Projetos e ensaios demonstrativos | Decidir o conteúdo que será publicado |
| Links externos | Conferir destinos sociais e protótipo |
| Publicação | Configurar domínio, SEO e testes no endereço definitivo |

Não substituir imagens por referências diferentes apenas para preencher os espaços.

## Observações para desenvolvimento

O código é a referência para as interações mais recentes, especialmente a composição mobile e o modal de contato. O Figma continua útil para verificar identidade, proporção e hierarquia do desktop.

Antes de publicar, executar os passos do [plano de testes](../qa/plano-de-testes.md). A organização técnica está em [arquitetura](../technical/arquitetura.md).

## Ajustes recentes da landing (v0.15)

- A abertura e Projetos mantêm uma transição editorial discreta.
- A faixa preta de tecnologias foi posicionada com espaçamento visual equilibrado entre Áreas e Fragmentos.
- A linha do tempo foi integrada ao Sobre mim, abaixo do nome, em uma só linha horizontal de 12 marcos. A seção de Trajetória independente foi eliminada.
- A foto de destaque isolada abaixo do nome foi removida. A galeria de oito fotos em 4:3 fica em uma seção própria, sem legendas ou botões sobre as imagens.
- A abertura exibe **Ver projetos** e **Currículo**. O download do PDF continua pendente de inclusão.

## Revisão 0.18

- Os 12 marcos da Trajetória usam períodos, nomes de cargos e instituições revisados pelo autor, incluindo atividades atuais, sem numerção.
- As tags de Áreas estão um pouco maiores e o hover amplia discretamente o card; em movimento reduzido, esse efeito fica desativado.
- A galeria independente permanece sem legendas e sem frase de encerramento.

- O fundo da seção Áreas acompanha o branco da landing, e as tags Game Design e Imersão aparecem na mesma linha no card Jogos Sérios.

## Composição do Sobre mim (v0.20)

No desktop, a coluna esquerda apresenta nome, linha do tempo horizontal e texto. A coluna direita apresenta o título “Fora da tela, também tem história.” e uma fotografia por vez, em 4:3. A galeria usa controles discretos abaixo da foto, suporta arrastar e toque e permite ampliação em modal. Não há legendas visuais. Em telas menores, a galeria fica após o texto.
