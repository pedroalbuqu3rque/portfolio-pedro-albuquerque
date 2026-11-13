# Verificação do repositório

## Escopo

A auditoria concentra-se em organização dos arquivos, consistência da documentação, comentários no código, estrutura do conteúdo, referências locais e configuração de integração contínua. Os textos autorais, fotografias e comportamento visual existente foram preservados; a identificação editorial do EduComp substituiu um rótulo redundante.

## Pontos conferidos

- As três rotas e seus metadados estão descritos em `site-meta.json`.
- O texto integral do ensaio permanece em `src/content/ensaio-fazer-digital.ts`.
- Os recursos utilizados estão centralizados em `public/assets/`.
- Arquivos de histórico Git, backups, dependências instaladas e builds não fazem parte do pacote de código-fonte.
- Os documentos de produto, UX/UI, arquitetura e testes descrevem a versão presente, sem listas de entregas preliminares.
- Um workflow do GitHub executa a rotina de validação em alterações da branch principal.

## Execução

O comando recomendado é:

```bash
npm ci
npm run verify
```

`verify` agrupa checagens estáticas e compilação. A cobertura funcional e visual exige o [plano de regressão](plano-de-testes.md) no navegador; testes automatizados não substituem essa inspeção.

**Histórico de referência:** a revisão local anterior à limpeza documental havia passado em 35/35 verificações de conteúdo, 37/37 de recursos, TypeScript e build Vite. Esses resultados não devem ser confundidos com uma execução do pipeline após novos commits.

As saídas da auditoria desta revisão são registradas no resumo entregue junto ao ZIP. O GitHub Actions passa a ser a referência verificável para a instalação limpa e o build de cada atualização enviada ao repositório.
