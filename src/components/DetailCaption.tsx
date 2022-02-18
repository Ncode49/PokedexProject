import React from 'react'
import { TypesPokemon } from '../services/PokemonType'
import { Abilities } from '../services/retrievePokemonData'
import { theme } from '../styles/TypeStyle'

type DetailCaptionProps = {
  height: number
  weight: number
  abilities: Abilities
  types: TypesPokemon
}
export const DetailCaption = ({
  height,
  weight,
  abilities,
  types,
}: DetailCaptionProps) => {
  return (
    <figcaption className="basis-2/4  rounded bg-red-500 ">
      <ul>
        <li>height {height / 10} m</li>
        <li>weight {weight / 10} kg</li>
        <li>ability {abilities.map((ability) => ability)}</li>
        <li>
          type
          {types.map((type) => (
            <span className={theme[type]} key={type}>
              {type}
            </span>
          ))}
        </li>
      </ul>
    </figcaption>
  )
}
