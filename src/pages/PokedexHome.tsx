import React, { useEffect, useState } from 'react'
import { PokemonListCards } from '../components/PokemonListCards'
import { SearchBar } from '../components/SearchBar'
import { createCards } from '../services/retrievePokemonData'
import { PokemonCard as PokemonCardProps } from '../services/PokemonType'
export const PokedexHome = () => {
  return (
    <>
      <PokemonListCards />
    </>
  )
}
