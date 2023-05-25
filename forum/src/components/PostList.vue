<template>
  <div class="post-list">
    <div class="post" v-for="post in posts" :key="post.id" >
      <div class="user-info">
        <a href="#" class="user-name">{{ userById(post.userId).name }}</a>
        <a href="#">
          <img class="avatar-image" :src="userById(post.userId).avatar" alt="">
        </a>
        <p class="desktop-only text-small">107 posts</p>
      </div>

      <div class="post-content">
        <div>
          <p>{{ post.text }}</p>
        </div>
      </div>

      <div class="post-date text-faded">
        {{ post.publishedAt }}
      </div>
    </div>
  </div>
</template>

<script setup>
import sourceData from '@/data.json'
import { defineProps, reactive } from 'vue'

const users = reactive(sourceData.users)

defineProps({
  posts: {
    required: true,
    type: Array
  }
})

function userById(id) {
  return users.find(user => user.id === id)
}
</script>

<style scoped>

</style>
