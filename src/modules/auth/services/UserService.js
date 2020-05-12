import http from '../../../plugins/axios'

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
  }
}
