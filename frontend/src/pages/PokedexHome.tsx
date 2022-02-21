import React, {
  ChangeEvent,
  MouseEventHandler,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react'
import { PokemonListCards } from '../components/PokemonListCards'
import { PokemonCard as PokemonCardProps } from '../services/PokemonType'
import { SearchBar } from '../components/SearchBar'
import { createCards, createOneCard } from '../services/retrievePokemonData'
import { getPokemonByName } from '../services/PokemonRestAPI'
type PokemonSearch = string
export const PokedexHome = () => {
  // list of pokemons a undefined si pas de pokemon
  const [pokemonSearch, setPokemonSearch] = useState<PokemonSearch>('')
  const [pokemonCards, setPokemonCards] = useState<Array<PokemonCardProps>>([])
  // display the first 20 pokemons
  const [offsetList, setOffsetList] = useState(0)
  useEffect(() => {
    ;(async () => {
      const data = await createCards()
      // gauche undefined
      setPokemonCards(data)
      setOffsetList((c) => c + 20)
    })()
  }, [])

  // once give => change the value of the listed pokemons
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    // si barre verticale vide on ne fait rien
    if (!pokemonSearch) return // sinon on fetch les data
    ;(async () => {
      const data = await getPokemonByName(pokemonSearch)
      if (data) {
        const card = createOneCard(data)
        setPokemonCards([card])
      } else {
        // mettre a undefined si non trouvé ?? est egale a gauche si non undefined droite sinon
        setPokemonCards(data ?? [])
      }
    })()
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPokemonSearch(e.target.value)
  }

  const addPokemon = () => {}
  return (
    <>
      <SearchBar
        onChange={onChange}
        onSubmit={onSubmit}
        pokemonSearch={pokemonSearch}
      />
      <PokemonListCards listCards={pokemonCards} addPokemon={addPokemon} />
    </>
  )
}
