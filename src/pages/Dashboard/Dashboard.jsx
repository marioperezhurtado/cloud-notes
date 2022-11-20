import { useState, useEffect } from 'react'
import useDb from '../../contexts/DbContext'

import styles from './Dashboard.module.scss'

import NoteList from '../../components/NoteList/NoteList'

const Dashboard = () => {
  const [notes, setNotes] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const { getNotes } = useDb()

  const getNotesHandler = async () => {
    setError('')
    setLoading(true)

    try {
      const res = await getNotes({ userId: 'fXRNFZimk8NHyrh808y3' })
      if (res.length) setNotes(res)
    } catch (err) {
      console.log(err)
      setError('Failed to read notes')
    }

    setLoading(false)
  }

  useEffect(() => {
    getNotesHandler()
  }, [])

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
        <h2>Your Notes</h2>
        {loading && <p>Loading...</p>}
        {notes && <NoteList notes={notes}></NoteList>}
        {!loading && !notes && <p>No notes have been found</p>}
      </div>
    </div>
  )
}

export default Dashboard
