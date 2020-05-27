<template>
  <v-content>
    <Toolbar :user="user"></Toolbar>
    <v-container fluid>
      <v-row align="start" justify="start">
        <v-col cols="6" md="2">
          <LeftBar :follows="follows"></LeftBar>
        </v-col>
        <v-col md="6" cols="6" offset="1">
          <PostForm></PostForm>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>

import UserService from '../../../services/UserService'
import Toolbar from '../components/Toolbar'
import LeftBar from '../components/LeftBar'
import PostForm from '../components/PostForm'

export default {
  data: () => ({
    user: {},
    follows: []
  }),

  methods: {
    getUser () {
      UserService.getByID().then((response) => {
        this.user = response.data
      }).catch((error) => {
        console.log(error.response)
      })
    },
    getFollows () {
      UserService.getFollowedUsers()
        .then((response) => {
          this.follows = response.data
        })
        .catch((error) => {
          console.log(error.response)
        })
    }
  },

  mounted () {
    this.getUser()
    this.getFollows()
  },

  components: {
    Toolbar,
    LeftBar,
    PostForm
  }

}
</script>
