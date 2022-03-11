export type Token = {
  accessToken: string
  refreshToken: string
} | null

export const getAuthHeader = () => {
  const userStr = localStorage.getItem('tokens')
  let user: Token = null
  if (userStr) user = JSON.parse(userStr)
  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken }
  } else {
    return {}
  }
}
