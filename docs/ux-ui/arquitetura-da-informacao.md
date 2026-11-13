# Arquitetura da informação

O site parte de uma página principal e aprofunda dois conteúdos em páginas próprias. O menu mantém cinco pontos de acesso; tecnologias, trajetória, galeria e contato integram as seções sem aumentar a navegação global.

## Mapa do site

```text
Portfólio (/)
├── Início
├── Projetos
│   └── EduComp (/projetos/educomp)
├── Áreas
│   └── Tecnologias
├── Fragmentos
│   └── A potência do fazer digital na educação
│       (/fragmentos/a-potencia-do-fazer-digital-na-educacao)
├── Sobre mim
│   ├── Trajetória
│   └── Galeria de fotografias
└── Contato (modal)
    ├── E-mail
    ├── LinkedIn
    └── GitHub
```

## Percursos de leitura

**Projeto:** início → Projetos → EduComp → contexto, fluxos e processo → plataforma publicada, código no GitHub ou retorno a Projetos.

**Ensaio:** início → Fragmentos → ensaio → índice de seis seções → compartilhar ou retornar a Fragmentos.

**Apresentação pessoal:** início → Áreas → tecnologias → Sobre mim → trajetória, fotografias e canais de contato.

## Comportamentos

O cabeçalho acompanha a navegação e indica a seção ativa. Os links internos preservam o comportamento nativo do navegador para abertura em nova aba. No mobile, o menu se adapta à largura e pode ser fechado por teclado.

A seção Projetos tem dois espaços de destaque lado a lado no desktop e dois cards compactos abaixo. Em telas estreitas, a composição se reorganiza em uma coluna. Apenas o EduComp possui navegação interna.

Fragmentos apresenta um ensaio com rota própria, e os demais cards são espaços informativos. A trajetória e a galeria têm navegação horizontal; as fotografias também podem ser ampliadas. O conteúdo mantém ordem de leitura quando a interface passa para uma coluna.

## Referências

- [Objetivos de UX](objetivos-de-ux.md)
- [Handoff](handoff.md)
