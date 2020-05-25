import http from '../plugins/axios'
import decode from 'jwt-decode'

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
    const token = localStorage.getItem('token')
    const decodedToken = decode(token)
    return http.get(`/users/${decodedToken.uid}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
}
