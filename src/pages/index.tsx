import { FormEvent, useRef, useState, useCallback } from 'react'
import { List } from '../components/List'

import styles from './home.module.scss'

interface Product {
  id: number
  price: number
  title: string
}

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Product[]>([])

  const addToWishList = useCallback(async (id: number) => {
    // just an example
    console.log(id)
  }, [])

  async function handleSearch(event: FormEvent) {
    event.preventDefault()

    if (!search.trim()) {
      inputRef.current.focus()
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()

    setResults(data)
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
          <List results={results} onAddToWishList={addToWishList} />
        </div>
      </div>
    </main>
  )
}
