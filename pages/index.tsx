import { pokeApi } from "@/api"
import { Layouts } from "@/components/layouts"
import { PokemonCard } from "@/components/pokemon"
import { PokemonsListResponse, SmallPokemon } from "@/interfaces"
import { Grid } from "@nextui-org/react"
import { GetStaticProps } from 'next'


interface Props {
  pokemons: SmallPokemon[]
}


const HomePage:React.FC<Props> = ({ pokemons }):JSX.Element => {

  return (
    <Layouts title="Listado de Pokemons">
      <Grid.Container gap={2} justify="flex-start">
        {
          pokemons.map( (pokemon) => (
            <PokemonCard 
              key={pokemon.id} 
              pokemon={pokemon}
            />
          ))
        }
      </Grid.Container>
    </Layouts>
  )
}



export const getStaticProps: GetStaticProps = async (ctx) => {
  const {data} = await pokeApi.get<PokemonsListResponse>('/pokemon?limit=151')

  const pokemons: SmallPokemon[] = data.results.map( (poke,i) => ({
    ...poke,
    id: i+1,
    img: `https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/other/dream-world/${i +1}.svg`
  }))

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage