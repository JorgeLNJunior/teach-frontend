<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" class="mt-10 mb-10" md="4" lg="4">
        <v-card :loading="card_loading">
          <v-card-title class="light blue">
            <h1 class="display-1 font-weight-bold" v-if="!register_done">Criar conta</h1>
            <h1 class="display-1 font-weight-bold" v-if="register_done">Registro completo</h1>
          </v-card-title>
          <v-card-text>
            <h1 class="mt-4 mb-4 display-1" v-if="register_done">Por favor, confirme seu endereço de email</h1>
            <v-form v-if="!register_done" class="mt-4" v-on:submit.prevent="">
              <v-text-field prepend-icon="account_circle" label="Nome" v-bind="user.username"></v-text-field>
              <v-text-field prepend-icon="child_friendly" label="Idade" type="number" v-bind="user.age"></v-text-field>
              <v-text-field prepend-icon="email" label="Email" type="email" v-bind="user.email"></v-text-field>
              <v-text-field prepend-icon="lock" label="Senha" type="password" v-bind="user.password"></v-text-field>
              <v-row justify="end">
                <v-col md="4" sm="4">
                  <v-btn color="light blue" v-on:click="submit()">Registrar</v-btn>
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
export default {
  name: 'RegisterForm',
  props: {
    register_done: Boolean,
    card_loading: String
  },
  data: () => ({
    user: {
      username: '',
      age: 0,
      email: '',
      password: ''
    }
  }),
  methods: {
    submit () {
      console.log(this.user)
      this.register_done = true
      this.card_loading = 'black'
    }
  }
}
</script>
