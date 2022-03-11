import { AuthServiceType } from '../../services/authentification'

export const Login = (authService: AuthServiceType) => {
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      username: { value: string }
      password: { value: string }
    }
    const response = await authService.login(
      target.username.value,
      target.password.value
    )
    if (response.type == 'success')
      localStorage.setItem('tokens', JSON.stringify(response))
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
      <input className="rounded" type="submit" value="login"></input>
    </form>
  )
}
