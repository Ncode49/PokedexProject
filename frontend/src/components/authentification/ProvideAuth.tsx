import { createContext, useState } from 'react'
type Auth =
  | {
      user: string | null
      signin: any
      signout: any
    }
  | undefined
const authContext = createContext<Auth>(undefined)

// fourni les 3 methodes user, sign in sign out a tous les composants (pages) de l'application
// se place au dessus de tous les arbres et les entoures du provider
function ProvideAuth({ children }: any) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// hook avec state du user et deux pethode qui met a jour le user si true, ou deconnecte le user si false
// retourne etat et les deux methodes
function useProvideAuth() {
  const [user, setUser] = useState<string | null>(null)

  const signin = (cb: () => void) => {
    return fakeAuth.signin(() => {
      setUser('user')
      cb()
    })
  }

  const signout = (cb: () => void) => {
    return fakeAuth.signout(() => {
      setUser(null)
      cb()
    })
  }

  return {
    user,
    signin,
    signout,
  }
}

const fakeAuth = {
  isAuthenticated: false,
  signin(cb: () => void) {
    fakeAuth.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb: () => void) {
    fakeAuth.isAuthenticated = false
    setTimeout(cb, 100)
  },
}
