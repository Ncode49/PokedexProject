import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Abilities,
  getPokemonDetails,
  getPokemonTypeStats,
  StatPokemon,
} from '../services/retrievePokemonData'

type PokemonDetailsType = {
  id: number
  name: string
  sprite: string
  height: number
  weight: number
  ability: Abilities
  averageTypeStats: StatPokemon
  stats: StatPokemon
}
// get the average types
export const PokemonDetails = () => {
  const { pokemonName } = useParams()
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailsType>()
  useEffect(() => {
    ;(async () => {
      if (pokemonName !== undefined) {
        const data = await getPokemonDetails(pokemonName)
        setPokemonDetails(data)
      }
    })()
  }, [])
  return <div>{JSON.stringify(pokemonDetails)}</div>
}
