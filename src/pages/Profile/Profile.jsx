import { useState } from 'react'
import useAuth from '../../contexts/AuthContext'

import styles from './Profile.module.scss'

import Header from '../../layout/Header/Header'

const Profile = () => {
  const { currentUser } = useAuth()
  const [imgLoading, setImgLoading] = useState(true)

  const imgLoadingHandler = () => setImgLoading(false)

  const name = currentUser.displayName || 'Unnamed User'
  const email = currentUser.email
  const createdAt = new Date(
    +currentUser.metadata.createdAt
  ).toLocaleDateString(navigator.language || 'es-US')
  const profileImgUrl = currentUser.photoURL

  const profileImg = (
    <img
      src={profileImgUrl}
      alt={`${email} profile picture`}
      className={imgLoading ? 'hidden' : ''}
      crossOrigin="Anonymous"
      onLoad={imgLoadingHandler}></img>
  )

  const profileImgPlaceholder = (
    <div className={styles['profile-img-placeholder']}>No profile picture</div>
  )

  return (
    <>
      <Header />
      <div className={styles.profile}>
        <h1 className="text-highlighted">My Profile</h1>
        <div className={styles['profile-details']}>
          <div className={styles['profile-info']}>
            <h2>{name}</h2>
            <h3>Email</h3>
            <p>{email}</p>
            <h3>Created On</h3>
            <p>{createdAt}</p>
          </div>
          <div className={styles['profile-image']}>
            {!profileImgUrl && profileImgPlaceholder}
            {profileImgUrl && profileImg}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
