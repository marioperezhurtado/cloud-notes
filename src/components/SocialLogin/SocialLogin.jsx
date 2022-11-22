import { useState } from 'react'
import useAuth from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

import styles from './SocialLogin.module.scss'

import GoogleIcon from '../../assets/GoogleIcon'
import GithubIcon from '../../assets/GithubIcon'

const SocialLogin = ({ onSetError }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState()

  const { loginGoogle, loginGithub } = useAuth()

  const loginGoogleHandler = async (e) => {
    e.preventDefault()
    onSetError('')
    setLoading(true)

    try {
      await loginGoogle()
      navigate('/notes')
    } catch {
      onSetError('Failed to log in with Google')
    }

    setLoading(false)
  }

  const loginGithubHandler = async (e) => {
    e.preventDefault()
    onSetError('')
    setLoading(true)

    try {
      await loginGithub()
      navigate('/notes')
    } catch {
      onSetError('Failed to log in with GitHub')
    }

    setLoading(false)
  }

  return (
    <div className={styles['social-login']}>
      <button
        className={`${styles['login-google']} btn`}
        onClick={loginGoogleHandler}
        disabled={loading}
        type="button">
        <GoogleIcon />
        Login with Google
      </button>
      <button
        className={`${styles['login-github']} btn`}
        onClick={loginGithubHandler}
        disabled={loading}
        type="button">
        <GithubIcon />
        Login with GitHub
      </button>
    </div>
  )
}

export default SocialLogin
