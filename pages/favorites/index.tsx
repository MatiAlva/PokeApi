import { Layouts } from '@/components/layouts'
import { FavoritePokemons } from '@/components/pokemon'
import { NoFavorites } from '@/components/ui'
import { localFavorites } from '@/utils'
import { useEffect, useState } from 'react'


const FavoritesPage = () => {

  const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([])

  useEffect(() => {
    setFavoritesPokemons(localFavorites.pokemons())
  }, [])

  return (
    <Layouts title='Pokemon - Favoritos'>

      {
        favoritesPokemons.length === 0 
        ? (  <NoFavorites />)
        : (<FavoritePokemons pokemons={favoritesPokemons}/>)
      }
    

    </Layouts>
  )
}

export default FavoritesPage