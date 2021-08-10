import axios from 'axios'

export const getAllNotes = () => {
  return axios
    .get('http://localhost:3001/api/notes')
    .then(({ data }) => data)
}

export const createNote = ({ content }) => {
  return axios
    .post('http://localhost:3001/api/notes', {
      content
    })
    .then((res) => {
      const { data } = res
      return data
    })
}
