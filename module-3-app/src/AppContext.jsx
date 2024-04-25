import React, { createContext, useContext, useState } from 'react'
import App from './App'
const Context = createContext()
export const useAppContext = () => useContext(Context)
const AppContext = ({ children }) => {
  const [modal, setModal] = useState('close')

  // allnotes
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem('allNotes')) || []
  )
  // notes of 1 note
  const [notesData, setNotesData] = useState([])
  // show notes
  const [showNoteData, setShowNoteData] = useState(false)
  return (
    <>
      <Context.Provider
        value={{
          modal,
          setModal,
          showNoteData,
          setShowNoteData,
          notes,
          setNotes,
          notesData,
          setNotesData,
        }}
      >
        {children}
      </Context.Provider>
    </>
  )
}

export default AppContext
