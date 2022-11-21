import { useState } from 'react'

import styles from './NoteList.module.scss'

import NewNote from '../NewNote/NewNote'
import NoteItem from '../NoteItem/NoteItem'

const NoteList = ({ notes }) => {
  const [newNoteOpen, setNewNoteOpen] = useState(false)

  const toggleNewNoteHandler = () => setNewNoteOpen((isOpen) => !isOpen)

  const noteItems = notes.map((n) => (
    <li key={n.id}>
      <NoteItem note={n}></NoteItem>
    </li>
  ))

  return (
    <ul className={styles['note-list']}>
      <div className={styles['note-list-head']}>
        <h2>{newNoteOpen ? 'Create New Note' : 'Recent Notes'}</h2>
        {!newNoteOpen && (
          <button className="btn btn-secondary" onClick={toggleNewNoteHandler}>
            Create note
          </button>
        )}
      </div>
      {newNoteOpen && <NewNote onClose={toggleNewNoteHandler} />}
      {noteItems}
    </ul>
  )
}

export default NoteList
