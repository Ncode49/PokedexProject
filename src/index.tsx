import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { App } from './App'
import { PokemonListCards } from './components/PokemonListCards'
import Home from './pages/Home'
import Profil from './pages/Profil'
import Services from './pages/Services'
import './styles.css'
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PokemonListCards />}></Route>
      <Route path="/:pokemonName" element={<p>Je suis un pokemon</p>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)
