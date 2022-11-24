import { useState } from 'react'
import useAuth from '../../contexts/AuthContext'
import useDb from '../../contexts/DbContext'

import styles from './NoteItem.module.scss'

import OptionsIcon from '../../assets/OptionsIcon'
import EditNote from '../EditNote/EditNote'
import Modal from '../../layout/Modal/Modal'

const NoteItem = ({ note }) => {
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(false)
  const [deletingNote, setDeletingNote] = useState(false)

  const [error, setError] = useState()

  const { currentUser } = useAuth()
  const { deleteNote, updateNote } = useDb()

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

  const editNoteHandler = async ({ title, text }) => {
    setError('')

    try {
      await updateNote({ title, text, userId, noteId })
    } catch {
      setError('Failed to edit note')
    }

    setEditingNote(false)
    setOptionsOpen(false)
  }

  const toggleOptionsHandler = () => setOptionsOpen((open) => !open)
  const startEditingNoteHandler = () => setEditingNote(true)
  const stopEdittingNoteHandler = () => setEditingNote(false)
  const openDeletingModalHanlder = () => setDeletingNote(true)
  const closeDeletingModalHandler = () => setDeletingNote(false)

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

  const closeOptionsButton = (
    <button className="btn btn-secondary">Close</button>
  )

  return (
    <>
      <div className={styles.note}>
        <div className={styles['note-options']}>
          <div onClick={toggleOptionsHandler}>
            {optionsOpen ? closeOptionsButton : <OptionsIcon />}
          </div>

          {optionsOpen && (
            <>
              <button
                className="btn btn-secondary"
                onClick={startEditingNoteHandler}>
                Edit
              </button>
              <button
                className="btn btn-secondary"
                onClick={openDeletingModalHanlder}>
                Delete
              </button>
            </>
          )}
        </div>

        <h3>{note.title}</h3>
        <p>{note.text}</p>
        <span>{noteDate}</span>
        {error && <p className="error-text">{error}</p>}
      </div>
      {deletingNote && (
        <Modal onClose={closeDeletingModalHandler}>
          <h2>Are you sure you want to delete this note?</h2>
          <div>
            <button className="btn btn-secondary" onClick={deleteNoteHandler}>
              Delete
            </button>
            <button
              className="btn btn-primary"
              onClick={closeDeletingModalHandler}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default NoteItem
