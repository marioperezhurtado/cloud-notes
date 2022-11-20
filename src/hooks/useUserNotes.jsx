import { useState, useEffect } from 'react'

import useDb from '../contexts/DbContext'

const useUserNotes = ({ userId }) => {
  const [notes, setNotes] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  const { getNotes, onRefreshNotes } = useDb()

  const onGetNotes = async () => {
    setError('')
    setLoading(true)

    try {
      const res = await getNotes({ userId: 'fXRNFZimk8NHyrh808y3' })
      if (res.length) setNotes(res)
    } catch (err) {
      setError('No notes have been found')
    }

    setLoading(false)
  }

  useEffect(() => {
    const unsub = onRefreshNotes({ userId, onGetNotes })
    return unsub
  }, [])

  return { notes, loading, error }
}

export default useUserNotes
