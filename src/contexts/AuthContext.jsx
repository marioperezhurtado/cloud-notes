import { createContext, useContext, useState, useEffect } from 'react'

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth'
import { auth, googleProvider, githubProvider } from '../firebase'

const AuthContext = createContext()

const errorCodes = {
  'auth/user-not-found': 'There is no account with this email',
  'auth/wrong-password': 'Incorrect password',
  'auth/email-already-exists': 'There is already an account with this email',
  'auth/phone-number-already-exists':
    'There is already an account with this phone number',
  'auth/insufficient-permission': 'Your account is not allowed to do this'
}

const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signup = async ({ name, email, password }) => {
    await createUserWithEmailAndPassword(auth, email, password)
    await sendEmailVerification(auth.currentUser)
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

  const verifyUserEmail = () => {
    return sendEmailVerification(currentUser)
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsuscribe
  })

  const values = {
    currentUser,
    errorCodes,
    login,
    signup,
    loginGoogle,
    loginGithub,
    logout,
    updateUser,
    verifyUserEmail,
    resetPassword
  }

  return (
    <AuthContext.Provider value={values}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
export default useAuth
