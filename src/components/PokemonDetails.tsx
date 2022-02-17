import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TypesPokemon } from '../services/PokemonType'
import {
  Abilities,
  getPokemonDetails,
  StatPokemon,
} from '../services/retrievePokemonData'
import { theme } from '../styles/TypeStyle'

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
  return pokemonDetails !== undefined ? (
    <section>
      <h1>
        {pokemonDetails.name} No{pokemonDetails.id}
      </h1>
      <figure>
        <img src={pokemonDetails.sprite} alt={pokemonDetails.name} />
        <figcaption>
          <ul>
            <li>height {pokemonDetails.height}</li>
            <li>weight {pokemonDetails.weight}</li>
            <li>
              ability {pokemonDetails.abilities.map((ability) => ability)}
            </li>
            <li>
              type
              {pokemonDetails.types.map((type) => (
                <span className={theme[type]} key={type}>
                  {type}
                </span>
              ))}
            </li>
          </ul>
        </figcaption>
      </figure>
      <table>
        <tr>
          <th>Statistics</th>
          <th>Base</th>
          <th>Average</th>
        </tr>
        <tr>
          <td>Attaque</td>
          <td>10</td>
          <td>20</td>
        </tr>
      </table>
    </section>
  ) : (
    <h1>Pas de pokemon a cet Url</h1>
  )
}
