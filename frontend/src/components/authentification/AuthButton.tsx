import { useNavigate } from 'react-router-dom'
import { useAuth } from './ProviderAuth'

// when clicked => go to home
export const AuthButton = () => {
  let navigate = useNavigate()
  let auth = useAuth()
  // si connecté, ok
  return auth?.user ? (
    <p>
      Welcome!{' '}
      <button
        // sinon  ajoute la racine dans l'historique des routes
        onClick={() => {
          auth?.signout(() => navigate('/'))
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
}
