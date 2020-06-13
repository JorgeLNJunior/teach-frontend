<template>
  <v-content>
    <Appbar :user="user"></Appbar>
    <v-container fluid>
      <v-row align="start" justify="start">
        <v-col cols="6" md="2">
          <LeftBar :follows="follows"></LeftBar>
        </v-col>
        <v-col md="6" cols="6" offset="1">
          <PostForm></PostForm>
          <v-card v-if="posts.length <= 0" flat>
            <v-card-text class="mt-10">
              <p class="text-center headline">Nada por aqui...</p>
            </v-card-text>
          </v-card>
          <Post v-else v-for="post in posts.slice(0,30)" :key="post.id" :post="post" :userLikes="userLikes"></Post>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>

import UserService from '../../../services/UserService'
import Appbar from '../components/AppBar'
import LeftBar from '../components/LeftBar'
import PostForm from '../components/PostForm'
import Post from '../components/Post'

import decode from 'jwt-decode'

export default {
  data: () => ({
    user: {},
    follows: [],
    posts: [],
    userLikes: []
  }),

  methods: {
    getUser () {
      const token = localStorage.getItem('token')
      const decodedToken = decode(token)
      const uid = decodedToken.uid
      UserService.getByID(uid)
        .then((response) => {
          this.user = response.data
        }).catch((error) => {
          console.log(error.response)
        })
    },
    getFollows () {
      UserService.getFollowedUsers()
        .then((response) => {
          this.follows = response.data.reverse()
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    getPosts () {
      UserService.getFollowedUsersPosts()
        .then((response) => {
          this.posts = response.data
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    getLikes () {
      const token = decode(localStorage.getItem('token'))
      UserService.getUserLikes(token.uid)
        .then((response) => {
          this.userLikes = response.data
        })
        .catch((error) => {
          console.log(error.response)
        })
    }
  },

  mounted () {
    this.getUser()
    this.getFollows()
    this.getPosts()
    this.getLikes()
  },

  components: {
    Appbar,
    LeftBar,
    PostForm,
    Post
  }

}
</script>
