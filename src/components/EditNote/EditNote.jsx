import { useState, useRef } from 'react'

import styles from './EditNote.module.scss'

const EditNote = ({ note, onEdit, onCancel }) => {
  const [error, setError] = useState()
  const formRef = useRef()

  if (!note) return

  const prevTitle = note.title
  const prevText = note.text

  const editNoteHandler = (e) => {
    e.preventDefault()
    setError('')

    const title = formRef.current.title.value
    const text = formRef.current.text.value

    if (!title || !text) {
      setError('There are missing fields')
      return
    }

    onEdit({ title, text })
  }

  return (
    <div className={styles['edit-note']}>
      <form ref={formRef} onSubmit={editNoteHandler}>
        {error && <p className="error-text">{error}</p>}
        <div>
          <input type="text" name="title" defaultValue={prevTitle} />
        </div>
        <div>
          <textarea type="text" name="text" defaultValue={prevText} />
        </div>
        <div className={styles['edit-note-actions']}>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
            Confirm
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditNote
