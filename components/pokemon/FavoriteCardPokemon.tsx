import { Grid, Card } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
    pokemonId: number
}

export const FavoriteCardPokemon:React.FC<Props> = ({ pokemonId}) => {
  const router = useRouter()

  const onFavoriteClick = () => {
    router.push(`/pokemon/${pokemonId}`)
  }

  return (
    <Grid xs={6} key={pokemonId} sm={3} md={2} xl={1} onClick={onFavoriteClick}>
      <Card isHoverable isPressable css={{ padding: 10}}>
        <Card.Image 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
          width={100}
          height={140}
        />
      </Card>
    </Grid>
  )
}
