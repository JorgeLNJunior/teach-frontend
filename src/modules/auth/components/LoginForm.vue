<template>
  <v-container fluid>
    <v-snackbar v-model="snackbar" top :timeout="timeout">{{ returnErrors() }}</v-snackbar>
    <v-row align="center" justify="center">
      <v-col cols="12" class="mt-10 mb-10" md="4" lg="4">
        <v-card :loading="card_loading">
          <v-card-title class="light blue">
            <h1 class="display-1 font-weight-bold">Entrar</h1>
          </v-card-title>
          <v-card-text>
            <v-form class="mt-4">
              <v-text-field prepend-icon="email" label="Email" type="email" v-model="user.email"></v-text-field>
              <v-text-field prepend-icon="lock" label="Senha" type="password" v-model="user.password"></v-text-field>
              <v-row justify="end">
                <v-col md="4" sm="4">
                  <v-btn color="light blue" :disabled="submit_block" v-on:click="login()">Entrar</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import UserService from '@/services/UserService'

export default {
  name: 'LoginForm',
  data: () => ({
    user: {
      email: '',
      password: ''
    },
    timeout: 4000,
    card_loading: false,
    submit_block: false,
    snackbar: false,
    errors: []
  }),
  methods: {
    login () {
      this.card_loading = 'black'
      this.submit_block = true
      this.errors = []
      UserService.login(this.user)
        .then((response) => {
          localStorage.setItem('token', response.data.token)
          this.$router.push('/')
        })
        .catch((error) => {
          const errors = error.response.data
          for (const e of errors) {
            this.errors.push(e.message)
          }
          this.snackbar = true
        })
        .finally(() => {
          this.submit_block = false
          this.card_loading = false
        })
    },

    returnErrors () {
      var errors = ''
      for (const e of this.errors) {
        errors = `${errors}\n ${e}`
      }
      return errors
    }
  }
}
</script>
