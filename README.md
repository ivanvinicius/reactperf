# reactperf

Entendo mais sobre os hooks do React pare ter uma melhor performance no app.

## Renderização no React

Quando e como as renderizações do React acontecem:

1. Quando o componente pai sofre uma alteração, o componente filho também é renderizado.
2. Quando uma propriedade de um componente é alterada.
3. Quando o estado de um hook é alterado (useState, useEffect...).

Fluxo de renderização de um componente:

1. No primeiro instante, é gerada uma nova versão do componente que precisa ser renderizado
de forma virtual.
2. Logo após, uma comparação entre a página virtual e a página já exibida na tela é feita.
Nesse ponto, o algoritimo de reconciliação do React entra em ação, realizando um diffin das
informações, para que seja alterado somente o que é necessário na página. O React nunca apaga
e recria todas as informações, apenas altera.
3. Se houveram alterações, acontece a renderização da nova versão. 

## memo

1. Muito utilizado quando o conteúdo do componente pai muda, mas o do filho permanece o mesmo.
2. Evita que uma nova versão (virtual DOM) do componente seja criada de forma desnecessária, isso acontece
graças ao algoritmo de `shallow compare`, que compara tipos primitivos para ver se houve uma
mudança nas propriedades do componente.
3. O segundo parâmentro do memo é utilizado quando as propriedades do componente não são do tipo 
primitivo, ou seja, no caso de arrays e objetos a comparação não funciona da forma correta.
4. Em quais momentos utilizar?
  4.1. Quando temos um Pure Functional Component. São componentes que não envolvem nenhuma lógica,
  apenas recebem (ou não) propriedades e retornam as mesmas, sem nenhuma alteração.
  4.2. Componentes que renderizam demais (Renders too often).
  4.3. Renderizações com as mesmas propriedades.
  4.4. Componentes que tem um tamanho grande ou médio, componentes pequenos não necessitam da 
  utilização do memo.