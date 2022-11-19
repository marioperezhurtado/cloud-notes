import NoteItem from '../NoteItem/NoteItem'
import styles from './NoteList.module.scss'

const NoteList = ({ notes }) => {
  const noteItems = notes.map((n) => (
    <li key={n.id}>
      <NoteItem note={n}></NoteItem>
    </li>
  ))

  return <ul className={styles['note-list']}>{noteItems}</ul>
}

export default NoteList
