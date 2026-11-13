# Portfólio — Pedro Albuquerque

Um espaço para reunir projetos, experiências e reflexões sobre ensino de Computação, desenvolvimento de software, UX/UI, qualidade e jogos sérios.

O site combina uma página de apresentação, um estudo de caso do **EduComp** e uma área de textos autorais chamada **Fragmentos**. A linguagem visual é editorial: tipografia expressiva, fotografia em preto e branco, espaço para leitura e azul como cor de destaque.

## O que você encontra

| Área | Conteúdo |
| --- | --- |
| Início | Apresentação, colagem visual e acesso aos projetos e ao currículo |
| Projetos | EduComp em destaque e espaços editoriais para outras publicações |
| Áreas | Ensino de Computação, QA e testes, UX/UI, desenvolvimento e jogos sérios |
| Tecnologias | Faixa com as 15 ferramentas e linguagens presentes no portfólio |
| Fragmentos | Ensaio *A potência do fazer digital na educação*, com leitura integral |
| Sobre mim | Trajetória, texto de apresentação, galeria de oito fotografias e contato |

**Páginas:** `/`, `/projetos/educomp` e `/fragmentos/a-potencia-do-fazer-digital-na-educacao`.

## Tecnologias

React 19, TypeScript, Vite 6 e CSS. O site é estático, com navegação gerenciada no cliente, sem backend, banco de dados ou autenticação. Os textos e as informações das seções são mantidos no próprio repositório.

O protótipo visual foi desenvolvido no [Figma](https://www.figma.com/design/Cv3t12N25QRmqZzPKko0L1/Portf%C3%B3lio?node-id=325-64). A implementação incorpora ajustes de responsividade, navegação e acabamento feitos durante o desenvolvimento.

## Executar localmente

Requisitos: Node.js 22 e npm.

```bash
npm ci
npm run dev
```

O Vite informa o endereço local no terminal. Para gerar e visualizar a versão de produção:

```bash
npm run build
npm run preview
```

No PowerShell do Windows, utilize `npm.cmd` caso a política de execução bloqueie o comando `npm`.

## Qualidade

```bash
npm run verify
```

O comando executa as verificações de estrutura e conteúdo, recursos utilizados, links da documentação, TypeScript e build de produção. A mesma rotina é executada no GitHub Actions a cada push ou pull request para `main`.

Para testes de interação, acessibilidade e diferentes larguras de tela, consulte o [plano de testes](docs/qa/plano-de-testes.md).

## Organização

```text
src/
  components/       Componentes de navegação e projetos
  content/          Conteúdo integral do ensaio
  pages/            Estudo de caso e página do ensaio
  App.tsx           Página principal e interações compartilhadas
  *.css             Estilos e ajustes responsivos
public/
  assets/           Fotografias, ilustrações e ícones utilizados
scripts/            Verificações e geração dos metadados
site-meta.json      Metadados das três páginas
docs/               Produto, experiência, arquitetura e QA
.github/workflows/  Integração contínua
```

## Publicação

O build é gerado em `dist/`. Cada rota recebe seu próprio `index.html`, além dos recursos estáticos. A hospedagem deve servir os caminhos publicados corretamente.

Defina `VITE_SITE_URL` com o domínio público, sem barra final, para gerar URLs canônicas e sitemap absoluto. O arquivo `.env.example` mostra o formato. Arquivos `.env` locais não devem ser versionados.

```text
VITE_SITE_URL=https://seu-dominio.com.br
```

O botão **Currículo** procura `public/curriculo-pedro-albuquerque.pdf` e mostra um aviso caso o arquivo não esteja disponível. Nenhum PDF é incluído artificialmente nesta entrega.

## Documentação

- [Produto e decisões](docs/product/product-brief.md)
- [Escopo funcional](docs/product/escopo.md)
- [Arquitetura da informação](docs/ux-ui/arquitetura-da-informacao.md)
- [Design system](docs/ux-ui/design-system.md)
- [Handoff do Figma para o código](docs/ux-ui/handoff.md)
- [Arquitetura técnica](docs/technical/arquitetura.md)
- [Recursos visuais](docs/technical/recursos.md)
- [Plano de testes](docs/qa/plano-de-testes.md)
- [Verificações e limites da auditoria](docs/qa/relatorio-de-verificacao.md)
