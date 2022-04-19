export interface AddToWishListProps {
  onAddToWishList: () => void
  onRequestClose: () => void
}

export function AddToWishList({
  onAddToWishList,
  onRequestClose
}: AddToWishListProps) {
  return (
    <div>
      <span>Tem certeza que deseja adicionar aos favoritos?</span>
      <button
        style={{ padding: '10px', margin: '10px' }}
        onClick={onAddToWishList}
      >
        Sim
      </button>
      <button
        style={{ padding: '10px', margin: '10px' }}
        onClick={onRequestClose}
      >
        Não
      </button>
    </div>
  )
}
