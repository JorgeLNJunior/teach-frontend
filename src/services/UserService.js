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

  getByID (uid) {
    const token = localStorage.getItem('token')
    return http.get(`/users/${uid}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  getByUsername (username) {
    const token = localStorage.getItem('token')
    return http.get(`/users/?username=${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  getFollowedUsers () {
    const token = localStorage.getItem('token')
    const decodedToken = decode(token)
    return http.get(`/users/${decodedToken.uid}/follows`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  getUserPosts (uid) {
    const token = localStorage.getItem('token')
    return http.get(`/users/${uid}/posts`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  getFollowedUsersPosts () {
    const token = localStorage.getItem('token')
    return http.get('/follows/posts', {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  getUserLikes (userId) {
    const token = localStorage.getItem('token')
    return http.get(`/users/${userId}/likes`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  followUserByID (id) {
    const token = localStorage.getItem('token')
    return http.post(`/users/follows/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  unfollowUser (id) {
    const token = localStorage.getItem('token')
    return http.delete(`/users/follows/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

}
