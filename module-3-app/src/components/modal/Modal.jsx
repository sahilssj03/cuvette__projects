import React, { useState } from 'react'
import './modal.css'
import { v4 } from 'uuid'
import { useAppContext } from '../../AppContext'
const colors = [
  'rgba(179, 139, 250, 1)',
  'rgba(255, 121, 242, 1)',
  'rgba(67, 230, 252, 1)',
  'rgba(241, 149, 118, 1)',
  'rgba(0, 71, 255, 1)',
  'rgba(102, 145, 255, 1)',
]
const Modal = () => {
  const [name, setName] = useState('')
  const [color, setColor] = useState('')
  const [error, setError] = useState(false)
  const { setModal, setNotes } = useAppContext()
  const handleSubmit = (e) => {
    e.preventDefault()
    const gn = name.trim()
    if (gn.length === 0 || color.length === 0) {
      if (gn.length === 0) {
        setName((old) => '')
      }
      setError((old) => !old)
      setTimeout(() => {
        setError((old) => !old)
      }, 2000)
      return
    }
    // more functionality
    const id = v4()
    let allNotes = JSON.parse(localStorage.getItem('allNotes')) || []
    allNotes = [...allNotes, { id, name, color, notes: [] }]
    localStorage.setItem('allNotes', JSON.stringify(allNotes))
    setModal('close')
    setNotes(allNotes)

    console.log(color, name)
  }
  const handleModalClick = (e) => {
    if (e.target.className === 'wrapper') {
      setModal('close')
    }
  }
  return (
    <section className={'wrapper'} onClick={handleModalClick}>
      <article className={'container'}>
        <form onSubmit={handleSubmit} className='modal__form'>
          <h1 className={'modal__form__title'}>Create New Group</h1>
          <div className='modal__group__name__container'>
            <label htmlFor='group__name'>Group Name</label>
            <input
              type='text'
              id='group__name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='modal__group__color__container'>
            <span className='group__color__label'>Group Color</span>
            {colors.map((color) => {
              return (
                <span
                  className={'group__color'}
                  key={v4()}
                  style={{ backgroundColor: color.toString() }}
                  onClick={() => {
                    setColor(color)
                  }}
                ></span>
              )
            })}
            <p className={error ? 'error-msg' : 'error-msg hide'}>
              Please select both group name and color{' '}
            </p>
          </div>
          <button className='create__group__btn' type='submit'>
            Create
          </button>
        </form>
      </article>
    </section>
  )
}

export default Modal
