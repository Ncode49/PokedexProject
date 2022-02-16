import { useParams } from 'react-router-dom'

export const PokemonDetails = () => {
  const { pokemonName } = useParams()
  return <div>{pokemonName}</div>
}
