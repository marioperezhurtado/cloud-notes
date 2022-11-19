import styles from './NoteItem.module.scss'

const NoteItem = ({ note }) => {
  const noteDate = new Date(note.date.seconds * 1000).toLocaleDateString(
    navigator.language
  )

  return (
    <div className={styles.note}>
      <h3>{note.title}</h3>
      <p>{note.text}</p>
      <span>{noteDate}</span>
    </div>
  )
}

export default NoteItem
