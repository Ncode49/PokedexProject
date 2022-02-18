import { PokemonCard } from './PokemonCard'
import { PokemonCard as PokemonCardProps } from '../services/PokemonType'
import React, { ChangeEvent, MouseEventHandler } from 'react'
export type PokemonListCardsProps = {
  listCards: Array<PokemonCardProps>
  addPokemon: MouseEventHandler<HTMLButtonElement>
}

// use React memo to prevent the render when typing
export const PokemonListCards = React.memo(
  (pokemonListCardsProps: PokemonListCardsProps) => {
    const pokemonCards = pokemonListCardsProps.listCards
    const addPokemon = pokemonListCardsProps.addPokemon

    return pokemonCards.length ? (
      <div className="flex flex-col items-center">
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
        <button
          onClick={addPokemon}
          className="hover:scale-110 hover:cursor-pointer inline-block bg-red-500 rounded p-2  text-center m-2"
        >
          Show More
        </button>
      </div>
    ) : (
      <h1>Pas de Pokémon trouvé</h1>
    )
  }
)
