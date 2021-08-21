import { useEffect, useState } from 'react'
import Note from './components/Note'
import { createNote, getAllNotes, setToken, update } from './services/notes'
import { login } from './services/login'
import LoginForm from './components/LoginForm'
import CreateNoteForm from './components/CreateNoteForm'
import Notification from './components/Notification'

export default function App () {
  const [notes, setNotes] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
  }

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

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
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ol>

    </div>
  )
}
