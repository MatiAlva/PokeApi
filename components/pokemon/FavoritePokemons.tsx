import { Grid, Card } from '@nextui-org/react'
import React from 'react'
import { FavoriteCardPokemon } from './FavoriteCardPokemon'

interface Props {
  pokemons: number[]
}

export const FavoritePokemons:React.FC<Props> = ({ pokemons}) => {
  return (
    <Grid.Container gap={2} direction='row' justify='flex-start'>
      {
      pokemons.map(id => (
        <FavoriteCardPokemon pokemonId={id} key={id}/>
      ))
    }

  </Grid.Container>
  )
}
