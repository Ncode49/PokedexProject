import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './ProviderAuth'

interface LocationState {
  from: {
    pathname: string
  }
}
export const LoginPage = () => {
  let navigate = useNavigate()
  let location = useLocation()
  let auth = useAuth()
  console.log(auth)

  let { from } = (location.state as LocationState) || {
    from: { pathname: '/' },
  }
  console.log(from)
  let login = () => {
    auth?.signin(() => {
      navigate('pokedex', { replace: true })
    })
  }

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  )
}
