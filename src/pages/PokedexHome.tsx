import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { PokemonListCards } from '../components/PokemonListCards'
import { PokemonCard as PokemonCardProps } from '../services/PokemonType'
import { SearchBar } from '../components/SearchBar'
import { createCards, createOneCard } from '../services/retrievePokemonData'

import { getPokemonByName } from '../services/PekemonRestAPI'
type PokemonSearch = string
export const PokedexHome = () => {
  // list of pokemons a undefined si pas de pokemon
  const [pokemonCards, setPokemonCards] = useState<
    Array<PokemonCardProps> | undefined
  >()
  // search bar status
  const [pokemonSearch, setPokemonSearch] = useState<PokemonSearch>('')
  // display the first 20 pokemons
  useEffect(() => {
    ;(async () => {
      const data = await createCards()
      setPokemonCards(data)
    })()
  }, [])
  // once give => change the value of the listed pokemons
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    // remise a zero du composant
    setPokemonSearch('')
    // rechercher le pokemon

    // si barre verticale vide on ne fait rien
    if (!pokemonSearch) return // sinon on fetch les data
    ;(async () => {
      const data = await getPokemonByName(pokemonSearch)
      if (data) {
        const card = createOneCard(data)
        setPokemonCards([card])
      } else {
        // mettre a undefined si non trouvé
        setPokemonCards(data)
      }
    })()
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPokemonSearch(e.target.value)
  }
  return (
    <>
      <SearchBar
        onChange={onChange}
        onSubmit={onSubmit}
        pokemonSearch={pokemonSearch}
      />
      <PokemonListCards listCards={pokemonCards} />
    </>
  )
}
