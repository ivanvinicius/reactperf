import { ListItem } from './ListItem'
import { formatCurrency } from '../utils/formatCurrency'
import { IProductData } from '../@types/IProductData'

interface ListProps {
  data: IProductData[]
  totalPrice: number
  onAddToWishList: (id: number) => void
}

export function List({ data, totalPrice, onAddToWishList }: ListProps) {
  return (
    <>
      <strong>Soma total dos itens: {formatCurrency.format(totalPrice)}</strong>

      <ul>
        {data.map(item => (
          <ListItem
            key={item.id}
            item={item}
            onAddToWishList={onAddToWishList}
          />
        ))}
      </ul>
    </>
  )
}
