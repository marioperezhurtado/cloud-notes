import styles from './Dashboard.module.scss'

import NoteList from '../../components/NoteList/NoteList'
import useUserNotes from '../../hooks/useUserNotes'

const Dashboard = () => {
  const { notes, loading, error } = useUserNotes({
    userId: 'fXRNFZimk8NHyrh808y3'
  })

  if (error) {
    return (
      <div className={styles.dashboard}>
        <h1 className="text-highlighted">Dashboard</h1>
        <p className="error-text">{error}</p>
      </div>
    )
  }

  return (
    <div className={styles.dashboard}>
      <h1 className="text-highlighted">Dashboard</h1>
      <div className={styles['your-notes']}>
        {loading && <p>Loading...</p>}
        {notes && <NoteList notes={notes}></NoteList>}
        {!loading && !notes && <p>No notes have been found</p>}
      </div>
    </div>
  )
}

export default Dashboard
