import useUserNotes from '../../hooks/useUserNotes'

import styles from './Dashboard.module.scss'

import Header from '../../components/Header/Header'
import NoteList from '../../components/NoteList/NoteList'
import Loader from '../../components/Loader/Loader'

const Dashboard = () => {
  const { notes, loading, error } = useUserNotes()

  if (error) {
    return (
      <div className={styles.dashboard}>
        <h1 className="text-highlighted">Dashboard</h1>
        <p className="error-text">{error}</p>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className={styles.dashboard}>
        <h1 className="text-highlighted">Dashboard</h1>
        <div className={styles['your-notes']}>
          {loading && <Loader />}
          {notes && <NoteList notes={notes} />}
          {!loading && !notes && <p>No notes have been found</p>}
        </div>
      </div>
    </>
  )
}

export default Dashboard
