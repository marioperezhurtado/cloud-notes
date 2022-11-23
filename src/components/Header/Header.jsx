import useAuth from '../../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'

import styles from './Header.module.scss'

const Header = () => {
  const navigate = useNavigate()
  const path = useLocation()
  const onProfile = path.pathname === '/profile'

  const { currentUser, logout } = useAuth()

  const goToProfileHandler = () => navigate('/profile')
  const goToNotesHandler = () => navigate('/notes')

  if (onProfile) {
    return (
      <header className={styles.header}>
        <button className="btn btn-primary" onClick={goToNotesHandler}>
          My Notes
        </button>
        <button className="btn btn-secondary" onClick={logout}>
          Log Out
        </button>
      </header>
    )
  }

  return (
    <header className={styles.header}>
      <button className="btn btn-primary" onClick={goToProfileHandler}>
        {currentUser.email}
      </button>
      <button className="btn btn-secondary" onClick={logout}>
        Log Out
      </button>
    </header>
  )
}
export default Header
