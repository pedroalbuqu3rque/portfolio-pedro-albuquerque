# Portfólio — Pedro Albuquerque

Este repositório reúne o código do meu portfólio pessoal. O site apresenta projetos, áreas de atuação, trajetória e um espaço de escrita chamado **Fragmentos**.

A interface foi desenhada no Figma e desenvolvida com React, TypeScript e CSS. A linguagem visual é editorial, com preto e branco como base e azul nos pontos de destaque. A intenção é apresentar os trabalhos e as ideias por trás deles sem transformar a página em uma lista de tecnologias.

## Páginas

| Página | O que apresenta |
| --- | --- |
| **Início** | Projetos, áreas de atuação, tecnologias, Fragmentos, trajetória e contato |
| **EduComp** | Estudo de caso de uma biblioteca colaborativa de materiais didáticos de Computação |
| **Fragmentos** | Modelo de leitura para notas, ensaios e ideias |

O site já conta com navegação entre páginas, carrosséis horizontais, uma linha do tempo horizontal por marcos individuais, uma galeria pessoal com oito fotografias autorais e animações discretas e um modal de contato. Alguns projetos e textos ainda são demonstrativos.

## Tecnologias

React 19 · TypeScript · Vite 6 · CSS

Nesta versão, o portfólio é estático: não precisa de servidor de aplicação, banco de dados ou sistema de gerenciamento de conteúdo.

## Executar o projeto

Com Node.js e npm instalados:

```bash
npm install
npm run dev
```

O Vite mostra o endereço local no terminal, normalmente `http://localhost:5173`.

Para validar o projeto antes de publicar:

```bash
npm run check:content
npm run typecheck
npm run build
npm run preview
```

No PowerShell, caso a execução de `npm.ps1` esteja bloqueada, substitua `npm` por `npm.cmd`.

## Organização do repositório

```text
portfolio-pedro/
├── public/                 Imagens, ícones e arquivos públicos
├── src/
│   ├── components/         Elementos reutilizáveis
│   ├── pages/              EduComp e Fragmentos
│   ├── App.tsx             Landing e navegação
│   ├── styles.css          Estilos da página inicial
│   ├── internal-pages.css  Estilos das páginas internas
│   ├── editorial.css       Ajustes de tipografia e responsividade
│   ├── landing-refinement.css  Revisão de projetos, áreas e trajetória
│   ├── gallery-timeline-polish.css  Ajustes de navegação, trajetória e galeria
│   └── seo.ts              Metadados durante a navegação
├── scripts/                Verificação de conteúdo e geração de SEO
├── docs/
│   ├── product/            Proposta e escopo
│   ├── ux-ui/              Arquitetura da informação e design
│   ├── technical/          Implementação e publicação
│   └── qa/                 Plano de testes
└── site-meta.json          Títulos e descrições das páginas
```

## Documentação

A organização segue o mesmo padrão de pastas usado no EduComp, com a quantidade de documentos ajustada ao tamanho deste projeto.

**Produto**
- [Product brief](docs/product/product-brief.md)
- [Escopo da primeira versão](docs/product/escopo-mvp.md)

**UX/UI**
- [Arquitetura da informação](docs/ux-ui/arquitetura-da-informacao.md)
- [Objetivos de UX](docs/ux-ui/objetivos-de-ux.md)
- [Design system](docs/ux-ui/design-system.md)
- [Handoff](docs/ux-ui/handoff.md)

**Desenvolvimento e qualidade**
- [Arquitetura técnica](docs/technical/arquitetura.md)
- [Plano de testes](docs/qa/plano-de-testes.md)

## Estado atual

As três páginas estão implementadas, mas ainda faltam alguns materiais: o currículo em PDF, as quatro capturas reais do EduComp, a fotografia definitiva do ensaio e a revisão dos links sociais. Os testes de compilação e publicação precisam ser concluídos no ambiente em que o site será hospedado.

O [Figma do portfólio](https://www.figma.com/design/Cv3t12N25QRmqZzPKko0L1/Portf%C3%B3lio?node-id=325-64) é a referência visual original. Os últimos ajustes de responsividade e interação foram feitos no código.


## Elementos visuais

Os ícones de tecnologias, áreas e contato ficam em `public/assets/visuais/`, todos em PNG transparente de 256 × 256 px e com centralização padronizada. A faixa de tecnologias mostra 15 itens, na ordem selecionada para o portfólio.

**Atualização:** o logotipo correto de C# está em `stack/csharp.png`; o ícone de e-mail também foi substituído em `contato/email.png`.

**Revisão da landing:** o EduComp ganhou uma prévia ilustrativa da biblioteca, as áreas de atuação usam descrições e tags revisadas e a trajetória exibe marcos individuais de 2026 a 2023 em rolagem horizontal. A prévia do card não substitui uma captura real da plataforma.

**Refinamento:** os ícones das áreas estão maiores e as tags e o traço azul ficam próximos das descrições. A navegação foi reduzida e a palavra “aqui.” usa o azul principal. A galeria editorial reúne fotografias pessoais em preto e branco.

**Galeria fotográfica:** as oito imagens autorais foram integradas ao Sobre mim, em proporção 4:3, com bordas arredondadas e visualização ampliada ao clicar. As legendas visuais foram retiradas, preservando os textos alternativos para acessibilidade. A correspondência entre os originais e os arquivos otimizados está documentada em [`public/assets/galeria/README.md`](public/assets/galeria/README.md).

**Composição da landing:** o botão de currículo aparece como **Currículo**. A abertura e Projetos são separados por um traço discreto, sem vão artificial. A faixa preta de tecnologias tem respiro equivalente em relação às seções de Áreas e Fragmentos. Os cards mantêm tags e filetes azuis alinhados.

**Sobre mim e Trajetória:** o texto pessoal e a linha do tempo dividem a mesma composição de duas colunas no desktop. Os 12 marcos aparecem abaixo do nome, em uma linha horizontal com controles e rolagem por toque ou teclado. Não há mais uma seção isolada de Trajetória ou fotografia avulsa abaixo do título. A galeria de oito fotos em preto e branco ocupa a coluna direita do Sobre mim, com uma fotografia por vez, em 4:3 e com cantos arredondados.

**Ajustes da versão 0.16 (histórico):** a abertura tinha apenas o botão de currículo, que fica azul ao passar o mouse. O botão de currículo no contato traz uma seta para baixo. A linha do tempo preserva os marcos e a navegação horizontal, sem título visível ou numeração. A apresentação pessoal destaca em negrito as áreas selecionadas, e a galeria passa a ser uma seção independente, sem legendas nas fotos ou na visualização ampliada.

**Versão 0.17 — abertura em tela cheia.** A seção inicial agora ocupa toda a primeira dobra nos monitores desktop, descontando a altura da navegação, para que o título **Projetos** só apareça depois da rolagem. A colagem e o texto ficam centralizados verticalmente nesse espaço. Em telas pequenas, a altura mínima respeita a área disponível, sem cortar o conteúdo ou obrigar a imagem a caber onde não há espaço. O divisor editorial azul permanece ao final da abertura.

**Versão 0.18:** o botão azul **Ver projetos** voltou para a abertura ao lado de **Currículo**. Os 12 pontos da linha do tempo usam os períodos, cargos e instituições fornecidos pelo autor. As tags dos cards de Áreas foram levemente ampliadas; em dispositivos com mouse, os cards ganham relevo e escala discreta ao passar o cursor, sem mudar sua função informativa. A galeria permanece sem legendas individuais.

**Versão 0.19:** o fundo de Áreas foi igualado ao branco da landing (`#FFFFFF`), a largura das tags de Jogos Sérios foi liberada para manter Game Design e Imersão na mesma linha, o Estágio em Geoprocessamento foi corrigido para jan/2024 a jun/2024, e a frase de encerramento abaixo da galeria foi removida.

**Versão 0.20:** a seção Sobre mim reúne em uma única composição editorial o nome, a trajetória horizontal e o texto pessoal na coluna esquerda; a galeria ocupa a coluna direita, com uma foto 4:3 por vez, navegação lateral e ampliação em modal. Em tablet e celular, o conteúdo é empilhado sem perder a ordem de leitura.

**Versão 0.21:** apresentação pessoal resumida em dois parágrafos, com destaque apenas para as três experiências indicadas. A trajetória mostra dois marcos completos por vez no desktop e usa uma altura mais compacta para aproximar o texto. O título da galeria passa a ocupar uma linha no desktop. Divisórias finas com um pequeno detalhe azul separam os blocos principais da landing, respeitando o padrão estabelecido na abertura.
