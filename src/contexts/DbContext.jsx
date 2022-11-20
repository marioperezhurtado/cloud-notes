import { createContext, useContext } from 'react'

import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const DbContext = createContext()

const useDb = () => useContext(DbContext)

const DbProvider = ({ children }) => {
  const onRefreshUserNotes = ({ userId, onGetNotes }) => {
    return onSnapshot(collection(db, 'users', userId, 'notes'), () =>
      onGetNotes()
    )
  }

  const getNotes = ({ userId }) => {
    return getDocs(collection(db, 'users', userId, 'notes')).then((query) => {
      const notes = []
      query.forEach((doc) => notes.push({ ...doc.data(), id: doc.id }))
      return notes
    })
  }

  const dbValues = {
    getNotes,
    onRefreshUserNotes
  }

  return <DbContext.Provider value={dbValues}>{children}</DbContext.Provider>
}

export { DbProvider }
export default useDb
