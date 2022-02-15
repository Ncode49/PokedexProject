import { useEffect, useState } from 'react'
import { PokemonCard as PokemonCardProps } from '../services/PokemonType'
import { createCard } from '../services/retrieve-pokemonlist'

export const PokemonCard = () => {
  const [pokemonCard, setPokemonCart] = useState<PokemonCardProps | undefined>()

  useEffect(() => {
    ;(async () => {
      const data = await createCard('venusaur')
      setPokemonCart(data)
    })()
  }, [])
  return (
    <>
      {pokemonCard && (
        <figure>
          <figcaption>
            <p>Numero: {pokemonCard.id}</p>
            <h2>{pokemonCard.name}</h2>
            <img src={pokemonCard.sprite} alt={pokemonCard.name} />
            <div>
              {pokemonCard.types.map((type) => (
                <span>{type}</span>
              ))}
            </div>
          </figcaption>
        </figure>
      )}
    </>
  )
}
