import { Link } from 'react-router-dom'
import { PokemonCard as PokemonCardProps } from '../services/PokemonType'
import { imageTheme, theme } from '../styles/TypeStyle'
import { CardCaption } from './CardCaption'

export const PokemonCard = ({ id, types, name, sprite }: PokemonCardProps) => {
  return (
    <>
      {id ? (
        <>
          <Link to={`/${name}`} key={id}>
            <figure className="  text-center flex flex-col justify-center">
              <img
                src={sprite}
                className={`${
                  imageTheme[types[0]]
                } border-2 w-52 border-black rounded`}
                alt={name}
              />
              <CardCaption id={id} name={name} types={types} />
            </figure>
          </Link>
        </>
      ) : (
        'Pas de Pokémon'
      )}
    </>
  )
}
