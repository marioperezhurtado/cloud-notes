import useAuth from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

import styles from './Header.module.scss'

const Header = () => {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  const goToProfileHandler = () => navigate('/profile')

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
