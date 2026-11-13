# Plano de testes

O plano combina verificações automatizadas do repositório e cenários de regressão para uso no navegador. Ele documenta o procedimento e o resultado esperado; não equivale a uma certificação de acessibilidade ou a uma pesquisa com usuários.

## Verificações automatizadas

```bash
npm ci
npm run verify
```

| Comando | Cobertura |
| --- | --- |
| `check:content` | Estrutura de páginas, navegação, composição, dados e integrações internas |
| `check:assets` | Existência de imagens, ícones e arquivos usados na interface |
| `check:docs` | Referências relativas entre arquivos Markdown |
| `typecheck` | Análise de tipos do TypeScript |
| `build` | Compilação de produção e geração dos documentos de SEO |

O GitHub Actions executa `verify` após `npm ci` em pushes e pull requests para `main`.

## Cenários de regressão

| ID | Procedimento | Resultado esperado |
| --- | --- | --- |
| NAV-01 | Abrir `/` e acessar cada item do menu | Rolagem para a seção correta e indicação da seção ativa |
| NAV-02 | Abrir EduComp e usar retorno a Projetos | Retorno à landing na seção de Projetos |
| NAV-03 | Abrir o ensaio, atualizar a página e usar o retorno | A rota carrega diretamente e a volta funciona |
| NAV-04 | Usar voltar/avançar do navegador entre rotas | Histórico preservado sem páginas vazias |
| PRO-01 | Examinar Projetos no desktop e no celular | Dois destaques no topo em desktop e empilhamento no mobile; cards inferiores preservados |
| PRO-02 | Acionar os cards de reserva | Ausência de links para conteúdo inexistente |
| EDU-01 | Abrir EduComp e acessar o protótipo | Estudo de caso e link externo funcionam |
| FRA-01 | Percorrer as seis entradas do índice | Cada entrada leva ao trecho correspondente |
| FRA-02 | Compartilhar o ensaio | Compartilhamento nativo ou cópia do link, com retorno acessível |
| GAL-01 | Percorrer e ampliar as oito fotografias | Imagem correta, proporção adequada e fechamento por botão/Esc |
| CON-01 | Abrir e fechar o modal de contato | Links corretos, fechamento por botão/Esc e retorno do foco |
| CUR-01 | Acionar Currículo com e sem PDF | Download de arquivo válido ou aviso informativo |
| ACC-01 | Percorrer menus, links e controles somente com teclado | Ordem lógica e foco visível |
| ACC-02 | Ativar movimento reduzido no sistema | Animações não essenciais reduzidas ou interrompidas |
| SEO-01 | Abrir as três rotas pelo endereço direto | HTML e metadados adequados em cada rota |

## Tamanhos e navegadores

Conferir larguras de 320, 390, 768, 1024 e 1440 px. Em todas elas, observar cortes de texto, rolagem horizontal inesperada, contraste, escala das imagens e ordem de leitura. Testar pelo menos um navegador desktop e um navegador mobile.

## Registro de evidência

Para cada execução manual, registrar data, navegador, largura, resultado (aprovado, falhou ou não executado) e evidência em caso de falha. O documento de [verificação do repositório](relatorio-de-verificacao.md) distingue testes executados de itens que dependem da hospedagem ou da inspeção visual.
