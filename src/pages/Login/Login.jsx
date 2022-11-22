import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import useAuth from '../../contexts/AuthContext'

import SocialLogin from '../../components/SocialLogin/SocialLogin'

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const { login } = useAuth()

  const formRef = useRef()

  const loginHandler = async (e) => {
    e.preventDefault()
    setError('')

    const email = formRef.current.email.value
    const password = formRef.current.password.value

    if (!email || !password) {
      setError('There are missing fields')
      return
    }

    setLoading(true)

    try {
      await login(email, password)
      formRef.current.reset()
      navigate('/notes')
    } catch {
      setError('Failed to log in')
    }

    setLoading(false)
  }

  return (
    <div className="auth-form">
      <form ref={formRef} onSubmit={loginHandler}>
        <h2 className="text-highlighted">Welcome Back</h2>
        {error && <p className="error-text">{error}</p>}
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="email@example.com"
          autoComplete="your-email"
        />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" autoComplete="your-password" />
        <SocialLogin onSetError={setError}></SocialLogin>
        <button className="btn btn-primary" disabled={loading} type="submit">
          Log In
        </button>
      </form>
      <p>
        Need an account?{' '}
        <span>
          <Link to="/signup" className="text-highlighted">
            Sign Up
          </Link>
        </span>
      </p>
    </div>
  )
}

export default Login
