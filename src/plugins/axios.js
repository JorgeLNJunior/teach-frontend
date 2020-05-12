import axios from 'axios'

const url = 'https://teach-api.herokuapp.com/'

const http = axios.create({
  baseURL: url
})

export default http
