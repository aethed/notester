// star

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBook as createBook } from '../features/books/bookSlice'

function BookForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createBook({ text }))
    setText('');
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Book</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Note
          </button>
        </div>
      </form>
    </section>
  )
}

export default BookForm