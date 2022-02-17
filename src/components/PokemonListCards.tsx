import { PokemonCard } from './PokemonCard'
import { PokemonCard as PokemonCardProps } from '../services/PokemonType'
export type PokemonListCardsProps = {
  listCards: Array<PokemonCardProps>
}
export const PokemonListCards = (
  pokemonListCardsProps: PokemonListCardsProps
) => {
  const pokemonCards = pokemonListCardsProps.listCards
  // affiché a chaque fois que l'on tape du texte alors que composant a pas changé
  //console.log(pokemonCards) logique car on change le useState a chaque fois que l'on tape du texte
  // cela réaffiche les composants
  return pokemonCards.length ? (
    <ul className="flex flex-wrap">
      {pokemonCards.map(({ id, name, types, sprite }, index) => (
        <li key={index}>
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
