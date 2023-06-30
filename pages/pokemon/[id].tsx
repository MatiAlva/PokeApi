import { Layouts } from '@/components/layouts'
import { GetStaticProps, NextPage } from 'next'
import React, {  useState } from 'react'
import { GetStaticPaths } from 'next'
import { pokeApi } from '@/api'
import { Pokemon } from '@/interfaces'
import { Button, Card, Container, Grid, Text } from '@nextui-org/react'
import Image from 'next/image'
import { getPokemonIfo, localFavorites } from '@/utils'
import confetti from 'canvas-confetti'

interface Props {
  pokemon: Pokemon
}


const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id))

  const onToggleFavorites = () => {
    localFavorites.toggleFavorites(pokemon.id)
    setIsInFavorites(!isInFavorites)
    
    if (isInFavorites) return 
  
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    })
  }


  return (
    <Layouts title={pokemon.name.toUpperCase()}>
        <Grid.Container css={{marginTop: '5px'}} gap={2}>
          <Grid xs={12} sm={4}>
            <Card isHoverable css={{padding: '30px'}}>
              <Card.Body>
                <Card.Image 
                  src={pokemon.sprites.other?.dream_world.front_default || 'mo-image.png'}
                  alt={pokemon.name}
                  width='100%'
                  height={200}
                />
              </Card.Body>
            </Card>
          </Grid>

          <Grid xs={12} sm={8}>
            <Card>
              <Card.Header css={{display: 'flex', justifyContent: 'space-between'}}>
                <Text h1 >{pokemon.name}</Text>
                <Button 
                  color='gradient' 
                  ghost={!isInFavorites}
                  onClick={onToggleFavorites}
                  css={{ display: 'flex', justifyContent: 'center', width: '50%'}}
                >
                  { isInFavorites ? 'En favorito' : 'Guardar en Favorito'}
                </Button>
              </Card.Header>
              <Card.Body>
                <Text size={30}>Sprites:</Text>
                <Container direction='row' display='flex'>
                <Image 
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />                  
                <Image 
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />                  
                <Image 
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
              />
                <Image 
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                </Container>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
    </Layouts>
  )
}



export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const pokemons151 = [...Array(151)].map((value, index) => `${index +1}`)

  return {
    paths: pokemons151.map(id => ({
      params: {
        id
      }
    })),
    // fallback: false
    fallback: 'blocking'
  }
}



export const getStaticProps: GetStaticProps = async ({params}) => {

  const {id} = params as {id: string}

  const pokemon = await getPokemonIfo(id)

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
 
  return {
    props: {
     pokemon
    },
    revalidate: 86400
  }
}



export default PokemonPage
