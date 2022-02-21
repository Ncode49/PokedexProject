import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { App } from './App'
import { PokemonDetails } from './pages/PokemonDetails'

import './styles.css'
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/:pokemonName" element={<PokemonDetails />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)
