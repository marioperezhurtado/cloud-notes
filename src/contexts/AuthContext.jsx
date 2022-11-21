import { createContext, useContext, useState, useEffect } from 'react'

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

const AuthContext = createContext()

const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const loginGoogle = () => {
    return signInWithPopup(auth, googleProvider)
  }

  const logout = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })

    return unsubscribe
  }, [])

  const values = {
    currentUser,
    login,
    signup,
    loginGoogle,
    logout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthProvider }
export default useAuth
