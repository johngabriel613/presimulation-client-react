import Axios from 'axios'

const baseURL = 'http://127.0.0.1:8080'

export const axios = Axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

axios.interceptors.response.use(
  response => {
    if(response && response.data) return response.data

    return response
  }, err => Promise.reject(err)
)