import { useState } from 'react'
import useAuth from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

import styles from './SocialLogin.module.scss'

import GoogleIcon from '../../assets/GoogleIcon'

const SocialLogin = ({ onSetError }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState()

  const { loginGoogle } = useAuth()

  const loginGoogleHandler = async (e) => {
    e.preventDefault()
    onSetError('')
    setLoading(true)

    try {
      await loginGoogle()
      navigate('/dashboard')
    } catch {
      onSetError('Failed to log in with Google')
    }

    setLoading(false)
  }

  return (
    <div className={styles['social-login']}>
      <button
        className={`${styles['login-google']} btn`}
        onClick={loginGoogleHandler}
        disabled={loading}>
        <GoogleIcon />
        Login with Google
      </button>
    </div>
  )
}

export default SocialLogin
