import { useState } from 'react'
import useUserNotes from '../../hooks/useUserNotes'

import styles from './MyNotes.module.scss'

import Header from '../../components/Header/Header'
import NoteList from '../../components/NoteList/NoteList'
import Loader from '../../components/Loader/Loader'
import NewNote from '../../components/NewNote/NewNote'

const MyNotes = () => {
  const { notes, loading, error } = useUserNotes()

  const [newNoteOpen, setNewNoteOpen] = useState(false)

  const openNewNoteHandler = () => setNewNoteOpen(true)
  const closeNewNoteHandler = () => setNewNoteOpen(false)

  const emptyText = <p>You have not created any note yet</p>

  return (
    <>
      <Header />
      <div className={styles.notes}>
        <h1 className="text-highlighted">My Notes</h1>
        <div className={styles['your-notes']}>
          {loading && <Loader />}
          {!loading && error && <p className="error-text">{error}</p>}

          <div className={loading ? 'hidden' : styles['note-list']}>
            <div className={styles['note-list-head']}>
              <h2>{newNoteOpen ? 'Create New Note' : 'Recent Notes'}</h2>
              {!newNoteOpen && (
                <button
                  className="btn btn-secondary"
                  onClick={openNewNoteHandler}>
                  Create note
                </button>
              )}
            </div>
            {newNoteOpen && <NewNote onClose={closeNewNoteHandler} />}
            <NoteList notes={notes} />
            {!notes && !newNoteOpen && emptyText}
          </div>
        </div>
      </div>
    </>
  )
}

export default MyNotes
