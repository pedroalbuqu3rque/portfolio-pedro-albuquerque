# Design system

## Direção visual

O portfólio usa linguagem editorial: tipografia forte, contraste, espaços amplos e imagens que ajudam a contar a história dos projetos. Preto e branco organizam a composição; o azul aparece em ações, marcações e detalhes.

A referência original está no [Figma](https://www.figma.com/design/Cv3t12N25QRmqZzPKko0L1/Portf%C3%B3lio?node-id=325-64). Parte dos refinamentos posteriores, principalmente no mobile, foi feita diretamente no CSS.

## Cores

| Uso | Referência |
| --- | --- |
| Fundo claro | `#FFFFFF` |
| Texto e superfícies escuras | `#0E0E0E` |
| Azul principal | `#054FFF` |
| Tons auxiliares | Cinzas claros para superfícies, divisórias e textos secundários |

Os arquivos CSS são a referência para os valores efetivamente usados na implementação.

## Tipografia

A família principal é **Archivo**, com pesos diferentes para títulos, navegação, descrições e detalhes editoriais. Os títulos usam quebras intencionais, mas precisam se adaptar quando a largura muda.

A hierarquia deve diferenciar títulos de seção, subtítulos, textos de apoio, metadados e links sem depender apenas da cor.

## Composição e componentes

A referência desktop do Figma tem 1440 px de largura, com margens laterais próximas de 64 px. No código, o conteúdo usa limites e regras responsivas, não uma tela de tamanho fixo.

Componentes recorrentes:

- Cabeçalho fixo e navegação global.
- Botões principais azuis, secundários com contorno e links textuais.
- Cards de projeto e publicação.
- Cards de áreas de atuação, com ícones e tags.
- Carrosséis com chevrons minimalistas e progresso discreto.
- Modal de contato.
- Rodapé com a assinatura **“Feito aqui. Por mim”**.

## Estados e movimento

Os cards de áreas têm hover sutil, mas não são links. Botões e cards clicáveis devem mostrar estados de hover e foco; os movimentos devem ser reduzidos para visitantes que optaram por isso.

A faixa de tecnologias pode se mover continuamente, desde que permaneça legível e respeite a preferência por movimento reduzido.

## Responsividade

A versão mobile tem composição própria. Na abertura, apresentação e ações vêm antes da colagem; cards passam a ocupar menos colunas; páginas internas priorizam largura de leitura e respiro entre blocos.

## Referências

- [Arquitetura da informação](arquitetura-da-informacao.md)
- [Handoff](handoff.md)
