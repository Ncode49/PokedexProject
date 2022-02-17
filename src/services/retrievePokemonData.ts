import {
  getPokemonByName,
  getPokemonChunkDetails,
  getPokemonsType,
  PokemonName,
  TypePokemon,
} from './PokemonRestAPI'
import { PokemonDTO, TypeDTO } from './PokemonAllDTO'
import { PokemonCard, TypesPokemon } from './PokemonType'
type OneStat = {
  name: string
  value: number
}
export type StatPokemon = {
  [key: string]: number
}
const getTypePokemon = (types: Array<TypeDTO>): TypesPokemon =>
  types.map((type) => type.type.name)

// given the name, we can create card in the display screen
export const createCard = async (
  pokemonName: PokemonName
): Promise<PokemonCard | undefined> => {
  try {
    const pokemon = await getPokemonByName(pokemonName)
    if (pokemon !== undefined) {
      let pokemonCard: PokemonCard = {
        id: pokemon.id,
        types: getTypePokemon(pokemon.types),
        sprite: pokemon.sprites.front_default,
        name: pokemon.name,
      }
      return pokemonCard
    }
  } catch (error) {
    console.error(error)
  }
}

// si une seule ligne, on peut le retourner directement avec les arrows functions
export const createOneCard = (pokemonDTO: PokemonDTO): PokemonCard => ({
  id: pokemonDTO.id,
  types: getTypePokemon(pokemonDTO.types),
  sprite: pokemonDTO.sprites.front_default,
  name: pokemonDTO.name,
})
// cree une liste de cards
export const createCards = async (
  limit: number = 20,
  offset: number = 0
): Promise<Array<PokemonCard>> => {
  try {
    const pokemons = await getPokemonChunkDetails(limit, offset)
    // map an empty array will produce an empty array
    return pokemons.map((pokemon) => createOneCard(pokemon))
  } catch (error) {
    console.error(error)
    return []
  }
}
const getPokemonStatsList = (pokemon: PokemonDTO) =>
  pokemon.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }))

// fonction de filtrage
// get stats from an pokemonDTO
export const getPokemonTypeStats = async (types: TypePokemon[]) => {
  let res: PokemonDTO[] = []
  for (let i = 0; i < types.length; i++) {
    let result = await getPokemonsType(types[i])
    res.push(...result)
  }

  // flatten all stats of pokemon
  const pokemonsStats = res
    .map((pokemon) => getPokemonStatsList(pokemon))
    .reduce((a, b) => a.concat(b))
  // groupby and get array of stats for each stats
  const statsgroupBy = groupByValue(pokemonsStats, (i: OneStat) => i.name)

  // return average key in an object
  let statsAverage: StatPokemon = {}
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

const getPokemonStats = (pokemon: PokemonDTO): StatPokemon => {
  const stats: StatPokemon = {}
  for (let i = 0; i < pokemon.stats.length; i++) {
    stats[pokemon.stats[i].stat.name] = pokemon.stats[i].base_stat
  }
  return stats
}

export type Abilities = Array<string>
const getAbilities = (pokemon: PokemonDTO): Abilities => {
  return pokemon.abilities.map((ability) => ability.ability.name)
}

export const getPokemonDetails = async (pokemonName: PokemonName) => {
  const data = await getPokemonByName(pokemonName)
  if (data !== undefined) {
    const types = getTypePokemon(data.types)
    const averageTypeStats = await getPokemonTypeStats(types)
    const stats = getPokemonStats(data)

    return {
      id: data.id,
      name: data.name,
      sprite: data.sprites.front_default,
      types: getTypePokemon(data.types),
      height: data.height,
      weight: data.weight,
      abilities: getAbilities(data),
      averageTypeStats: averageTypeStats,
      stats: stats,
    }
  }
}
