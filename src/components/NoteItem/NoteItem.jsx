import { useState } from 'react'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'

import styles from './NoteItem.module.scss'

import OptionsIcon from '../../assets/OptionsIcon'
import EditNote from '../EditNote/EditNote'

const NoteItem = ({ note }) => {
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(false)

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

  const editNoteHandler = (e) => {
    e.preventDefault()
  }

  const startEditingNoteHandler = () => setEditingNote(true)
  const stopEdittingNoteHandler = () => setEditingNote(false)
  const toggleOptionsHandler = () => setOptionsOpen((open) => !open)

  const noteDate = new Date(note.date.seconds * 1000).toLocaleDateString(
    navigator.language
  )

  if (editingNote) {
    return (
      <EditNote
        note={note}
        onEdit={editNoteHandler}
        onCancel={stopEdittingNoteHandler}></EditNote>
    )
  }

  return (
    <div className={styles.note}>
      <div className={styles['note-options']}>
        <div className="note-options-icon" onClick={toggleOptionsHandler}>
          <OptionsIcon />
        </div>

        {optionsOpen && (
          <div className={styles['note-options-dropdown']}>
            <button
              className="btn btn-secondary"
              onClick={startEditingNoteHandler}>
              Edit
            </button>
            <button className="btn btn-secondary" onClick={deleteNoteHandler}>
              Delete
            </button>
          </div>
        )}
      </div>

      <h3>{note.title}</h3>
      <p>{note.text}</p>
      <span>{noteDate}</span>
      {error && <p className="error-text">{error}</p>}
    </div>
  )
}

export default NoteItem
