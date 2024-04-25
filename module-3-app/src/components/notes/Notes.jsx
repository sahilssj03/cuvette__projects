import React from 'react'
import { useAppContext } from '../../AppContext'
import { v4 } from 'uuid'
import './notes.css'
import Note from '../note'

const Notes = () => {
  const { setModal, notes, showNoteData } = useAppContext()

  return (
    <section
      className={
        !showNoteData
          ? 'notes__container '
          : 'notes__container hide__notes__container'
      }
    >
      <h1 className='notes__title'>Pocket Notes</h1>
      <article className='notes'>
        {notes.map((note) => {
          return <Note key={v4()} {...note} />
        })}
      </article>
      <button className='create__new__group' onClick={() => setModal('open')}>
        <span>+</span>
      </button>
    </section>
  )
}

export default Notes
