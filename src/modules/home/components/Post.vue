<template>
  <v-card class="mt-10" elevation="6">
    <v-card-title>
      <v-avatar>
        <img :src="post.owner_user.avatar">
      </v-avatar>
      <span class="ml-2">{{ post.owner_user.username }}</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="text-center">
      <span class="title">{{ post.post.title }}</span>
    </v-card-text>
    <v-card-text>
      <p class="body-1 ml-4 mr-4">{{ post.post.content }}</p>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-row>
        <v-col cols="6">
          <v-btn :color="likeColor" class="ml-2" outlined block text large elevation="2" :loading="likeButtonLoading" v-on:click="likePost()">
            <v-icon left>thumb_up</v-icon>
            {{ post.post.likes }}
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn class="mr-2" outlined block text large elevation="2">
            <v-icon left>question_answer</v-icon>
            Comentários
          </v-btn>
        </v-col>
        <v-col>
          <v-text-field label="Insira um comentário" prepend-inner-icon="insert_comment" @click:append="sendComment()" append-icon="send" solo rounded class="ml-3 mr-3"></v-text-field>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>

import PostService from '@/services/PostService'

export default {
  name: 'Post',
  data: () => ({
    likeColor: '',
    likeButtonLoading: false,
    liked: false
  }),
  props: {
    post: Object,
    userLikes: Array
  },
  methods: {
    checkLike () {
      for (var i of this.userLikes) {
        if (i.post_id === this.post.post.id) {
          this.likeColor = 'blue'
          this.liked = true
        }
      }
    },

    likePost () {
      this.likeButtonLoading = true
      PostService.likePost(this.post.post.id)
        .then((response) => {
          console.log(response.data)
          this.likeColor = 'blue'
          this.liked = true
          this.post.post.likes++
        })
        .catch((error) => {
          console.log(error.response)
        })
        .finally(() => {
          this.likeButtonLoading = false
        })
    },

    sendComment () {
      console.log('ok')
    }
  },
  mounted () {
    this.checkLike()
  }
}
</script>
