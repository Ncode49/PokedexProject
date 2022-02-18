import { Link } from 'react-router-dom'
import { PokemonCard as PokemonCardProps } from '../services/PokemonType'
import { imageTheme, theme } from '../styles/TypeStyle'

export const PokemonCard = ({ id, types, name, sprite }: PokemonCardProps) => {
  return (
    <>
      {id ? (
        <Link to={`/${name}`} key={id}>
          <figure className="  text-center flex flex-col justify-center">
            <img
              src={sprite}
              className={`${
                imageTheme[types[0]]
              } border-2 w-52 border-black rounded`}
              alt={name}
            />
            <figcaption>
              <p>No{id}</p>
              <h2 className="text-2xl">{name}</h2>
              <ul className="flex justify-center gap-2">
                {types.map((type) => (
                  <li
                    className={`${theme[type]} p-1 w-2/6 inline-block rounded mb-2 my-3`}
                    key={type}
                  >
                    {type}
                  </li>
                ))}
              </ul>
            </figcaption>
          </figure>
        </Link>
      ) : (
        'Pas de Pokémon'
      )}
    </>
  )
}
