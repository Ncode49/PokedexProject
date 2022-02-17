import { Link } from 'react-router-dom'
import { PokemonCard as PokemonCardProps } from '../services/PokemonType'
import { theme } from '../styles/TypeStyle'

export const PokemonCard = ({ id, types, name, sprite }: PokemonCardProps) => {
  return (
    <>
      {id ? (
        <Link to={`/${name}`} key={id}>
          <figure>
            <img src={sprite} alt={name} />
            <figcaption>
              <p>No{id}</p>
              <h2>{name}</h2>
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
