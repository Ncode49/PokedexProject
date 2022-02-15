import { useEffect } from 'react'
import { PokemonCard } from './components/PokemonCard'
import { createCard } from './services/retrieve-pokemonlist'

export const App = () => {
  return (
    <>
      <PokemonCard />
    </>
  )
}
