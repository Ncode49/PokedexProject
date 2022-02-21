import { TypesPokemon } from '../services/PokemonType'
import { theme } from '../styles/TypeStyle'

export type CardCaptionProps = {
  id: number
  name: string
  types: TypesPokemon
}
export const CardCaption = ({ id, name, types }: CardCaptionProps) => {
  return (
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
  )
}
