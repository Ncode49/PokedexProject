import { ChangeEvent, SyntheticEvent, useState } from 'react'

type SearchBarProps = {
  pokemonSearch: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: SyntheticEvent) => void
}
export const SearchBar = ({
  pokemonSearch,
  onChange,
  onSubmit,
}: SearchBarProps) => {
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
    </>
  )
}
