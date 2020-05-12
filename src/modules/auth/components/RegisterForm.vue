<template>
  <v-container fluid>
    <v-snackbar v-model="snackbar" top :timeout="timeout">{{ returnErrors() }}</v-snackbar>
    <v-row align="center" justify="center">
      <v-col cols="12" class="mt-10 mb-10" md="4" lg="4">
        <v-card :loading="card_loading">
          <v-card-title class="light blue">
            <h1 class="display-1 font-weight-bold" v-if="!register_done">Criar conta</h1>
            <h1 class="display-1 font-weight-bold" v-if="register_done">Registro completo</h1>
          </v-card-title>
          <v-card-text>
            <h1 class="mt-4 mb-4 display-1" v-if="register_done">Por favor, confirme seu endereço de email</h1>
            <v-form v-if="!register_done" class="mt-4">
              <v-text-field prepend-icon="account_circle" label="Nome" v-model="user.username"></v-text-field>
              <v-text-field prepend-icon="child_friendly" label="Idade" type="number" v-model="user.age"></v-text-field>
              <v-text-field prepend-icon="email" label="Email" type="email" v-model="user.email"></v-text-field>
              <v-text-field prepend-icon="lock" label="Senha" type="password" v-model="user.password"></v-text-field>
              <v-row justify="end">
                <v-col md="4" sm="4">
                  <v-btn color="light blue" :disabled="submit_block" v-on:click="submit()">Registrar</v-btn>
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

import UserService from '../services/UserService'

export default {
  name: 'RegisterForm',
  data: () => ({
    user: {
      username: '',
      age: 0,
      email: '',
      password: ''
    },
    timeout: 4000,
    register_done: false,
    card_loading: false,
    submit_block: false,
    snackbar: false,
    errors: []
  }),
  methods: {
    submit () {
      this.card_loading = 'black'
      this.submit_block = true
      this.errors = []
      UserService.register(this.user)
        .then((response) => {
          this.register_done = true
          console.log(response)
        })
        .catch((error) => {
          this.snackbar = true
          const errors = error.response.data.errors
          for (const e of errors) {
            this.errors.push(e.message)
          }
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
