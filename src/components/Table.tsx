import { StatPokemon } from '../services/retrievePokemonData'
import { TableBody } from './TableBody'
import { TableHeader } from './TableHeader'
type TableProps = {
  keys: string[]
  stats: StatPokemon
  averageTypeStats: StatPokemon
}
export const Table = ({ keys, stats, averageTypeStats }: TableProps) => {
  return (
    <table>
      <TableHeader />
      <TableBody
        keys={keys}
        stats={stats}
        averageTypeStats={averageTypeStats}
      />
    </table>
  )
}
