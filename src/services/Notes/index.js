import axios from 'axios'

export const getAllNotes = () => {
  return axios
    .get('https://notes-api-prueba.herokuapp.com/api/notes')
    .then(({ data }) => data)
}

export const createNote = ({ content }) => {
  return axios
    .post('https://notes-api-prueba.herokuapp.com/api/notes', {
      content
    })
    .then((res) => {
      const { data } = res
      return data
    })
}
