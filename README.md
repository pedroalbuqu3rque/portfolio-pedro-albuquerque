# Portfólio — Pedro Albuquerque

Portfólio pessoal desenvolvido para reunir projetos, experiências e produções autorais nas áreas de Ensino de Computação, Desenvolvimento de Software, UX/UI, Qualidade de Software e Jogos Sérios.

O projeto foi concebido com uma abordagem visual editorial, combinando tipografia expressiva, fotografias em preto e branco, espaços de respiro e elementos em azul. A proposta é apresentar trabalhos e experiências de maneira clara, acessível e organizada.

## Sobre o projeto

O portfólio reúne minha trajetória acadêmica e profissional, projetos desenvolvidos e reflexões sobre educação e tecnologia.

A interface está organizada em cinco seções principais:

- **Início:** apresentação pessoal e acesso aos conteúdos do portfólio.
- **Projetos:** trabalhos desenvolvidos, incluindo o estudo de caso do EduComp, com apresentação das etapas de produto, UX/UI, desenvolvimento e QA.
- **Áreas:** campos de atuação e tecnologias utilizadas.
- **Fragmentos:** espaço dedicado a ensaios, reflexões e produções autorais.
- **Sobre mim:** trajetória acadêmica e profissional, galeria de fotografias e informações de contato.

Além da página principal, o projeto possui páginas dedicadas ao estudo de caso do EduComp e à leitura integral do ensaio *A potência do fazer digital na educação*.

## Tecnologias

O portfólio foi desenvolvido com:

- **React 19** — construção da interface e organização dos componentes.
- **TypeScript** — tipagem e manutenção do código.
- **Vite 6** — ambiente de desenvolvimento e geração do build.
- **CSS** — identidade visual, layouts responsivos e interações.

A aplicação possui arquitetura estática, com navegação gerenciada no cliente, conteúdo local e recursos visuais organizados no repositório.

O projeto visual foi desenvolvido no [Figma](https://www.figma.com/design/Cv3t12N25QRmqZzPKko0L1/Portf%C3%B3lio?node-id=325-64).

## Interface e experiência

O desenvolvimento considerou quatro aspectos principais:

- **Identidade visual:** composição editorial, hierarquia tipográfica e uso consistente de cores e elementos gráficos.
- **Responsividade:** adaptação dos layouts para diferentes tamanhos de tela.
- **Acessibilidade:** navegação por teclado, indicadores de foco, elementos semânticos e respeito às preferências de movimento reduzido.
- **Navegação:** organização das informações e transições entre a página principal e os conteúdos internos.

## Executando localmente

**Pré-requisitos:** Node.js 22 e npm.

Clone o repositório:

```bash
git clone https://github.com/pedroalbuqu3rque/portfolio-pedro-albuquerque.git
cd portfolio-pedro-albuquerque
```

Instale as dependências e inicie o ambiente de desenvolvimento:

```bash
npm ci
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

## Qualidade e validação

O projeto possui verificações automatizadas de conteúdo, integridade dos recursos, documentação, TypeScript e compilação.

Para executar todas as verificações:

```bash
npm run verify
```

A mesma rotina é utilizada no GitHub Actions para validar alterações enviadas ao repositório.

## Estrutura do projeto

```text
portfolio/
├── .github/       # Integração contínua
├── docs/          # Documentação do projeto
├── public/        # Fotografias, ícones e recursos visuais
├── scripts/       # Scripts de verificação e geração
├── src/
│   ├── components/
│   ├── content/
│   ├── pages/
│   └── App.tsx
├── index.html
├── package.json
├── site-meta.json
├── tsconfig.json
└── vite.config.ts
```

## Documentação

A documentação está organizada por área, reunindo as decisões e os registros do processo de desenvolvimento.

**Produto**
- [Visão do produto](docs/product/product-brief.md)
- [Escopo funcional](docs/product/escopo.md)

**UX/UI**
- [Objetivos de experiência](docs/ux-ui/objetivos-de-ux.md)
- [Arquitetura da informação](docs/ux-ui/arquitetura-da-informacao.md)
- [Design system](docs/ux-ui/design-system.md)
- [Handoff de interface](docs/ux-ui/handoff.md)

**Desenvolvimento**
- [Arquitetura técnica](docs/technical/arquitetura.md)
- [Recursos visuais](docs/technical/recursos.md)

**Qualidade**
- [Plano de testes](docs/qa/plano-de-testes.md)
- [Relatório de verificação](docs/qa/relatorio-de-verificacao.md)
