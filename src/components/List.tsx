import { List as VirtualList, ListRowRenderer } from 'react-virtualized'

import { IProductData } from '../@types/IProductData'
import { formatCurrency } from '../utils/formatCurrency'

import { ListItem } from './ListItem'

interface ListProps {
  data: IProductData[]
  totalPrice: number
  onAddToWishList: (id: number) => void
}

export function List({ data, totalPrice, onAddToWishList }: ListProps) {
  const rowRender: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ListItem item={data[index]} onAddToWishList={onAddToWishList} />
      </div>
    )
  }

  return (
    <>
      <strong>Soma total dos itens: {formatCurrency.format(totalPrice)}</strong>

      <VirtualList
        className="virtualList"
        height={620}
        rowHeight={50}
        width={1240}
        overscanRowCount={5} // items pré-carregados
        rowCount={data.length}
        rowRenderer={rowRender}
      />
    </>
  )
}
