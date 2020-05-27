<template>
  <v-card elevation="6">
    <v-snackbar v-model="snackbar" top :timeout="timeout">{{ responseMessage }}</v-snackbar>
    <v-card-title></v-card-title>
      <v-card-text>
        <v-text-field solo label="Título" v-model="newPost.title"></v-text-field>
        <v-textarea solo label="Ensine algo..." v-model="newPost.content"></v-textarea>
      </v-card-text>
      <v-card-actions>
      <v-row justify="end">
        <v-col md="2">
          <v-btn outlined v-on:click="clearPostForm">Limpar</v-btn>
        </v-col>
        <v-col md="2" class="mr-2">
          <v-btn color="light blue" v-on:click="sendPost" :loading="postButtonLoading">Enviar</v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>

import UserService from '@/services/UserService'

export default {
  name: 'PostForm',
  data: () => ({
    newPost: {
      title: '',
      content: ''
    },
    postButtonLoading: false,
    timeout: 5000,
    snackbar: false,
    responseMessage: ''
  }),

  methods: {
    clearPostForm () {
      this.newPost.title = ''
      this.newPost.content = ''
    },
    sendPost () {
      this.postButtonLoading = true
      UserService.createNewPost(this.newPost)
        .then((response) => {
          this.responseMessage = 'Postagem criada com sucesso'
          this.snackbar = true
        })
        .catch((error) => {
          console.log(error.response)
          this.responseMessage = 'Desculpe, ocorreu um erro, tente novamente'
          this.snackbar = true
        })
        .finally(() => {
          this.postButtonLoading = false
        })
    }
  }

}
</script>
