import { useMemo } from 'react'

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
  const totalPrice = useMemo(() => {
    return results.reduce((acc, currentItem) => {
      return acc + currentItem.price
    }, 0)
  }, [results])

  return (
    <>
      <span>{totalPrice}</span>
      <ul className={styles.list}>
        {results.map(result => (
          <ListItem key={result.id} item={result} />
        ))}
      </ul>
    </>
  )
}
