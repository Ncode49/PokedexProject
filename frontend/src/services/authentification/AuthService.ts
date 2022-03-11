export type AuthServiceLoginType = (username: string, password: string) => any
export type AuthServiceRegisterType = (
  username: string,
  password: string
) => any
export type AuthServiceType = {
  login: AuthServiceLoginType
  register: AuthServiceRegisterType
}

const login: AuthServiceLoginType = async (
  username: string,
  password: string
) => {
  const response = await postUsernamePassword(username, password, 'login')
  return response.json()
}

const register: AuthServiceRegisterType = async (
  username: string,
  password: string
) => {
  const response = await postUsernamePassword(username, password, 'register')
  return response.json()
}
export const AuthService: AuthServiceType = {
  login: login,
  register: register,
}
const postUsernamePassword = async (
  username: string,
  password: string,
  prefixeroute: string
) => {
  const authUrl = 'http://localhost:3000/auth/'
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  return await fetch(
    `${authUrl}${prefixeroute}`,
    createPostObject(username, password)
  )
}

const createPostObject = (username: string, password: string) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  return {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers,
  }
}
