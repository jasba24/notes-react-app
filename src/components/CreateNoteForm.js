import { useState, useRef } from 'react'
import Toggleable from './Toggleable'

const CreateNoteForm = ({ addNote, handleLogout }) => {
  const [newNote, setNewNote] = useState('')

  const toggleableRef = useRef()

  const handleChange = (ev) => {
    setNewNote(ev.target.value)
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()

    const noteObject = {
      content: newNote,
      important: false
    }

    addNote(noteObject)
    setNewNote('')
    toggleableRef.current.toggleVisibility()
  }

  return (
    <Toggleable ref={toggleableRef} buttonLabel='New note'>
      <h1>Create a new note</h1>
      <form data-test-id='note-form' onSubmit={handleSubmit}>
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
    </Toggleable>
  )
}

export default CreateNoteForm
