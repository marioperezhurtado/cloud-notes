import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../contexts/AuthContext'

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { resetPassword } = useAuth()

  const formRef = useRef()

  const resetPasswordHandler = async (e) => {
    e.preventDefault()
    setError('')

    const email = formRef.current.email.value

    if (!email) {
      setError('Email cannot be empty')
      return
    }

    setLoading(true)

    try {
      await resetPassword(email)
      setSuccess('Check your inbox to finish resetting your password')
      formRef.current.reset()
    } catch {
      setError('Failed to send reset password email')
    }

    setLoading(false)
  }

  return (
    <div className="auth-form">
      <form ref={formRef} onSubmit={resetPasswordHandler}>
        <h2 className="text-highlighted">Reset Your Password</h2>
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="email@example.com"
          autoComplete="your-email"
        />
        <div className="auth-actions">
          <Link to="/login">Log In</Link>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            Reset password
          </button>
        </div>
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

export default ForgotPassword
