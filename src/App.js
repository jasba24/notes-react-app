import { useEffect, useState } from 'react'
import Note from './components/Note'
import { createNote, getAllNotes, setToken } from './services/notes'
import { login } from './services/login'
import LoginForm from './components/LoginForm'
import CreateNoteForm from './components/CreateNoteForm'

export default function App () {
  const [notes, setNotes] = useState([])

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

  const addNote = (noteObject) => {
    createNote(noteObject).then((newNote) =>
      setNotes([...notes, newNote])
    )
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

  return (
    <div>
      <h1>Notes</h1>
      {
        user
          ? <CreateNoteForm
              addNote={addNote}
              handleLogout={handleLogout}
            />
          : <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
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
