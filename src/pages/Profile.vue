<template>
  <div class="flex-grid">
    <div class="col-3 push-top">
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
    </div>

    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead">{{ user.name }}'s recent activity</span>
      </div>
      <hr />
      <PostList :posts="userPosts" />
    </div>
  </div>
</template>

<script setup>
import PostList from '@/components/PostList.vue'

import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const user = computed(() => store.getters.authUser)

const userPostsCount = computed(() => userPosts.value.length)
const userThreadsCount = computed(() => store.state.threads.filter(thread => thread.userId === user.value.id).length)

const userPosts = computed(() => store.state.posts.filter(post => post.userId === user.value.id))
</script>

<style>

</style>
