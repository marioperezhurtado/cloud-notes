import { useState, useEffect } from 'react'

import useDb from '../contexts/DbContext'
import useAuth from '../contexts/AuthContext'

const useUserNotes = () => {
  const [notes, setNotes] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  const { getNotes, notesListener } = useDb()
  const { currentUser } = useAuth()
  const userId = currentUser.uid

  const onGetNotes = async () => {
    setError('')
    setLoading(true)

    try {
      const res = await getNotes({ userId })
      if (res.length) setNotes(res)
    } catch {
      setError('No notes have been found')
    }

    setLoading(false)
  }

  useEffect(() => {
    const unsubscribe = notesListener({ userId, onGetNotes })
    return unsubscribe
  }, [])

  return { notes, loading, error }
}

export default useUserNotes
