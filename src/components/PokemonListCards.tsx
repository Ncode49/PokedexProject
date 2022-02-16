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
    <div>
      {pokemonCard?.map((props) => (
        <PokemonCard
          id={props.id}
          name={props.name}
          types={props.types}
          sprite={props.sprite}
        />
      ))}
    </div>
  )
}
