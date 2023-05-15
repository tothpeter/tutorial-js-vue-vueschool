<template>
  <div>
    <h1>Home page</h1>
    <div v-for="thread in threads" :key="thread.id">
      <h2>{{ thread.title }}</h2>
      <div v-for="postId in thread.posts" :key="postId">
        <p>{{ postById(postId).text }}</p>
        <p>By {{ userById(postById(postId).userId).name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import sourceData from '@/data.json'
import { reactive } from 'vue'

const threads = reactive(sourceData.threads)
const posts = reactive(sourceData.posts)
const users = reactive(sourceData.users)

function postById(id) {
  return posts.find(post => post.id === id)
}

function userById(id) {
  return users.find(user => user.id === id)
}
</script>


<style scoped>

</style>
