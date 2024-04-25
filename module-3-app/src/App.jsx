import { useState } from 'react'
import './App.css'
import './App.css'
import Modal from './components/modal'
import NoteData from './components/noteData'
import Notes from './components/notes'
import { useAppContext } from './AppContext'
function App() {
  const { modal } = useAppContext()
  return (
    <>
      {modal === 'open' && <Modal />}
      <main className='main__container'>
        {<Notes />}
        {<NoteData />}
      </main>
    </>
  )
}

export default App
