<template>
  <v-content>
    <Toolbar :user="user"></Toolbar>
  </v-content>
</template>

<script>

import UserService from '../../../services/UserService'
import Toolbar from '../components/Toolbar'

export default {
  data: () => ({
    user: {}
  }),

  methods: {
    getUser () {
      UserService.getByID().then((response) => {
        this.user = response.data
      }).catch((error) => {
        console.log(error.response)
      })
    }
  },

  mounted () {
    this.getUser()
  },

  components: {
    Toolbar
  }

}
</script>
