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
            <p className="">Numero3: 4{pokemonCard.id}</p>
            <h2 className="">{pokemonCard.name}</h2>
            <img src={pokemonCard.sprite} alt={pokemonCard.name} />
            <div>
              {pokemonCard.types.map((type) => (
                <span key={type}>{type}</span>
              ))}
            </div>
          </figcaption>
        </figure>
      )}
    </>
  )
}
