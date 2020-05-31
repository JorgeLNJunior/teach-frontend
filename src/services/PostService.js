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

  likePost (id) {
    return http.post(`posts/${id}/likes`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
}
