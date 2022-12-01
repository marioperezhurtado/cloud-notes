import { useState } from 'react'

import ShowPasswordIcon from '../../assets/ShowPasswordIcon'
import HidePasswordIcon from '../../assets/HidePasswordIcon'

import styles from './PasswordInput.module.scss'

const PasswordInput = (inputProps) => {
  const [hidden, setHidden] = useState(true)

  const togglePasswordHandler = () => setHidden((h) => !h)

  if (hidden) {
    return (
      <div className={styles['password-toggle']}>
        <input type="password" {...inputProps} />
        <div onClick={togglePasswordHandler}>
          <ShowPasswordIcon />
        </div>
      </div>
    )
  }

  return (
    <div className={styles['password-toggle']}>
      <input type="text" {...inputProps} />
      <div onClick={togglePasswordHandler}>
        <HidePasswordIcon />
      </div>
    </div>
  )
}

export default PasswordInput
