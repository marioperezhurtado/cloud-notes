import styles from './NoteList.module.scss'

import NoteItem from '../NoteItem/NoteItem'

const NoteList = ({ notes }) => {
  if (!notes) return

  const noteItems = notes.map((n) => (
    <li key={n.id}>
      <NoteItem note={n}></NoteItem>
    </li>
  ))

  return <ul className={styles['note-list']}>{noteItems}</ul>
}

export default NoteList
