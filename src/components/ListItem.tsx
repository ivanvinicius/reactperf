import { memo, useState } from 'react'
import loadsh from 'lodash'
import dynamic from 'next/dynamic'

import { IProductData } from '../@types/IProductData'

import { AddToWishListProps } from './AddToWishList'

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
    <div className="list">
      <div className="listInfo">
        {item.title} - <strong>R$ {item.formattedPrice}</strong>
        <button onClick={() => setIsAddingToWishList(true)}>
          Adicionar aos favoritos
        </button>
      </div>
      {isAddingToWishList && (
        <AddToWishList
          onAddToWishList={() => onAddToWishList(item.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  )
}

export const ListItem = memo(ListItemComponent, (prevProps, nextProps) => {
  return loadsh.isEqual(prevProps.item, nextProps.item)
})
