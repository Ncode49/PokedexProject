// create a form that register the user in database

import { SyntheticEvent } from 'react'
import { AuthServiceType } from '../../services/authentification'

const register = async (username: string, password: string) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  const response = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers,
  })
  return response.json()
}

export const Register = (authService: AuthServiceType) => {
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      username: { value: string }
      password: { value: string }
    }
    const response = await authService.register(
      target.username.value,
      target.password.value
    )
  }
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label>
        Enter your username:
        <input type="text" name="username" required />
      </label>
      <label>
        Enter your password:
        <input type="text" name="password" required />
      </label>
      <input className="rounded" type="submit" value="register"></input>
    </form>
  )
}
