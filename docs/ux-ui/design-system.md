# Design system

## Direção visual

A interface segue uma linguagem editorial: títulos grandes, hierarquia clara, bastante espaço em branco e fotografias que não competem com a leitura. O azul concentra a atenção em ações, marcações e estados. A colagem da abertura e os recortes fotográficos introduzem contraste sem exigir ilustrações genéricas.

A referência de composição está no [Figma](https://www.figma.com/design/Cv3t12N25QRmqZzPKko0L1/Portf%C3%B3lio?node-id=325-64). O CSS define os ajustes finais de comportamento e responsividade.

## Cores

| Função | Valor |
| --- | --- |
| Fundo principal | `#FFFFFF` |
| Preto editorial | `#0E0E0E` |
| Azul de destaque | `#054FFF` |
| Fundo de apoio | `#F8F9FA` |
| Divisórias | `#DADADA` |

Variações de cinza aparecem nas áreas secundárias, nas legendas e nos estados informativos. As cores acima correspondem aos tokens presentes em `src/styles.css`.

## Tipografia

A família principal é **Archivo**, carregada pelo Google Fonts. Pesos altos organizam títulos de abertura e seções; pesos intermediários distinguem textos de apoio e metadados. A leitura do ensaio prioriza largura de linha moderada e espaçamento entre parágrafos.

A tipografia deve respeitar larguras menores sem cortes, sobreposições ou dependência de quebras fixas em todos os tamanhos.

## Componentes e padrões

| Elemento | Padrão |
| --- | --- |
| Cabeçalho | Fundo escuro, monograma, navegação global e versão mobile |
| Botão principal | Azul com texto branco; foco visível |
| Botão secundário | Fundo branco e contorno escuro; hover preto no Currículo |
| Projetos | Dois destaques editoriais no topo; cards compactos em lista abaixo |
| Fragmentos | Foto em preto e branco, texto de destaque escuro e navegação para o ensaio |
| Ensaio | Coluna de leitura, índice de seis partes e apresentação editorial junto à fotografia |
| Trajetória e galeria | Navegação horizontal discreta e ampliação das fotos |
| Contato | Modal e links externos com identificação clara |

As setas de navegação são vetoriais, para manter a aparência em desktop e celular sem depender de fontes de emoji.

## Acessibilidade e interação

Os estados de foco devem ser visíveis, inclusive para controles só com ícones. Links e botões devem indicar ações reais; cards informativos não simulam cliques. Menus e modais precisam responder a teclado, e os efeitos de movimento devem respeitar `prefers-reduced-motion`.

As fotografias relevantes recebem descrições; marcas decorativas não repetem desnecessariamente o conteúdo textual. Em dispositivos móveis, a composição se reorganiza mantendo a hierarquia da leitura.

## Referências

- [Arquitetura da informação](arquitetura-da-informacao.md)
- [Handoff](handoff.md)
- [Recursos visuais](../technical/recursos.md)
