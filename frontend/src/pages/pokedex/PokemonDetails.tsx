import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DetailCaption } from '../../components/DetailCaption'
import { Table } from '../../components/Table'
import { TypesPokemon } from '../../services/pokemon/PokemonType'
import {
  Abilities,
  StatPokemon,
  getPokemonDetails,
} from '../../services/pokemon/retrievePokemonData'

type PokemonDetailsType = {
  id: number
  name: string
  sprite: string
  height: number
  weight: number
  abilities: Abilities
  averageTypeStats: StatPokemon
  stats: StatPokemon
  types: TypesPokemon
}
// get the average types
// get the keys then iterate through the two objects
export const PokemonDetails = () => {
  const { pokemonName } = useParams()
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailsType>()
  useEffect(() => {
    ;(async () => {
      if (pokemonName !== undefined) {
        const data = await getPokemonDetails(pokemonName)
        // creer un hook personnalisé ici pour le setPokemon details
        setPokemonDetails(data)
      }
    })()
  }, [])

  if (pokemonDetails !== undefined) {
    const {
      id,
      name,
      sprite,
      height,
      weight,
      abilities,
      averageTypeStats,
      stats,
      types,
    } = pokemonDetails
    const keys = Object.keys(stats)
    return (
      <section className="w-10/12 mx-auto my-3 ">
        <h1 className="text-3xl text-center">
          {name} No{id}
        </h1>
        <figure className="flex grow justify-center">
          <img
            src={sprite}
            className="basis-2/4 border-2
           border-black rounded"
            alt={name}
          />
          <DetailCaption
            height={height}
            weight={weight}
            abilities={abilities}
            types={types}
          />
        </figure>
        <Table keys={keys} stats={stats} averageTypeStats={averageTypeStats} />
      </section>
    )
  }

  return <h1>En chargement ou Pokemon non trouvé</h1>
}
