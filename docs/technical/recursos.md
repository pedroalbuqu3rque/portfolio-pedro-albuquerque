# Recursos visuais

Os arquivos de imagem usados no site estão centralizados em `public/`. Os recursos mantêm seus nomes estáveis para facilitar manutenção e conferência das referências no código.

## Apresentação e leitura

| Caminho | Uso |
| --- | --- |
| `public/assets/hero-collage.webp` | Colagem editorial da abertura |
| `public/assets/fragmentos/fazer-digital.webp` | Capa e apresentação do ensaio |
| `public/assets/og-portfolio.png` | Compartilhamento em redes sociais |
| `public/favicon.svg`, `public/icon-192.png`, `public/icon-512.png` | Identidade do navegador e ícones da aplicação |

## Galeria

`public/assets/galeria/` contém nove fotografias em WebP. A foto `00-apresentacao.webp` aparece primeiro, seguida dos arquivos existentes, de `01-leituras.webp` a `08-eventos.webp`. O array `GALLERY_PHOTOS`, em `src/App.tsx`, define a ordem e os textos alternativos usados na interface.

## Áreas, tecnologias e contato

- `public/assets/visuais/areas/`: cinco ícones de áreas.
- `public/assets/visuais/stack/`: 15 marcas de ferramentas e linguagens.
- `public/assets/visuais/contato/`: ícones de e-mail, LinkedIn e GitHub.

## Capturas do EduComp

`public/assets/educomp/` contém cinco PNGs: `tela-inicial-educomp.png` aparece na capa do projeto e `biblioteca-educomp.png`, `detalhes-material-educomp.png`, `enviar-materiais-educomp.png` e `comunidade-educomp.png` ilustram o estudo de caso. As três primeiras telas internas também aparecem nos percursos de uso.

As setas de interface são geradas pelo componente SVG `src/components/ArrowIcon.tsx`.

O comando `npm run check:assets` verifica os caminhos referenciados pelo código e pelos arquivos de configuração. Não é necessário manter arquivos README ou manifestos dentro de `public/assets/`.
