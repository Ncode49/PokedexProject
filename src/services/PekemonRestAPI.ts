import { PokemonDTO, PokemonPageDTO, PokemonTypeDTO } from './PokemonAllDTO'

export type PokemonName = string
export type PokemonId = string
export type Url = string
export type TypePokemon = string

type OneStat = {
  name: string
  value: number
}
type StatAverage = {
  [key: string]: number
}

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
): Promise<Array<PokemonDTO>> => {
  const pokemonChunk = await getPokemonChunk(limit, offset)
  // pokemon is an array of url
  if (pokemonChunk) {
    try {
      return Promise.all(pokemonChunk.map((url) => getPokemonByUrl(url)))
    } catch (err) {
      console.error(err)
    }
  }
  return []
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

const getPokemonStats = (pokemon: PokemonDTO) =>
  pokemon.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }))

// fonction de filtrage
// get stats from an pokemonDTO
export const getPokemonTypeStats = async (types: TypePokemon[]) => {
  let res: PokemonDTO[] = []
  console.log(types.length)
  for (let i = 0; i < types.length; i++) {
    let result = await getPokemonsType(types[i])
    console.log(result.length)
    res.push(...result)
  }
  console.log(res)

  // flatten all stats of pokemon
  const pokemonsStats = res
    .map((pokemon) => getPokemonStats(pokemon))
    .reduce((a, b) => a.concat(b))
  // groupby and get array of stats for each stats
  const statsgroupBy = groupByValue(pokemonsStats, (i: OneStat) => i.name)

  // return average key in an object
  let statsAverage: StatAverage = {}
  for (const key in statsgroupBy) {
    statsAverage[key] = average(statsgroupBy[key])
  }
  return statsAverage
}

// group by keys generic here
// Record<K,T> is an object with <key,value> values
// getKey is a function that take an item and return its key
export const groupBy = <T, K extends keyof any>(
  list: T[],
  getKey: (item: T) => K
) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem)
    if (!previous[group]) previous[group] = []
    previous[group].push(currentItem)
    return previous
  }, {} as Record<K, T[]>)

const groupByValue = (list: OneStat[], getKey: (item: OneStat) => string) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem)
    if (!previous[group]) previous[group] = []
    previous[group].push(currentItem.value)
    return previous
  }, {} as Record<string, number[]>)

function average(nums: number[]) {
  return nums.reduce((a, b) => a + b) / nums.length
}

// fonction de filtrage
// get stats from an pokemonDTO
export const getPokemonTypeStatsMatrix = async (type: TypePokemon) => {
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
}
