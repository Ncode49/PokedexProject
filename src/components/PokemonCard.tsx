import { PokemonCard as pokemonDetailspokemonDetails } from '../services/PokemonType'

const theme: { [key: string]: string } = {
  grass: 'bg-[#9bcc50]',
}

export const PokemonCard = (pokemonDetails: pokemonDetailspokemonDetails) => {
  return (
    <>
      {pokemonDetails ? (
        <figure>
          <figcaption>
            <p>Numero3: 4{pokemonDetails.id}</p>
            <h2>{pokemonDetails.name}</h2>
            <img src={pokemonDetails.sprite} alt={pokemonDetails.name} />
            <div>
              {pokemonDetails.types.map((type) => (
                <span className={theme[type]} key={type}>
                  {type}
                </span>
              ))}
            </div>
          </figcaption>
        </figure>
      ) : (
        'Pas de Pokémon'
      )}
    </>
  )
}
