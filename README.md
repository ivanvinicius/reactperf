# reactperf

Understanding most of React hooks to get better app perfomance.

## Anotações

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

