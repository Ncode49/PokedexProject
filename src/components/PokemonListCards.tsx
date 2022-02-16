import { useEffect, useState } from 'react'
import { PokemonCard as PokemonCardProps } from '../services/PokemonType'
import { createCards } from '../services/retrievePokemonData'
import { PokemonCard } from './PokemonCard'

export const PokemonListCards = () => {
  const [pokemonCard, setPokemonCart] = useState<Array<PokemonCardProps>>()
  useEffect(() => {
    ;(async () => {
      const data = await createCards()
      setPokemonCart(data)
    })()
  }, [])

  return (
    <ul>
      {pokemonCard?.map(({ id, name, types, sprite }, index) => (
        <li>
          <PokemonCard
            key={index}
            id={id}
            name={name}
            types={types}
            sprite={sprite}
          />
        </li>
      ))}
    </ul>
  )
}
