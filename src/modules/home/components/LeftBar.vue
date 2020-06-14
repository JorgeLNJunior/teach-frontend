<template>
  <v-card class="mt-10 ml-n4" elevation="6">
    <v-card-text>
      <p v-if="follows.length <= 0" class="text-center subtitle-2">Você não segue nenhum usuário</p>
      <p v-else class="text-center subtitle-2">Usuários seguidos</p>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-list-item-group>
        <v-list-item v-for="follow of follows.slice(0,7)" :key="follow.id" :to="getUserRoute(follow.followed_user.id)">
          <v-list-item-avatar>
            <img :src="follow.followed_user.avatar">
          </v-list-item-avatar>
          <p>{{ follow.followed_user.username }}</p>
        </v-list-item>
      </v-list-item-group>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'LeftBar',
  props: {
    follows: Array
  },
  methods: {
    getUserRoute (id) {
      return `/user/${id}`
    }
  }
}
</script>
