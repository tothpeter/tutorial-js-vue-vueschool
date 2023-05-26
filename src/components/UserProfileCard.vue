<template>
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
      <span>{{ userPostsCount }} posts</span>
      <span>{{ userThreadsCount }} threads</span>
    </div>

    <hr>

    <p v-if="user.website" class="text-large text-center">
      <i class="fa fa-globe"></i>
      <a :href="user.website" target="_blank">{{ user.website }}</a>
    </p>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  user: {
    required: true,
    type: Object
  }
})

const user = computed(() => props.user)

const store = useStore()

const userPosts = computed(() => store.state.posts.filter(post => post.userId === user.value.id))

const userPostsCount = computed(() => userPosts.value.length)
const userThreadsCount = computed(() => store.state.threads.filter(thread => thread.userId === user.value.id).length)
</script>
