import React from 'react'
import './note.css'
import { useAppContext } from '../../AppContext'
const Note = ({ id, name, color }) => {
  const { setShowNoteData, setNotesData } = useAppContext()

  const handleClick = () => {
    setShowNoteData((old) => true)
    const notesData = JSON.parse(localStorage.getItem('allNotes')).find(
      (note) => note.id === id
    )

    setNotesData(() => [{ ...notesData }])
  }
  return (
    <>
      <article className={'note'} onClick={handleClick}>
        <p style={{ backgroundColor: color }} className='note__img'>
          <span>
            {name[0].toLocaleUpperCase() +
              name[name.length - 1].toLocaleUpperCase()}
          </span>
        </p>
        <h1 className='note__name'>
          <span>{name}</span>
        </h1>
      </article>
    </>
  )
}

export default Note
