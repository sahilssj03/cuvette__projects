import React, { useState } from 'react'
import './noteData.css'
import Note from '../note/Note'
import { useAppContext } from '../../AppContext'
import { v4 } from 'uuid'
import SaveNote from '../../assets/VectorSaveNote.svg'
import Photo from '../../assets/image-removebg-preview 1.png'
const NoteData = () => {
  const [note, setNote] = useState('')
  const { showNoteData, notesData, setShowNoteData, setNotesData } =
    useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    let newNote = note.trim()
    if (newNote.length === 0) {
      return
    }
    //
    // Get the current date and time
    const now = new Date()

    // Define the days of the week and months
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    // Get the day of the week, month, date, year, hours, and minutes
    const dayOfWeek = daysOfWeek[now.getDay()]
    const month = months[now.getMonth()]
    const date = now.getDate()
    const year = now.getFullYear()
    let hours = now.getHours()
    let minutes = now.getMinutes()

    // Determine AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM'

    // Convert hours to 12-hour format
    hours = hours % 12 || 12

    // Add leading zero to minutes if necessary
    minutes = minutes < 10 ? '0' + minutes : minutes

    //
    const items = JSON.parse(localStorage.getItem('allNotes')).map((item) => {
      if (item.id === notesData[0].id) {
        return {
          ...item,
          notes: [
            ...item.notes,
            { newNote, hours, minutes, ampm, month, date, year },
          ],
        }
      } else return item
    })
    localStorage.setItem('allNotes', JSON.stringify(items))
    setNote('')

    setNotesData(() => [
      {
        ...JSON.parse(localStorage.getItem('allNotes')).find(
          (note) => note.id === notesData[0].id
        ),
      },
    ])
  }
  const handleChange = (e) => {
    setNote(e.target.value)
  }
  return (
    <>
      {!showNoteData && (
        <div className='showbackground'>
          <div className='before__actual__data'>
            <div className='img__container'>
              <img src={Photo} alt='notes' />
            </div>
            <h1 className='app__title'>Pocket Notes</h1>
            <p className='some__text'>
              send and recieves messages without keeping your phone online.
            </p>
            <p className='some__text'>
              Use Pocket Notes on up to linked devices and 1 mobile phone
            </p>
          </div>
          <span className='enc'>
            {' '}
            <span>&#x1F512;</span>
            end-to-end encrypted
          </span>
        </div>
      )}
      {showNoteData && (
        <section className='single__person__notes__container'>
          <header className='single__person__notes__header'>
            {showNoteData && (
              <div className='btn__container hide__btn'>
                {
                  <button
                    className='go__back hide__btn'
                    onClick={() => setShowNoteData(() => false)}
                  >
                    <span>&larr;</span>
                  </button>
                }
              </div>
            )}

            <article className='note__name__heading'>
              <div className='note__name__image'>
                <span>
                  {notesData[0].name[0] +
                    notesData[0].name[notesData[0].name.length - 1]}
                </span>
              </div>
              <div className='heading__note__name'>
                <span>{notesData[0].name}</span>
              </div>
            </article>
          </header>
          <article className='written__notes'>
            {notesData[0].notes.map((item) => (
              <div className='written__note__cont' key={v4()}>
                <p className='txt__note'>{item.newNote}</p>
                <span className='date'>
                  {item.date +
                    ' ' +
                    item.month +
                    ' ' +
                    item.year +
                    ' ' +
                    '.' +
                    ' ' +
                    item.hours +
                    ':' +
                    item.minutes +
                    ' ' +
                    item.ampm}
                </span>
              </div>
            ))}
          </article>
          <article className='write__new__note'>
            <div className='design'></div>
            <form action='' onSubmit={handleSubmit}>
              <textarea
                // type='text'
                placeholder='Your text goes here...'
                required
                name='note'
                id='note'
                value={note}
                onChange={handleChange}
              />
              <button className='save__note__btn' type='submit'>
                <span>
                  <img src={SaveNote} alt='' />
                </span>
              </button>
            </form>
          </article>
        </section>
      )}
    </>
  )
}

export default NoteData
