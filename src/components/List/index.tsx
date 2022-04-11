import { ListItem } from '../ListItem'

import styles from './list.module.scss'

interface Product {
  id: number
  price: number
  title: string
}

interface ListProps {
  results: Product[]
}

export function List({ results }: ListProps) {
  return (
    <ul className={styles.list}>
      {results.map(result => (
        <ListItem key={result.id} item={result} />
      ))}
    </ul>
  )
}
