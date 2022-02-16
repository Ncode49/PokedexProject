import { Outlet } from 'react-router-dom'
import { PokemonCard } from './components/PokemonCard'
import { PokemonListCards } from './components/PokemonListCards'
import './index'
export const App = () => {
  return (
    <div>
      <PokemonListCards />
      <Outlet />
    </div>
  )
}
