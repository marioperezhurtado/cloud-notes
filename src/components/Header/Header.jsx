import useAuth from '../../contexts/AuthContext'

import styles from './Header.module.scss'

const ProfileImage = () => {
  const { currentUser, logout } = useAuth()

  if (!currentUser) return

  return (
    <header className={styles.header}>
      <button className="btn">marioph10@gmail.com</button>
      <button className="btn btn-secondary" onClick={logout}>
        Log Out
      </button>
    </header>
  )
}
export default ProfileImage
