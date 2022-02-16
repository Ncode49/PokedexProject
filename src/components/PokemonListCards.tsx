import {
  ChangeEvent,
  FormEventHandler,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react'
import { getPokemonByName } from '../services/PekemonRestAPI'
import { PokemonCard as PokemonCardProps } from '../services/PokemonType'
import { createCards, createOneCard } from '../services/retrievePokemonData'
import { PokemonCard } from './PokemonCard'
export const PokemonListCards = () => {
  // list of pokemons
  const [pokemonCard, setPokemonCart] = useState<Array<PokemonCardProps>>()
  const [pokemonSearch, setPokemonSearch] = useState<string>('')
  // display the first 20 pokemons
  useEffect(() => {
    ;(async () => {
      const data = await createCards()
      setPokemonCart(data)
    })()
  }, [])

  // once give => change the value of the listed pokemons
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    // remise a zero du composant
    setPokemonSearch('')
    // rechercher le pokemon
    if (!pokemonSearch) return
    ;(async () => {
      const data = await getPokemonByName(pokemonSearch)
      if (data) {
        const card = createOneCard(data)
        setPokemonCart([card])
      } else {
        // mettre a undefined si non trouvé
        setPokemonCart(data)
      }
    })()
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPokemonSearch(e.target.value)
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          placeholder="Chercher un pokemon"
          value={pokemonSearch}
        />
        <input type="submit" value="Rechercher" />
      </form>

      <ul className="flex flex-wrap">
        {pokemonCard ? (
          pokemonCard.map(({ id, name, types, sprite }, index) => (
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
    </>
  )
}
