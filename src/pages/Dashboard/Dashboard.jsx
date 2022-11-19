import { useState, useEffect } from 'react'
import useDb from '../../contexts/DbContext'

import styles from './Dashboard.module.scss'

import NoteList from '../../components/NoteList/NoteList'

const Dashboard = () => {
  const [notes, setNotes] = useState()
  const [error, setError] = useState()

  const { getNotes } = useDb()

  const getNotesHandler = async () => {
    setError('')

    try {
      const res = await getNotes()
      setNotes(res)
    } catch (err) {
      setError('Failed to read notes')
    }
  }

  useEffect(() => {
    getNotesHandler()
  }, [])

  return (
    <div className={styles.dashboard}>
      <h1 className="text-highlighted">Dashboard</h1>
      <div className={styles['your-notes']}>
        {error && <p className="error-text">{error}</p>}
        <h2>Your Notes</h2>
        {notes && <NoteList notes={notes}></NoteList>}
      </div>
    </div>
  )
}

export default Dashboard
