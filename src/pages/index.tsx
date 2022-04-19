import { FormEvent, useRef, useState, useCallback } from 'react'

import { List } from '../components/List'
import { formatCurrency } from '../utils/formatCurrency'
import { IProductData } from '../@types/IProductData'

interface IResultData {
  data: IProductData[]
  totalPrice: number
}

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('')
  const [result, setResult] = useState<IResultData>({
    data: [],
    totalPrice: 0
  })

  const addToWishList = useCallback(async (id: number) => {
    console.log(id)
  }, [])

  async function handleSearch(event: FormEvent) {
    event.preventDefault()

    if (!search.trim()) {
      inputRef.current.focus()
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()

    const formattedData = data.map((item: IProductData) => ({
      ...item,
      formattedPrice: formatCurrency.format(item.price)
    }))

    const totalPrice = data.reduce((acc: number, currentItem: IProductData) => {
      return acc + currentItem.price
    }, 0)

    setResult({ data: formattedData, totalPrice })
  }

  return (
    <main>
      <div>
        <form onSubmit={handleSearch}>
          <input
            id="search"
            name="search"
            ref={inputRef}
            type="text"
            placeholder="Digite sua busca"
            value={search}
            onChange={event => setSearch(event.target.value)}
          />

          <button type="submit">Buscar</button>
        </form>

        <div>
          <List
            data={result.data}
            totalPrice={result.totalPrice}
            onAddToWishList={addToWishList}
          />
        </div>
      </div>
    </main>
  )
}
