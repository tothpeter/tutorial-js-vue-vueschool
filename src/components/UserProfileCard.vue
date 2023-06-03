<template>
  <div>
    <div class="profile-card">
      <p class="text-center">
        <img :src="user.avatar" class="avatar-xlarge" alt="">
      </p>
      <h1 class="title">{{ user.username }}</h1>
      <p class="text-lead">{{ user.name }}</p>
      <p class="text-justified">
        {{ user.bio || 'No bio yet' }}
      </p>
      <span class="online">{{ user.username }} is online</span>
      <div class="stats">
        <span>{{ user.postsCount }} posts</span>
        <span>{{ user.threadsCount }} threads</span>
      </div>
      <hr>
      <p v-if="user.website" class="text-large text-center">
        <i class="fa fa-globe"></i>
        <a :href="user.website" target="_blank">{{ user.website }}</a>
      </p>
    </div>
    <p class="text-small text-faded text-center">
      Member since 2003
    </p>
    <hr>
    <div class="text-center">
      <router-link :to="{ name: 'ProfileEdit' }" class="btn-green btn-small">
        Edit profile
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: {
    required: true,
    type: Object
  }
})

const user = computed(() => props.user)
</script>
