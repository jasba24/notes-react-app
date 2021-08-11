import { useEffect, useState } from 'react'
import Note from './Note'
import { createNote, getAllNotes, setToken } from './services/notes'
import { login } from './services/login'

export default function App () {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    getAllNotes().then((notes) => setNotes(notes))
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleChange = (ev) => {
    setNewNote(ev.target.value)
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()

    const noteToAddToState = {
      content: newNote
    }

    createNote(noteToAddToState).then((newNote) =>
      setNotes([...notes, newNote])
    )
    setNewNote('')
  }

  const handleLogin = async (ev) => {
    ev.preventDefault()

    try {
      const user = await login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }

    if (user) {
      console.log(user)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const LoginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type='text'
          value={username}
          name='Username'
          placeholder='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <input
          type='password'
          value={password}
          name='Password'
          placeholder='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  )

  const CreateNoteForm = () => (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Write your note content'
          onChange={handleChange}
          value={newNote}
        />
        <button>Create note</button>
      </form>
      <div>
        <button onClick={handleLogout}>
          LogOut
        </button>
      </div>
    </>
  )

  return (
    <div>
      <h1>Notes</h1>
      {
        user
          ? CreateNoteForm()
          : LoginForm()
      }

      {notes.length === 0 && 'Loading...'}
      <ol>
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </ol>

    </div>
  )
}
