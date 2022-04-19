import { memo } from 'react'

import styles from './listitem.module.scss'

interface Product {
  id: number
  price: number
  title: string
  formattedPrice: string
}

interface ListItemProps {
  item: Product
  onAddToWishList: (id: number) => void
}

function ListItemComponent({ item, onAddToWishList }: ListItemProps) {
  return (
    <li className={styles.listItem}>
      {item.title} - <strong>R$ {item.formattedPrice}</strong>
      <button
        className={styles.listItemButton}
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
