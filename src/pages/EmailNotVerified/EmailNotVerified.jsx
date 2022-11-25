import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../../contexts/AuthContext'

import styles from './EmailNotVerified.module.scss'

import Header from '../../layout/Header/Header'

const EmailNotVerified = () => {
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  const { currentUser, verifyUserEmail, logout, errorCodes } = useAuth()

  if (!currentUser) return <Navigate to="/login" />

  const reloginHandler = () => logout()

  const sendVerificationHandler = async () => {
    setError('')
    setSuccess('')

    try {
      await verifyUserEmail()
      setSuccess('Verification email has been re-sent')
    } catch (err) {
      setError(errorCodes[err.code] || 'Failed to send verification email')
    }
  }

  return (
    <>
      <Header />
      <div className={styles['email-not-verified']}>
        <h2>
          Your email
          <span className="text-highlighted"> {`"${currentUser.email}"`} </span>
          is not verified
        </h2>
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}
        <p>To complete your account, please check your inbox</p>
        <div>
          <button
            className="btn btn-secondary"
            onClick={sendVerificationHandler}>
            Re-Send verification email
          </button>
          <button className="btn btn-primary" onClick={reloginHandler}>
            My email is already verified
          </button>
        </div>
      </div>
    </>
  )
}

export default EmailNotVerified
