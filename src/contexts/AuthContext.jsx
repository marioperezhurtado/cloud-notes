import { createContext, useContext, useState, useEffect } from 'react'

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../firebase'

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })

    return unsubscribe
  }, [])

  const values = {
    currentUser,
    login,
    signup
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthProvider }
export default useAuth
