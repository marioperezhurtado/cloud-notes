import styles from './Profile.module.scss'

import Header from '../../components/Header/Header'

const Profile = () => {
  return (
    <>
      <Header />
      <div className={styles.profile}>
        <h1 className="text-highlighted">My Profile</h1>
        <div className={styles['profile-details']}>
          <div className={styles['profile-info']}>
            <h2>Mario Pérez Hurtado</h2>
            <h3>Email</h3>
            <p>marioph10@gmail.com</p>
            <h3>Created On</h3>
            <p>12/09/2020</p>
          </div>
          <div className={styles['profile-image']}></div>
        </div>
      </div>
    </>
  )
}

export default Profile
