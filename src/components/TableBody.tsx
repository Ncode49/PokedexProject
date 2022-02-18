import { StatPokemon } from '../services/retrievePokemonData'

type TableBodyProps = {
  keys: string[]
  stats: StatPokemon
  averageTypeStats: StatPokemon
}
export const TableBody = ({
  keys,
  stats,
  averageTypeStats,
}: TableBodyProps) => {
  return (
    <tbody>
      {keys.map((key) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{stats[key]}</td>
          <td>{averageTypeStats[key]}</td>
        </tr>
      ))}
    </tbody>
  )
}
