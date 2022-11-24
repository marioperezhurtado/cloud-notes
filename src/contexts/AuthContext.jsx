import { createContext, useContext, useState, useEffect } from 'react'

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth'
import { auth, googleProvider, githubProvider } from '../firebase'

const AuthContext = createContext()

const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signup = async ({ name, email, password }) => {
    await createUserWithEmailAndPassword(auth, email, password)
    return updateProfile(auth.currentUser, { displayName: name })
  }

  const loginGoogle = () => {
    return signInWithPopup(auth, googleProvider)
  }

  const loginGithub = () => {
    return signInWithPopup(auth, githubProvider)
  }

  const logout = () => {
    return signOut(auth)
  }

  const updateUser = ({ userData }) => {
    return updateProfile(currentUser, userData)
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
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
    loginGithub,
    logout,
    updateUser,
    resetPassword
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthProvider }
export default useAuth
