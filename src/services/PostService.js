import http from '../plugins/axios'
// import decode from 'jwt-decode'

const token = localStorage.getItem('token')
// const decodedToken = decode(token)

export default {
  createNewPost (post) {
    return http.post('/posts', post, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  LikePost (id) {
    return http.post(`posts/${id}/likes`, {}, {
      headers: { Athorization: `Bearer ${token}` }
    })
  }
}
