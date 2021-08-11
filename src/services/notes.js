import axios from 'axios'
const baseURL = 'http://localhost:3001/api/notes'

let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAllNotes = () => {
  return axios
    .get(baseURL)
    .then(({ data }) => data)
}

export const createNote = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  return axios
    .post(baseURL, newObject, config)
    .then((res) => {
      const { data } = res
      return data
    })
}

export const update = (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = axios.put(`${baseURL}/${id}`, newObject, config)
  return request.then(response => response.data)
}
