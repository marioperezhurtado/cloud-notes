import useAuth from '../../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth()

  if (!currentUser) return <Navigate to="/login" />

  if (!currentUser.emailVerified) return <Navigate to="/email-not-verified" />

  return children
}

export default ProtectedRoute
