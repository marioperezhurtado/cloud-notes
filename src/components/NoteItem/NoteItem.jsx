import { useState } from 'react'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'

import styles from './NoteItem.module.scss'

import OptionsIcon from '../../assets/OptionsIcon'

const NoteItem = ({ note }) => {
  const [error, setError] = useState()

  const { currentUser } = useAuth()
  const { deleteNote } = useDb()

  const userId = currentUser.uid
  const noteId = note.id

  const deleteNoteHandler = async () => {
    setError('')

    try {
      await deleteNote({ userId, noteId })
    } catch {
      setError('Failed to delete note')
    }
  }

  const noteDate = new Date(note.date.seconds * 1000).toLocaleDateString(
    navigator.language
  )

  return (
    <div className={styles.note}>
      <div className={styles['note-options']}>
        <OptionsIcon />
        <div className={styles['note-options-dropdown']}>
          <button className="btn btn-secondary">Edit</button>
          <button className="btn btn-secondary" onClick={deleteNoteHandler}>
            Delete
          </button>
        </div>
      </div>

      <h3>{note.title}</h3>
      <p>{note.text}</p>
      <span>{noteDate}</span>
      {error && <p className="error-text">{error}</p>}
    </div>
  )
}

export default NoteItem
