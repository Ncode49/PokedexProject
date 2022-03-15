import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomeButton } from './components/authentification/HomeButton'
import './index'
import { Login } from './pages/authentification/Login'
import { Register } from './pages/authentification/Register'
import { PokedexHome } from './pages/pokedex/PokedexHome'
import { PokemonDetails } from './pages/pokedex/PokemonDetails'
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokedexHome />}></Route>
        <Route path="/:pokemonName" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  )
}
