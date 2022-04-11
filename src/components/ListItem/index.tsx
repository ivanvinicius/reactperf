import styles from './listitem.module.scss'

interface Product {
  id: number
  price: number
  title: string
}

interface ListItemProps {
  item: Product
}

export function ListItem({ item }: ListItemProps) {
  return (
    <li className={styles.listItem}>
      {item.title} - <strong>R$ {item.price}</strong>
    </li>
  )
}
