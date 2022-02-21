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
    <form
      className=" text-lg p-2  bg-[#616161] flex gap-4  "
      onSubmit={onSubmit}
    >
      <input
        type="text"
        onChange={onChange}
        placeholder="Chercher un pokemon"
        value={pokemonSearch}
      />
      <input
        className="hover:scale-110 hover:cursor-pointer inline-block bg-red-500 rounded p-2"
        type="submit"
        value="Rechercher"
      />
    </form>
  )
}
