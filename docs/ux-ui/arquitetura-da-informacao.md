# Arquitetura da informação

O portfólio tem uma página principal e duas páginas internas. A navegação global sempre permite voltar às seções da landing.

## Mapa do site

```text
Portfólio (/)
├── Início
├── Projetos
│   └── EduComp (/projetos/educomp)
├── Áreas de atuação
├── Tecnologias
├── Fragmentos
│   └── Ensaio (/fragmentos/a-potencia-do-fazer-digital-na-educacao)
├── Sobre mim
│   ├── Trajetória em linha horizontal
│   └── Galeria pessoal em preto e branco
└── Contato (modal)
    ├── E-mail
    ├── LinkedIn
    └── GitHub
```

O menu visível utiliza **Início, Projetos, Áreas, Fragmentos e Sobre mim**. Tecnologias, Trajetória e Contato fazem parte da landing, mas não precisam ocupar uma posição própria no menu.

## Caminhos principais

**Conhecer um projeto:** Início → Projetos → card EduComp → estudo de caso → protótipo externo ou retorno à landing.

**Ler um ensaio:** Início → Fragmentos → ensaio em destaque → índice do texto → leituras relacionadas ou retorno a Fragmentos.

**Entrar em contato:** botão Entrar em contato → modal → e-mail, LinkedIn ou GitHub.

**Baixar o currículo:** botão dedicado → PDF, se disponível; caso contrário, aviso de indisponibilidade.

## Comportamentos

As páginas internas reutilizam o cabeçalho. Seus links retornam à landing e posicionam a pessoa na seção correspondente.

Os carrosséis de projetos e publicações revelam conteúdo adicional na horizontal. A trajetória usa uma única linha horizontal, com um ponto por experiência, sem agrupamento em anos. A galeria pessoal integra o Sobre mim, percorre oito fotografias em formato 4:3 e permite ampliá-las. No desktop, há controles discretos; em telas sensíveis ao toque, é possível deslizar. Os controles não devem depender exclusivamente do mouse.

A estrutura não exige autenticação, busca interna nem filtros na primeira versão.

## Referências

- [Objetivos de UX](objetivos-de-ux.md)
- [Handoff](handoff.md)
