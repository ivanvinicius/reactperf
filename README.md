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
graças ao algoritmo de **Shallow Compare**, que compara tipos primitivos para ver se houve uma
mudança nas propriedades do componente.
3. O segundo parâmentro do memo é utilizado quando as propriedades do componente não são do tipo 
primitivo, ou seja, no caso de arrays e objetos a comparação não funciona da forma correta.
4. Em quais momentos utilizar?
  * Quando temos um Pure Functional Component. São componentes que não envolvem nenhuma lógica,
  apenas recebem (ou não) propriedades e retornam as mesmas, sem nenhuma alteração.
  * Componentes que renderizam demais (Renders too often).
  * Renderizações com as mesmas propriedades.
  * Componentes que tem um tamanho grande ou médio, componentes pequenos não necessitam da 
  utilização do memo.

## useMemo

1. Utilizado para memorizar valores de cálculos muito complexos, e que consumam muito 
processamento da máquina.
2. Também é utilizado para evitar que os valores ocupem novos espaços na memória, exemplo a seguir:

```js
  const totalPrice = useMemo(() => {
    return results.reduce((acc, currentItem) => {
      return acc + currentItem.price
    }, 0)
  }, [results])

  return (
    <>
      /* Sem o useMemo, a cada vez que o NewComponent é criado, o totalPrice ocupa um novo espaço na memória. */
      /* Com o useMemo, a igualdade referêncial é criada. */
      <NewComponent totalPrice={totalPrice}/>
      <NewComponent totalPrice={totalPrice}/>
      <NewComponent totalPrice={totalPrice}/>
    </>
  )
```

## useCallback

1. Utilizado para memorizar funções, que são repassadas como propriedades para outros componentes.

* No presente caso, cada vez que o componente **Home** é renderizado, uma nova versão da função **addToWishList**
é criada na memória. Quando o React for comparar a função dos componentes filhos com a função do componente
**Home**, não haverá igualdade referêcial, sendo assim, a função será recriada nos componentes filhos novamente.