import { memo, useState } from 'react'
import dynamic from 'next/dynamic'

import { AddToWishListProps } from './AddToWishList'
import { IProductData } from '../@types/IProductData'

const AddToWishList = dynamic<AddToWishListProps>(
  () => {
    return import('./AddToWishList').then(mod => mod.AddToWishList)
  },
  {
    loading: () => <span>carregando...</span>
  }
)

interface ListItemProps {
  item: IProductData
  onAddToWishList: (id: number) => void
}

function ListItemComponent({ item, onAddToWishList }: ListItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false)

  return (
    <li>
      {item.title} - <strong>R$ {item.formattedPrice}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
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
