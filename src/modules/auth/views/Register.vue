<template>
  <v-content>
    <v-container>
      <v-row>
        <h1 class="display-2 font-weight-bold">Teach</h1>
        <v-spacer></v-spacer>
        <v-btn large outlined to="/login">Entrar</v-btn>
      </v-row>
    </v-container>
    <RegisterForm />
  </v-content>
</template>

<script>

import RegisterForm from '../components/RegisterForm'

export default {
  name: 'Register',
  components: {
    RegisterForm
  },
  data: () => ({

  })

}
</script>
