import { PokemonCard } from './PokemonCard'
import { PokemonCard as PokemonCardProps } from '../services/PokemonType'
export type PokemonListCardsProps = {
  listCards: Array<PokemonCardProps> | undefined
}
export const PokemonListCards = (
  pokemonListCardsProps: PokemonListCardsProps
) => {
  const pokemonCards = pokemonListCardsProps.listCards
  return (
    <ul className="flex flex-wrap">
      {pokemonCards ? (
        pokemonCards.map(({ id, name, types, sprite }, index) => (
          <li className="" key={index}>
            <PokemonCard
              key={index}
              id={id}
              name={name}
              types={types}
              sprite={sprite}
            />
          </li>
        ))
      ) : (
        <h1>Pas de Pokémon trouvé</h1>
      )}
    </ul>
  )
}
