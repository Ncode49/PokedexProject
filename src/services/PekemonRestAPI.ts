import { PokemonDTO, PokemonPageDTO, PokemonTypeDTO } from './PokemonAllDTO'

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
): Promise<Array<Url>> => {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    )
    // no pokemon  so no cards
    if (res.status == 404) {
      console.log('Error 404')
      return []
    }
    // type here to get information about data fetch
    const pokemon: PokemonPageDTO = await res.json()
    return pokemon.results.map((pokemon) => pokemon.url)
  } catch (error) {
    console.error(error)
    return []
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

export const getPokemonByUrls = async (
  pokemonsUrl: Array<Url>
): Promise<Array<PokemonDTO>> => {
  return Promise.all(pokemonsUrl.map((url) => getPokemonByUrl(url)))
}

// d'abord le faire sans try catch, on try catchera dans les methodes qui font appel au promesse

export const getPokemonsType = async (
  type: TypePokemon
): Promise<Array<PokemonDTO>> => {
  // on doit typer quand on fetch après cela, il y a une inférence de type sur ce qui est recu
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
  const json: PokemonTypeDTO = await res.json()
  const urlPokemonType = json.pokemon.map((type) => type.pokemon.url)
  return getPokemonByUrls(urlPokemonType)
}

// fonction de filtrage
// get stats from an pokemonDTO
export const getPokemonTypeStats = async (type: TypePokemon) => {
  const res = await getPokemonsType(type)
  const pokemonsStats = res.map((pokemon) => getPokemonStats(pokemon))
  // ligne = number of pokemon , column = on for each stats (6 column)
  const columlg = pokemonsStats[0].length
  const rowlg = pokemonsStats.length

  const stats = new Array<OneStat>()
  // donn
  // parcours chaque stats
  for (let i = 0; i < columlg; i++) {
    let stat = 0
    let name = pokemonsStats[0][i].name
    for (let j = 0; j < rowlg; j++) {
      stat += pokemonsStats[j][i].value
    }
    // calcule the average
    stat = stat / rowlg
    // add to the stats list the tuple
    stats.push({ name: name, value: stat })
  }
  console.log(stats)
}

type OneStat = {
  name: string
  value: number
}

const getPokemonStats = (pokemon: PokemonDTO) =>
  pokemon.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }))

const foo: number[] = [1, 2, 3, 4]
const bar: number = foo.reduce((acc, item) => acc + item, 0)
