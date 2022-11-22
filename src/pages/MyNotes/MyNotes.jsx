import useUserNotes from '../../hooks/useUserNotes'

import styles from './MyNotes.module.scss'

import Header from '../../components/Header/Header'
import NoteList from '../../components/NoteList/NoteList'
import Loader from '../../components/Loader/Loader'

const MyNotes = () => {
  const { notes, loading, error } = useUserNotes()

  if (error) {
    return (
      <div className={styles.notes}>
        <h1 className="text-highlighted">My Notes</h1>
        <p className="error-text">{error}</p>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className={styles.notes}>
        <h1 className="text-highlighted">My Notes</h1>
        <div className={styles['your-notes']}>
          {loading && <Loader />}
          <NoteList notes={notes} />
        </div>
      </div>
    </>
  )
}

export default MyNotes
