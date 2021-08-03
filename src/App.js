import { useEffect, useState } from 'react'
import Note from './Note'
import { createNote, getAllNotes } from './services/Notes/'

export default function App () {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')

  useEffect(() => {
    getAllNotes().then((notes) => setNotes(notes))
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

  return (
    <div>
      <h1>Notes</h1>
      {notes.length === 0 && 'Loading...'}
      <ol>
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </ol>

      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={newNote} />
        <button>Create note</button>
      </form>
    </div>
  )
}
