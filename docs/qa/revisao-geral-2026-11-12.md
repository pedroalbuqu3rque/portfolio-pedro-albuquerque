# Revisão geral — 12 de novembro de 2026

## Escopo

Revisão da versão 0.22.0 do portfólio, a partir dos arquivos recebidos em `portfolio-p.rar`. A versão organizada passa a ser 0.23.0. Foram preservados os conteúdos autorais, as três rotas existentes e a direção visual em preto, branco e azul.

## Correções e refinamentos

- Recuperado o arquivo `site-meta.json`, ausente no pacote de origem e exigido tanto pelas verificações quanto pela geração dos metadados de SEO.
- Unificados título, descrição e data do ensaio a partir de `src/content/ensaio-fazer-digital.ts`. A data visível agora é **12 NOV 2026** tanto no destaque quanto na página de leitura.
- Conferido o texto do ensaio contra o arquivo fornecido pelo autor: **25 parágrafos sem diferenças**.
- Ajustado o compartilhamento do ensaio: a ação permanece no mesmo botão e o retorno da cópia aparece em um aviso acessível, sem trocar o rótulo da ação.
- Refinada a apresentação do EduComp com abertura tipográfica sóbria, sem imagem fictícia. Os quatro espaços da galeria receberam composição editorial, sem a instrução pública “ADICIONAR CAPTURA”.
- Retirado o negrito indevido do parágrafo “Sobre mim”, preservando sua redação.
- Padronizada a apresentação cronológica dos períodos da trajetória (início — fim), sem alterar os anos informados.
- Ampliados os estados de foco para teclado e o respeito à preferência por movimento reduzido nos deslocamentos internos e na faixa de tecnologias.
- Atualizados o README, as referências de arquitetura, o design system e a relação de recursos visuais.
- Incluídos `.gitignore`, `.env.example` e verificação de recursos de mídia (`npm run check:assets`).

## Arquivos removidos por não serem necessários

- `src/portfolio-v22.css` a `src/portfolio-v26.css`: versões incrementais que **não estavam importadas** no projeto.
- `src/components/DeskIllustration.tsx`: componente sem importação ou uso.
- `public/assets/visuais/stack/cplusplus.png`: marca fora da seleção atual de 15 tecnologias.
- `public/assets/hero-collage.png`: fallback de 2,2 MB; a colagem WebP usada no site foi preservada.
- READMEs e manifesto técnicos dentro de `public/assets/`: informações importantes foram concentradas em `docs/technical/recursos.md`, sem enviar documentação de bastidores como recurso público.

Nenhum arquivo da pasta `.git`, backup local, `node_modules` ou `.env` foi incluído na entrega.

## Validações realizadas

| Verificação | Resultado |
| --- | --- |
| `npm run check:content` | **31/31** verificações concluídas |
| `npm run check:assets` | **37/37** recursos encontrados |
| Comparação do ensaio com o original | **25/25** parágrafos iguais |
| Transpilação estática de TS/TSX e composição das três rotas | Concluída, sem erro de sintaxe |
| Typecheck com dependências instaladas | **Pendente** neste ambiente: acesso ao registro npm indisponível |
| Build real do Vite | **Pendente** pelo mesmo motivo |
| Inspeção visual interativa em navegador | **Pendente**: navegação local do navegador de QA bloqueada pelo ambiente |

As verificações de conteúdo são estáticas e não substituem teste de interação no navegador. Não houve publicação no GitHub.

## Validação no computador do autor

Após aplicar os arquivos ao repositório:

```powershell
npm.cmd ci
npm.cmd run check:content
npm.cmd run check:assets
npm.cmd run typecheck
npm.cmd run build
npm.cmd run dev
```

Verifique a página inicial, `/projetos/educomp` e `/fragmentos/a-potencia-do-fazer-digital-na-educacao` em desktop e celular. Confira, especialmente, o menu mobile, o compartilhamento, a galeria e a navegação por seções do ensaio.

O instalador `aplicar-ao-repositorio.mjs` cria uma cópia dos arquivos alterados antes de substituí-los e não toca na pasta `.git`.
