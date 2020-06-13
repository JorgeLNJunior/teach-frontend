import http from '../plugins/axios'

export default {

  createNewPost (post) {
    const token = localStorage.getItem('token')
    return http.post('/posts', post, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  deletePost (id) {
    const token = localStorage.getItem('token')
    return http.delete(`/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  editPost (id, post) {
    const token = localStorage.getItem('token')
    return http.put(`/posts/${id}`, post, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  likePost (id) {
    const token = localStorage.getItem('token')
    return http.post(`posts/${id}/likes`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  removePostLike (id) {
    const token = localStorage.getItem('token')
    return http.delete(`posts/${id}/likes`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  insertComment (postId, comment) {
    const token = localStorage.getItem('token')
    return http.post(`/posts/${postId}/comments`,
      {
        content: comment
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      })
  }
}
