import { memo } from 'react'

import styles from './listitem.module.scss'

interface Product {
  id: number
  price: number
  title: string
}

interface ListItemProps {
  item: Product
  onAddToWishList: (id: number) => void
}

function ListItemComponent({ item, onAddToWishList }: ListItemProps) {
  return (
    <li className={styles.listItem}>
      {item.title} - <strong>R$ {item.price}</strong>
      <button
        style={{ padding: '10px', marginLeft: '20px' }}
        onClick={() => onAddToWishList(item.id)}
      >
        Add to wish list
      </button>
    </li>
  )
}

export const ListItem = memo(ListItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.item, nextProps.item)
})
