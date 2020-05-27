<template>
  <v-content>
    <Toolbar :user="user"></Toolbar>
    <v-container fluid>
      <v-row align="start" justify="start">
        <v-col cols="12" md="2">
          <LeftBar :follows="follows"></LeftBar>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>

import UserService from '../../../services/UserService'
import Toolbar from '../components/Toolbar'
import LeftBar from '../components/LeftBar'

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
          console.log(response.data)
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
    LeftBar
  }

}
</script>
