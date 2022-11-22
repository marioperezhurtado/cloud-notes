import styles from './EditNote.module.scss'

const EditNote = ({ note, onEdit, onCancel }) => {
  if (!note) return

  const title = note.title
  const text = note.text

  return (
    <div className={styles['edit-note']}>
      <form>
        <div>
          <input type="text" name="title" defaultValue={title} />
        </div>
        <div>
          <textarea type="text" name="text" defaultValue={text} />
        </div>
        <div className={styles['edit-note-actions']}>
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary">Edit Note</button>
        </div>
      </form>
    </div>
  )
}

export default EditNote
