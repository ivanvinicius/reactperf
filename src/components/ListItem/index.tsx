import { memo } from 'react'

import styles from './listitem.module.scss'

interface Product {
  id: number
  price: number
  title: string
}

interface ListItemProps {
  item: Product
}

function ListItemComponent({ item }: ListItemProps) {
  return (
    <li className={styles.listItem}>
      {item.title} - <strong>R$ {item.price}</strong>
    </li>
  )
}

export const ListItem = memo(ListItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.item, nextProps.item)
})
