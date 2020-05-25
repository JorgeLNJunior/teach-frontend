<template>
  <v-toolbar fixed color="light blue">
    <router-link to="/">
      <v-toolbar-title class="headline">
        <v-img max-width="48px" src="@/assets/logo.png"></v-img>
      </v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-autocomplete class="mr-6 mt-1" append-icon="search" placeholder="Pesquisar" rounded flat dense solo height="50px"></v-autocomplete>
      <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-avatar class="mt-2" size="40" v-on="on">
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
  </v-toolbar>
</template>

<script>
export default {
  name: 'Toolbar',
  props: {
    user: Object
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }

}
</script>

<style>
  .v-avatar:hover {
    cursor: pointer;
  }
</style>
