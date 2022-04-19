import { memo, useState } from 'react'
import dynamic from 'next/dynamic'

import { AddToWishListProps } from '../AddToWishList'

import styles from './listitem.module.scss'

const AddToWishList = dynamic<AddToWishListProps>(
  () => {
    return import('../AddToWishList').then(mod => mod.AddToWishList)
  },
  {
    loading: () => <span>carregando...</span>
  }
)

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
  const [isAddingToWishList, setIsAddingToWishList] = useState(false)

  // async function showFormattedDate() {
  //  const datefns = await import('date-fns')
  // }

  return (
    <li className={styles.listItem}>
      {item.title} - <strong>R$ {item.formattedPrice}</strong>
      <button
        onClick={() => setIsAddingToWishList(true)}
        className={styles.listItemButton}
      >
        Adicionar aos favoritos
      </button>
      {isAddingToWishList && (
        <AddToWishList
          onAddToWishList={() => onAddToWishList(item.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </li>
  )
}

export const ListItem = memo(ListItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.item, nextProps.item)
})
