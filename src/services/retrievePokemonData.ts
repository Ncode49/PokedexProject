import {
  getPokemonByName,
  getPokemonChunkDetails,
  PokemonName,
} from './PekemonRestAPI'
import { PokemonDTO } from './PokemonAllDTO'
import { PokemonCard, TypesPokemon } from './PokemonType'

const getTypePokemon = (types: Array<any>): TypesPokemon => {
  if (types.length == 1) return [types[0].type.name]
  return [types[0].type.name, types[1].type.name]
}

// given the name, we can create card in the display screen
export const createCard = async (
  pokemonName: PokemonName
): Promise<PokemonCard | undefined> => {
  try {
    const pokemon = await getPokemonByName(pokemonName)

    if (pokemon) {
      let pokemonCard: PokemonCard = {
        id: pokemon.id,
        types: getTypePokemon(pokemon.types),
        sprite: pokemon.sprites.front_default,
        name: pokemon.name,
      }
      return pokemonCard
    }
  } catch (error) {
    console.log(error)
    throw new Error('erreur inconnue')
  }
}

export const createCards = async (
  limit: number = 20,
  offset: number = 0
): Promise<Array<PokemonCard> | undefined> => {
  try {
    const pokemons = await getPokemonChunkDetails(limit, offset)

    if (pokemons) {
      return pokemons.map((pokemon) => createOneCard(pokemon))
    }
  } catch (error) {
    console.log(error)
    throw new Error('erreur inconnue')
  }
}

const createOneCard = (pokemonDTO: PokemonDTO): PokemonCard => {
  return {
    id: pokemonDTO.id,
    types: getTypePokemon(pokemonDTO.types),
    sprite: pokemonDTO.sprites.front_default,
    name: pokemonDTO.name,
  }
}