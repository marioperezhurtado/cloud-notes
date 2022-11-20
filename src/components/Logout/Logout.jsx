import useAuth from '../../contexts/AuthContext'

import styles from './Logout.module.scss'

const Logout = () => {
  const { currentUser, logout } = useAuth()

  if (!currentUser) return

  return (
    <button className={`${styles.logout} btn btn-secondary`} onClick={logout}>
      Log Out
    </button>
  )
}

export default Logout
