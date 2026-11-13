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

`public/assets/galeria/` contém oito fotografias em WebP, numeradas de `01-leituras.webp` a `08-eventos.webp`. O array `GALLERY_PHOTOS`, em `src/App.tsx`, define a ordem e os textos alternativos usados na interface.

## Áreas, tecnologias e contato

- `public/assets/visuais/areas/`: cinco ícones de áreas.
- `public/assets/visuais/stack/`: 15 marcas de ferramentas e linguagens.
- `public/assets/visuais/contato/`: ícones de e-mail, LinkedIn e GitHub.

As setas de interface são geradas pelo componente SVG `src/components/ArrowIcon.tsx`. Os quatro painéis do EduComp são composições tipográficas da própria aplicação, não imagens de telas reais.

O comando `npm run check:assets` verifica os caminhos referenciados pelo código e pelos arquivos de configuração. Não é necessário manter arquivos README ou manifestos dentro de `public/assets/`.
