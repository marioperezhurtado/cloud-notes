import { createContext, useContext } from 'react'

import {
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore'
import { db } from '../firebase'

const DbContext = createContext()

const useDb = () => useContext(DbContext)

const DbProvider = ({ children }) => {
  const notesListener = ({ userId, onGetNotes }) => {
    return onSnapshot(collection(db, 'users', userId, 'notes'), () =>
      onGetNotes()
    )
  }

  const getNotes = ({ userId }) => {
    const ref = collection(db, 'users', userId, 'notes')
    const qry = query(ref, orderBy('date', 'desc'))
    return getDocs(qry).then((query) => {
      const notes = []
      query.forEach((doc) => notes.push({ ...doc.data(), id: doc.id }))
      return notes
    })
  }

  const dbValues = {
    getNotes,
    notesListener
  }

  return <DbContext.Provider value={dbValues}>{children}</DbContext.Provider>
}

export { DbProvider }
export default useDb
