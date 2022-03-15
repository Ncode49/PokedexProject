import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthButton } from './components/authentification/AuthButton'
import { LoginPage } from './components/authentification/LoginPage'
import { ProviderAuth } from './components/authentification/ProviderAuth'
import './index'
import { PokedexHome } from './pages/pokedex/PokedexHome'
import { PokemonDetails } from './pages/pokedex/PokemonDetails'
export const App = () => {
  return (
    <BrowserRouter>
      <ProviderAuth>
        <AuthButton />
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="pokedex" element={<PokedexHome />}></Route>
          <Route path="pokedex/:pokemonName" element={<PokemonDetails />} />
        </Routes>
      </ProviderAuth>
    </BrowserRouter>
  )
}
