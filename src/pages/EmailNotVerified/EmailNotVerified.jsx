import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../contexts/AuthContext'

import styles from './EmailNotVerified.module.scss'

const EmailNotVerified = () => {
  const navigate = useNavigate()
  const [error, setError] = useState()

  const { currentUser, logout } = useAuth()

  if (!currentUser) return

  const logoutHandler = async () => {
    setError('')

    try {
      await logout()
      navigate('/login')
    } catch {
      setError('Failed to log out')
    }
  }

  const reloadHandler = () => location.reload()

  return (
    <div className={styles['email-not-verified']}>
      <h2>
        Your email
        <span className="text-highlighted"> {`"${currentUser.email}"`} </span>
        is not verified
      </h2>
      {error && <p className="error-text">{error}</p>}
      <p>To complete your account, please check your inbox</p>
      <div>
        <button className="btn btn-secondary">
          Re-Send verification email
        </button>
        <button className="btn btn-primary" onClick={reloadHandler}>
          My email is already verified
        </button>
        <button className="btn btn-secondary" onClick={logoutHandler}>
          Log Out
        </button>
      </div>
    </div>
  )
}

export default EmailNotVerified
