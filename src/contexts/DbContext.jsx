import { createContext, useContext } from 'react'

import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const DbContext = createContext()

const useDb = () => useContext(DbContext)

const DbProvider = ({ children }) => {
  const getNotes = () => {
    return getDocs(collection(db, 'notes')).then((query) => {
      const notes = []
      query.forEach((doc) => notes.push({ ...doc.data(), id: doc.id }))
      return notes
    })
  }

  const dbValues = {
    getNotes
  }

  return <DbContext.Provider value={dbValues}>{children}</DbContext.Provider>
}

export { DbProvider }
export default useDb
