//star

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NoteForm from '../components/NoteForm'
import NoteItem from '../components/NoteItem'
import Spinner from '../components/Spinner'
import { getNotes, reset } from '../features/notes/noteSlice'


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { notes: notes, isLoading, isError, message } = useSelector(
    (state) => state.notes
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getBooks())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome back, {user && user.name}! 👋 </h1>
        <p2>Notes Dashboard</p2>
      </section>

      <NoteForm />

      <section className='content'>
        {books.length > 0 ? (
          <div className='books'>
            {books.map((book) => (
              <NoteItem key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <h3>You have not made any notes</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard