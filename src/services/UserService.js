import http from '../plugins/axios'
import decode from 'jwt-decode'

const token = localStorage.getItem('token')
const decodedToken = decode(token)

export default {

  register (user) {
    return http.post('/register', {
      username: user.username,
      age: user.age,
      email: user.email,
      password: user.password
    },
    {
      headers: { 'Content-Type': 'application/json' }
    })
  },

  login (user) {
    return http.post('/login', {
      email: user.email,
      password: user.password
    },
    {
      headers: { 'Content-Type': 'application/json' }
    })
  },

  activateAccount (id, code) {
    return http.get('/activate', {
      params: {
        id: id,
        code: code
      }
    })
  },

  getByID () {
    return http.get(`/users/${decodedToken.uid}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  getFollowedUsers () {
    return http.get(`/users/${decodedToken.uid}/follows`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  createNewPost (post) {
    return http.post('/posts', post, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

}
