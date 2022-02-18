import { PokemonCard } from './PokemonCard'
import { PokemonCard as PokemonCardProps } from '../services/PokemonType'
import React from 'react'
export type PokemonListCardsProps = {
  listCards: Array<PokemonCardProps>
}

// use React memo to prevent the render when typing
export const PokemonListCards = React.memo(
  (pokemonListCardsProps: PokemonListCardsProps) => {
    const pokemonCards = pokemonListCardsProps.listCards

    return pokemonCards.length ? (
      <ul className="flex flex-wrap gap-x-2 gap-y-10  justify-center py-4">
        {pokemonCards.map(({ id, name, types, sprite }, index) => (
          <li
            className="border-2 border-black  bg-slate-500  p-2 rounded"
            key={index}
          >
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
    ) : (
      <h1>Pas de Pokémon trouvé</h1>
    )
  }
)
