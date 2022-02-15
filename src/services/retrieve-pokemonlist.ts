import { PokemonCard, TypesPokemon } from './PokemonType'

type PokemonName = string

const getTypePokemon = (types: Array<any>): TypesPokemon => {
  if (types.length == 1) return [types[0].type.name]
  return [types[0].type.name, types[1].type.name]
}

// given the name, we can create card in the display screen
const createCard = async (
  pokemonName: PokemonName
): Promise<PokemonCard | undefined> => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    const pokemon = await res.json()

    let pokemonCard: PokemonCard = {
      id: pokemon.id,
      types: getTypePokemon(pokemon.types),
      sprite: pokemon.sprites.front_default,
      name: pokemon.name,
    }
    console.log(pokemonCard)
    return pokemonCard
  } catch (error) {
    console.log(error)
  }
}

// display the first five pokemons cards

export { createCard }
