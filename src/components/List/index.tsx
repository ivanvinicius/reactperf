import { ListItem } from '../ListItem'

import styles from './list.module.scss'

interface Product {
  id: number
  price: number
  title: string
  formattedPrice: string
}

interface ListProps {
  results: Product[]
  totalPrice: number
  onAddToWishList: (id: number) => void
}

const formatCurrency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

export function List({ results, totalPrice, onAddToWishList }: ListProps) {
  return (
    <>
      <strong className={styles.listSum}>
        Soma total dos itens: {formatCurrency.format(totalPrice)}
      </strong>
      <ul className={styles.list}>
        {results.map(result => (
          <ListItem
            key={result.id}
            item={result}
            onAddToWishList={onAddToWishList}
          />
        ))}
      </ul>
    </>
  )
}
