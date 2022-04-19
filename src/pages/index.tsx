import { FormEvent, useRef, useState, useCallback } from 'react'
import { List } from '../components/List'

import styles from './home.module.scss'

interface Product {
  id: number
  price: number
  title: string
  formattedPrice: string
}

interface Results {
  totalPrice: number
  data: Product[]
}

const formatCurrency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: []
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

    const dataFormatted = data.map(item => ({
      ...item,
      formattedPrice: formatCurrency.format(item.price)
    }))

    console.log(dataFormatted[0].formattedPrice)

    const totalPrice = data.reduce((acc, currentItem) => {
      return acc + currentItem.price
    }, 0)

    setResults({ totalPrice, data: dataFormatted })
  }

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={handleSearch} className={styles.form}>
          <h1>Search</h1>

          <input
            id="search"
            name="search"
            ref={inputRef}
            type="text"
            placeholder="Type something"
            value={search}
            onChange={event => setSearch(event.target.value)}
          />

          <button type="submit">Search</button>
        </form>

        <div className={styles.listContainer}>
          <List
            results={results.data}
            totalPrice={results.totalPrice}
            onAddToWishList={addToWishList}
          />
        </div>
      </div>
    </main>
  )
}
