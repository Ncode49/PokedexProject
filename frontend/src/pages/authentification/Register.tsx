// create a form that register the user in database

import { SyntheticEvent } from 'react'
import { AuthServiceType } from '../../services/authentification'

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
