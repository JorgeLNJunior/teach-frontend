<template>
  <v-content>
    <AppBar :user="loggedUser"></AppBar>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12">
          <v-img src="https://picsum.photos/1280/300?random" height="230" max-height="230"></v-img>
          <v-divider></v-divider>
          <v-card elevation="5">
            <v-card-text class="text-center">
              <v-avatar size="90">
                <img :src="user.avatar">
              </v-avatar>
              <p class="headline">{{ user.username }}</p>
              <v-btn v-if="!following" v-on:click="followUser()"
               :loading="buttonLoading"
              >
                Seguir
                <v-icon right>add</v-icon>
              </v-btn>
              <v-btn v-else v-on:click="unfollowUser()"
               :loading="buttonLoading"
              >
                Deixar de seguir
                <v-icon right>remove</v-icon>
              </v-btn>
             </v-card-text>
            <v-card-actions>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="8">
          <p class="text-center headline mt-10" v-if="userPosts.length <= 0">Nada por aqui...</p>
          <Post v-else v-for="post in userPosts.slice(0,15)" :key="post.id" :post="post"
           :user="user" :userLikes="loggedUserLikes"></Post>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>

import UserService from '../../../services/UserService'
import decode from 'jwt-decode'

import AppBar from '../../home/components/AppBar'
import Post from '../components/Post'

export default {
  name: 'User',
  data: () => ({
    user: {},
    userPosts: [],
    loggedUser: {},
    loggedUserFollows: [],
    loggedUserLikes: [],
    following: false,
    buttonLoading: false
  }),
  components: {
    AppBar,
    Post
  },
  methods: {
    checkURLParams () {
      if (!this.$route.params.uid) {
        this.$router.push('/')
      }
    },

    isLoggedUser () {
      const decodedToken = decode(localStorage.getItem('token'))
      const uid = decodedToken.uid
      // eslint-disable-next-line
      if (this.$route.params.uid == uid) {
        this.$router.push(`/edit/${uid}`)
      }
    },

    followUser () {
      this.buttonLoading = true
      UserService.followUserByID(this.user.id)
        .then((response) => {
          this.following = true
        })
        .catch((error) => {
          console.log(error.response)
        })
        .finally(() => {
          this.buttonLoading = false
        })
    },

    unfollowUser () {
      this.buttonLoading = true
      UserService.unfollowUser(this.user.id)
        .then((response) => {
          this.following = false
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.buttonLoading = false
        })
    },

    isFollowing () {
      if (this.loggedUserFollows.length <= 0) {
        this.following = false
      }
      this.loggedUserFollows.forEach((follow) => {
        if (follow.followed_user.id === this.user.id) {
          this.following = true
        }
      })
    },

    getUserData () {
      const uid = this.$route.params.uid

      UserService.getByID(uid)
        .then((response) => {
          this.user = response.data
        })
        .catch((error) => {
          console.log(error)
          this.$router.push('/')
        })

      UserService.getUserPosts(uid)
        .then((response) => {
          this.userPosts = response.data.posts.reverse()
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async getLoggedUserData () {
      const token = localStorage.getItem('token')
      const decodedToken = decode(token)
      const uid = decodedToken.uid

      UserService.getByID(uid)
        .then((response) => {
          this.loggedUser = response.data
        })
        .catch((error) => {
          console.log(error)
        })

      UserService.getUserLikes(uid)
        .then((response) => {
          this.loggedUserLikes = response.data
        })
        .catch((error) => {
          console.log(error)
        })

      UserService.getFollowedUsers()
        .then((response) => {
          this.loggedUserFollows = response.data
          this.isFollowing()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  beforeMount () {
    this.checkURLParams()
    this.isLoggedUser()
  },
  mounted () {
    this.getLoggedUserData()
    this.getUserData()
  }
}
</script>
