import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPokemonTypeStats } from '../services/PekemonRestAPI'
// get the average types
export const PokemonDetails = () => {
  useEffect(() => {
    ;(async () => {
      const data = await getPokemonTypeStats(['poison', 'normal'])
      console.log(data)
    })()
  }, [])
  const { pokemonName } = useParams()
  return <div>{pokemonName}</div>
}
