import { useState, useRef } from 'react'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'

import styles from './NewNote.module.scss'

const NewNote = ({ onClose }) => {
  const [error, setError] = useState()

  const { currentUser } = useAuth()
  const { setNote } = useDb()

  const formRef = useRef()

  const createNoteHandler = async (e) => {
    e.preventDefault('')
    setError('')

    const title = formRef.current.title.value
    const text = formRef.current.text.value

    if (!title || !text) {
      setError('There are missing fields')
      return
    }

    try {
      await setNote({ title, text, userId: currentUser.uid })
      formRef.current.reset()
      onClose()
    } catch (err) {
      console.log(err)
      setError('Failed to create note')
    }
  }

  return (
    <div className={styles['new-note']}>
      {error && <p className="error-text">{error}</p>}
      <form ref={formRef} onSubmit={createNoteHandler}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" autoComplete="note-title" />
        </div>
        <div>
          <label htmlFor="text">Text</label>
          <textarea name="text" autoComplete="note-text" />
        </div>
        <div className={styles['new-note-actions']}>
          <button className="btn btn-secondary" type="text" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary">Save Note</button>
        </div>
      </form>
    </div>
  )
}

export default NewNote
