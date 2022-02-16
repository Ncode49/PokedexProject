import { PokemonDTO, PokemonPageDTO } from './PokemonAllDTO'

export type PokemonName = string
export type PokemonId = string
export type Url = string
export type TypePokemon = string
export const getPokemonByName = async (
  pokemonName: PokemonName
): Promise<PokemonDTO | undefined> => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    // no pokemon  so no cards
    if (res.status == 404) {
      console.log('Error 404')
      return undefined
    }
    const pokemon: PokemonDTO = await res.json()
    return pokemon
  } catch (error) {
    console.error(error)
  }
}

export const getPokemonById = async (
  pokemonId: PokemonId
): Promise<PokemonDTO | undefined> => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    // no pokemon  so no cards
    if (res.status == 404) {
      console.log('Error 404')
      return undefined
    }
    const pokemon: PokemonDTO = await res.json()
    return pokemon
  } catch (error) {
    console.error(error)
  }
}

// throw an error if fail url of a pokemon, fetch an PokemonDTO based on pokemon url
const getPokemonByUrl = async (url: Url): Promise<PokemonDTO> => {
  try {
    const res = await fetch(url)
    const pokemon: PokemonDTO = await res.json()
    return pokemon
  } catch (error) {
    console.error(error)
    throw new Error('Erreur inconnue')
  }
}

// get a chunk of pokemons url or nothing
export const getPokemonChunk = async (
  limit: number = 20,
  offset: number = 0
): Promise<Array<Url> | undefined> => {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    )
    // no pokemon  so no cards
    if (res.status == 404) {
      console.log('Error 404')
      return undefined
    }
    const pokemon: PokemonPageDTO = await res.json()
    return pokemon.results.map((pokemon) => pokemon.url)
  } catch (error) {
    console.error(error)
  }
}
// display the  five pokemons cards
//on considere que tout pete que promise.all et renvoyer un tableau
export const getPokemonChunkDetails = async (
  limit: number = 20,
  offset: number = 0
): Promise<Array<PokemonDTO> | undefined> => {
  const pokemonChunk = await getPokemonChunk(limit, offset)
  // pokemon is an array of url
  if (pokemonChunk) {
    try {
      return Promise.all(pokemonChunk.map((url) => getPokemonByUrl(url)))
    } catch (err) {
      console.error(err)
    }
  }
}

// throw an error if fail url of a pokemon get a list of PokemonDTO based on an url
export const getPokemonByUrls = async (
  pokemonsUrl: Array<Url>
): Promise<Array<PokemonDTO>> => {
  try {
    return Promise.all(pokemonsUrl.map((url) => getPokemonByUrl(url)))
  } catch (error) {
    console.error(error)
    throw new Error('Erreur inconnue')
  }
}
