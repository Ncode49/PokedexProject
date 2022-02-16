import { Link } from 'react-router-dom'
import { PokemonCard as PokemonCardProps } from '../services/PokemonType'

const theme: { [key: string]: string } = {
  grass: 'bg-[#9bcc50]',
}

export const PokemonCard = ({ id, types, name, sprite }: PokemonCardProps) => {
  return (
    <>
      {id ? (
        <Link to={`/${name}`} key={id}>
          <figure>
            <figcaption>
              <p>No{id}</p>
              <h2>{name}</h2>
              <img src={sprite} alt={name} />
              <div>
                {types.map((type) => (
                  <span className={theme[type]} key={type}>
                    {type}
                  </span>
                ))}
              </div>
            </figcaption>
          </figure>
        </Link>
      ) : (
        'Pas de Pokémon'
      )}
    </>
  )
}
