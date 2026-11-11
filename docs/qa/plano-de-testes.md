# Plano de testes

Este documento organiza as verificações antes de publicar o portfólio. **Não é um registro de aprovação:** os resultados devem ser preenchidos após os testes no navegador e no endereço público.

## Preparação

```bash
npm install
npm run check:content
npm run typecheck
npm run build
npm run preview
```

No PowerShell, use `npm.cmd` se o Windows bloquear a execução de `npm.ps1`.

## Navegação

- [ ] A landing abre e apresenta as seções na ordem esperada.
- [ ] O botão azul **Ver projetos** leva à seção Projetos e **Currículo** mantém seu comportamento de download ou aviso.
- [ ] O cabeçalho permanece visível ao rolar e os links levam às seções corretas.
- [ ] O card EduComp abre `/projetos/educomp` e o retorno funciona.
- [ ] A ilustração da biblioteca no card do EduComp não é anunciada como captura real.
- [ ] As tags das cinco áreas não se sobrepõem às descrições em desktop e mobile.
- [ ] Os cards de Áreas ganham leve escala e sombra no hover sem parecer links; a animação é desativada com movimento reduzido.
- [ ] A trajetória apresenta os marcos reais de 2026 a 2023 em uma linha horizontal e pode ser percorrida sem mouse.
- [ ] O ensaio abre sua rota e o índice leva aos trechos correspondentes.
- [ ] Atualizar uma página interna diretamente não gera erro.
- [ ] Os botões voltar e avançar do navegador funcionam entre páginas.

## Interações

- [ ] Os carrosséis de Projetos, Fragmentos, Trajetória e Galeria podem ser percorridos com setas, teclado e toque.
- [ ] As oito fotografias da galeria independente aparecem em 4:3, com cantos arredondados e sem distorção.
- [ ] Cada fotografia abre ampliada e fecha pelo botão, clique externo ou Esc; as setas permitem percorrer as fotos.
- [ ] A animação das tecnologias não impede a leitura e respeita movimento reduzido.
- [ ] O modal de contato abre e fecha pelo X, Esc e clique fora.
- [ ] E-mail, LinkedIn e GitHub abrem os destinos corretos.
- [ ] O botão de currículo faz download do PDF válido ou informa a indisponibilidade.
- [ ] Botões e links oferecem foco visível e nomes compreensíveis.

## Responsividade e acessibilidade

Conferir as três páginas pelo menos em 320, 390, 768, 1024 e 1440 px.

- [ ] Não há rolagem horizontal indevida.
- [ ] Títulos, imagens e tags não ficam cortados.
- [ ] A apresentação mobile mantém ordem de leitura adequada.
- [ ] O modal e o menu podem ser usados sem mouse.
- [ ] Os conteúdos têm contraste, hierarquia de títulos e textos alternativos adequados.
- [ ] O índice de Fragmentos e os controles de carrossel funcionam por teclado.

## Publicação

- [ ] A URL pública está em `VITE_SITE_URL`.
- [ ] O favicon, os títulos e a imagem de compartilhamento foram conferidos.
- [ ] Sitemap, `robots.txt` e indexação correspondem ao conteúdo publicado.
- [ ] Os arquivos públicos carregam corretamente.
- [ ] O site foi testado no endereço final, em desktop e celular.

Pendências de conteúdo e links de referência estão registradas no [handoff](../ux-ui/handoff.md).
