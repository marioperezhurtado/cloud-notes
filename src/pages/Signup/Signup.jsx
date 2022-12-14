import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../../contexts/AuthContext'

import SocialLogin from '../../components/SocialLogin/SocialLogin'
import PasswordInput from '../../layout/PasswordInput/PasswordInput'

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const { signup, errorCodes } = useAuth()

  const formRef = useRef()

  const signupHandler = async (e) => {
    e.preventDefault()
    setError('')

    const name = formRef.current.name.value
    const email = formRef.current.email.value
    const password = formRef.current.password.value
    const passwordRepeat = formRef.current.passwordRepeat.value

    if (!name || !email || !password || !passwordRepeat) {
      setError('There are missing fields')
      return
    }

    if (password !== passwordRepeat) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      await signup({ name, email, password })
      formRef.current.reset()
      navigate('/notes')
    } catch (err) {
      setError(errorCodes[err.code] || 'Failed to sign up')
    }

    setLoading(false)
  }

  return (
    <div className="auth-form">
      <form ref={formRef} onSubmit={signupHandler}>
        <h2 className="text-highlighted">Create an account</h2>
        {error && <p className="error-text">{error}</p>}
        <label htmlFor="name">Name</label>
        <input type="text" name="name" autoComplete="your-name" />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="email@example.com"
          autoComplete="your-email"
        />
        <label htmlFor="password">Password</label>
        <PasswordInput name="password" autoComplete="your-password" />
        <label htmlFor="passwordRepeat">Repeat Pasword</label>
        <PasswordInput
          name="passwordRepeat"
          autoComplete="repeat-your-password"
        />
        <SocialLogin onSetError={setError}></SocialLogin>
        <div className="auth-actions">
          <button className="btn btn-primary" disabled={loading}>
            Sign Up
          </button>
        </div>
      </form>
      <p>
        Already have an account?{' '}
        <span>
          <Link to="/login" className="text-highlighted">
            Log In
          </Link>
        </span>
      </p>
    </div>
  )
}

export default Login
