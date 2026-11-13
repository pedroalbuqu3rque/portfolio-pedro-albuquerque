# Escopo funcional

O portfólio é uma aplicação estática com uma página inicial e duas páginas internas. As seções da landing compartilham navegação, tipografia e identidade visual.

## Página inicial

| Seção | Comportamento |
| --- | --- |
| Apresentação | Headline, colagem visual, botão para Projetos, botão Currículo e links sociais |
| Projetos | EduComp como primeiro destaque; segundo espaço editorial ao lado; dois cards compactos abaixo |
| Áreas | Cinco áreas com ícones, descrições e tags informativas |
| Tecnologias | Faixa horizontal com 15 marcas e nomes, respeitando movimento reduzido |
| Fragmentos | Ensaio em destaque e três espaços de publicação em navegação horizontal |
| Sobre mim | Texto, trajetória em linha do tempo e galeria de oito fotografias |
| Contato | Modal com e-mail, LinkedIn e GitHub |

Os cards reservados em Projetos e Fragmentos não direcionam a páginas inexistentes.

## EduComp

Página de estudo de caso com contexto, público, desafio, três fluxos de uso, quatro composições editoriais e as fases de produto (PO), UX/UI Design, desenvolvimento e QA. O acesso ao protótipo é um link externo para o Figma.

## Ensaio

*A potência do fazer digital na educação* apresenta título, subtítulo, autoria, data de publicação, fotografia, apresentação lateral, navegação entre seis seções, texto integral, compartilhamento e retorno à landing. Os espaços de outras leituras são informativos.

## Navegação

A History API mantém a navegação entre as três rotas. O cabeçalho retorna às seções da página inicial. Links internos respeitam Ctrl/Cmd+clique e abertura em nova aba. Galeria, menus, modais e controles de rolagem possuem tratamento para teclado.

## Dependências de conteúdo

- O currículo é servido apenas quando o PDF existe no caminho esperado.
- As quatro áreas visuais do EduComp são composições tipográficas, não capturas reais da plataforma.
- A geração de URLs canônicas e sitemap absoluto depende de `VITE_SITE_URL` no ambiente de publicação.

Não há necessidade de autenticação, API, banco de dados ou gestão de conteúdo por terceiros para o funcionamento atual.

## Referências

- [Produto e decisões](product-brief.md)
- [Arquitetura técnica](../technical/arquitetura.md)
