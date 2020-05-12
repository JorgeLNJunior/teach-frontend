<template>
  <v-content>
    <v-container>
      <v-row>
        <h1 class="display-2 font-weight-bold">Teach</h1>
        <v-spacer></v-spacer>
        <v-btn large outlined to="/register">Registrar</v-btn>
      </v-row>
    </v-container>
    <LoginForm />
  </v-content>
</template>

<script>

import LoginForm from '../components/LoginForm'

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  data: () => ({

  })

}
</script>
