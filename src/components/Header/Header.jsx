import useAuth from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

import styles from './Header.module.scss'

const Header = () => {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  if (!currentUser) return

  const goToProfileHandler = () => navigate('/profile')

  return (
    <header className={styles.header}>
      <button className="btn" onClick={goToProfileHandler}>
        marioph10@gmail.com
      </button>
      <button className="btn btn-secondary" onClick={logout}>
        Log Out
      </button>
    </header>
  )
}
export default Header
