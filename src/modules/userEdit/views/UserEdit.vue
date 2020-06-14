<template>
  <v-content>
    <AppBar :user="user"></AppBar>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12">
          <v-img src="https://picsum.photos/1280/300?random" height="230" max-height="230"></v-img>
          <v-divider></v-divider>
          <v-card elevation="5">
            <v-card-text class="text-center">
              <v-avatar size="90">
                <img :src="user.avatar">
              </v-avatar>
              <p class="headline">{{ user.username }}</p>
              <v-btn @click="editUserDialog = true">
                Editar
                <v-icon right>create</v-icon>
              </v-btn>
             </v-card-text>
            <v-card-actions>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="8">
          <p class="text-center headline mt-10" v-if="userPosts.length <= 0">Nada por aqui...</p>
          <Post v-else v-for="post in userPosts.slice(0,15)" :key="post.id" :post="post"
           :user="user" :userLikes="userLikes"></Post>
          <v-dialog v-model="editUserDialog" max-width="900">
            <v-card>
              <v-card-title>
                <v-avatar class="mr-2">
                  <img :src="user.avatar">
                </v-avatar>
                Editar perfil
              </v-card-title>
              <v-card-text>
                <v-text-field v-model="userEdit.username" solo placeholder="Nome" prepend-icon="account_circle"></v-text-field>
                <v-file-input solo placeholder="Avatar" accept=".jpg, .jpeg, .png" counter show-size
                 v-model="avatarEdit" prepend-icon="insert_photo" :rules="avatarRules"></v-file-input>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn color="light red mr-1" @click="editUserDialog = false">Cancelar</v-btn>
                <v-btn color="light blue ml-1" @click="editUser()" :loading="editUserButtonLoading">Editar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>

import UserService from '../../../services/UserService'
import decode from 'jwt-decode'

import AppBar from '../../home/components/AppBar'
import Post from '../components/Post'

export default {
  name: 'UserEdit',
  data: () => ({
    user: {},
    userPosts: [],
    userLikes: [],
    buttonLoading: false,
    editUserButtonLoading: false,
    editUserDialog: false,
    userEdit: {
      username: ''
    },
    avatarEdit: null,
    avatarRules: [value => !value || value.size < 2000000 || 'O tamanho da imagem deve ser menor que 2MB']
  }),
  components: {
    AppBar,
    Post
  },
  methods: {
    checkURLParams () {
      if (!this.$route.params.uid) {
        this.$router.push('/')
      }
    },

    isLoggedUser () {
      const decodedToken = decode(localStorage.getItem('token'))
      const uid = decodedToken.uid
      // eslint-disable-next-line
      if (this.$route.params.uid != uid) {
        this.$router.push(`/user/${this.$route.params.uid}`)
      }
    },

    getUserData () {
      const token = localStorage.getItem('token')
      const decodedToken = decode(token)
      const uid = decodedToken.uid

      UserService.getByID(uid)
        .then((response) => {
          this.user = response.data
          this.userEdit = {
            username: this.user.username
          }
        })
        .catch((error) => {
          console.log(error)
          this.$router.push('/')
        })

      UserService.getUserPosts(uid)
        .then((response) => {
          this.userPosts = response.data.posts.reverse()
        })
        .catch((error) => {
          console.log(error)
        })

      UserService.getUserLikes(uid)
        .then((response) => {
          this.userLikes = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },

    editUser () {
      this.editUserButtonLoading = true
      UserService.editUser(this.editUser, this.avatarEdit)
        .then((response) => {
          console.log(response)
          this.editUserButtonLoading = false
          this.$router.go(0)
        })
        .catch((error) => {
          console.log(error)
          this.editUserButtonLoading = false
        })
    }
  },
  beforeMount () {
    this.checkURLParams()
    this.isLoggedUser()
  },
  mounted () {
    this.getUserData()
  }
}
</script>
