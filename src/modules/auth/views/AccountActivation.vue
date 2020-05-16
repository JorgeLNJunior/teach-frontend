<template>
  <v-content>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" md="6">
            <v-card v-if="error && finish" shaped elevation="4">
              <v-card-title>Desculpe, ocorreu um erro</v-card-title>
              <v-card-text class="subtitle-1">{{ error }}</v-card-text>
            </v-card>
            <v-card v-if="!error && finish" shaped elevation="4">
              <v-card-title>Conta ativada</v-card-title>
              <v-card-text class="subtitle-1">Você será redirecionado para a página de login em {{ time }} segundos</v-card-text>
            </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>

import UserService from '../services/UserService'

export default {
  name: 'AccountActivation',

  data: () => ({
    error: null,
    finish: false,
    time: 6
  }),

  methods: {
    activate () {
      const id = this.$route.query.id
      const code = this.$route.query.code
      UserService.activateAccount(id, code)
        .then((response) => {
          var self = this
          setInterval(() => { self.time-- }, 1000)
          setTimeout(() => { self.$router.push('/login') }, 6000)
          clearInterval()
        })
        .catch((error) => {
          this.error = error.response.data.error
        })
        .finally(() => {
          this.finish = true
        })
    }
  },

  created () {
    this.activate()
  }

}
</script>
