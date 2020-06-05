<template>
  <v-app-bar color="light blue" fixed>
        <router-link to="/">
      <v-toolbar-title class="headline">
        <v-img max-width="48px" src="@/assets/logo.png"></v-img>
      </v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>

    <v-toolbar-items>

      <v-menu bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-text-field append-icon="search" placeholder="Pesquisar"
            rounded flat dense solo height="50px" v-model="searchUsername"
            @input="getByUsername()" v-on="on" class="mt-1">
          </v-text-field>
        </template>
        <v-list>
          <v-skeleton-loader
            v-if="!searchEnded"
            ref="skeleton"
            type="list-item-avatar"
          ></v-skeleton-loader>
          <v-list-item
            v-if="searchResult.length <= 0 & searchEnded == true">
            <v-list-item-title>Nenhum usuário encontrado</v-list-item-title>
          </v-list-item>
          <v-list-item v-else v-for="result in searchResult" :key="result.id">
            <v-avatar class="mr-2">
              <img :src="result.avatar">
            </v-avatar>
            <v-list-item-title>{{ result.username }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-avatar class="mt-2 ml-4" size="40" v-on="on">
          <img :src="user.avatar" alt="avatar">
        </v-avatar>
      </template>
        <v-list>
          <v-list-item>
            <v-icon class="mr-2">account_circle</v-icon>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-icon class="mr-2">check_circle</v-icon>
            <v-list-item-title>Seguindo</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-icon class="mr-2">settings</v-icon>
            <v-list-item-title>Configurações</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-icon class="mr-2">help</v-icon>
            <v-list-item-title>Ajuda</v-list-item-title>
          </v-list-item>
          <v-list-item v-on:click="logout()">
            <v-icon class="mr-2">clear</v-icon>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>

import UserService from '@/services/UserService'

export default {
  name: 'AppBar',

  data: () => ({
    searchUsername: '',
    searchResult: [],
    searchEnded: true
  }),

  props: {
    user: Object
  },

  methods: {

    logout () {
      localStorage.removeItem('token')
      this.$router.push('/login')
    },

    getByUsername () {
      if (this.searchUsername !== '') {
        this.searchEnded = false
        UserService.getByUsername(this.searchUsername)
          .then((response) => {
            this.searchResult = response.data
          })
          .catch((error) => {
            console.log(error.response.data)
          })
          .finally(() => {
            this.searchEnded = true
          })
      }
    }

  }

}
</script>

<style>
  .v-avatar:hover {
    cursor: pointer;
  }
</style>
