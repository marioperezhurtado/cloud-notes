import { createPortal } from 'react-dom'

import styles from './Modal.module.scss'

import Backdrop from '../Backdrop/Backdrop'

const Modal = ({ onClose, children }) => {
  return createPortal(
    <>
      <Backdrop onClose={onClose} />
      <div className={styles.modal}>{children}</div>
    </>,
    document.querySelector('#root')
  )
}

export default Modal
