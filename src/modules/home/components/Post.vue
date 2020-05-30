<template>
  <v-card class="mt-10" elevation="6">
    <v-card-title>
      <v-avatar>
        <img :src="user.avatar">
      </v-avatar>
      <span class="ml-2">{{ user.username }}</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="text-center">
      <span class="title">Lorem Ipsum</span>
    </v-card-text>
    <v-card-text>
      <p class="body-1 ml-4 mr-4">Lorem ipsum aliquet potenti morbi fermentum laoreet enim tempor rutrum, vehicula diam molestie nam arcu sit pharetra.
        molestie platea nulla sagittis lacus pretium fames justo ipsum, pulvinar convallis consectetur suscipit pharetra condimentum fermentum quisque placerat, pellentesque nibh posuere gravida auctor habitant vestibulum.
        lectus dictum sociosqu hendrerit elit vestibulum diam erat, ante sociosqu netus odio in hac, ut etiam commodo cubilia tempor et nostra, aliquam cubilia duis nibh egestas.
        in sed libero platea inceptos nec quam senectus vestibulum senectus felis, accumsan consequat porttitor molestie libero semper potenti pulvinar ornare auctor donec, sem nostra augue torquent cubilia tempor conubia litora sociosqu.
      </p>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-row>
        <v-col cols="6">
          <v-btn class="ml-2" outlined block text large elevation="2">
            <v-icon left>thumb_up</v-icon>
            12
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn class="mr-2" outlined block text large elevation="2">
            <v-icon left>question_answer</v-icon>
            Comentários
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Post',
  props: {
    user: Object
  }
}
</script>
