<template>
  <v-card class="mt-n6 ml-n4">
    <v-card-text>
      <p v-if="!follows" class="text-center subtitle-2">Você não segue nenhum usuário</p>
      <p v-else class="text-center subtitle-2">Usuários seguidos</p>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions v-if="follows">
      <v-list-item-group>
        <v-list-item v-for="follow of follows" :key="follow.id">
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
  }

}
</script>
