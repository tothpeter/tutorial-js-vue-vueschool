<template>
  <div v-for="thread in threads"
        :key="thread.id"
        class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <p>
      By <a href="#" class="link-unstyled">{{ userById(thread.userId).name }}</a>, 2 hours ago
      <span style="float: left; margin-top: 2px;" class="hide-mobile text-faded text-small">3 replies by 3 contributors</span>
    </p>

    <div class="post-list">
      <div class="post" v-for="postId in thread.posts" :key="postId" >
        <div class="user-info">
          <a href="#" class="user-name">{{ userById(postById(postId).userId).name }}</a>
          <a href="#">
            <img class="avatar-image" :src="userById(postById(postId).userId).avatar" alt="">
          </a>
          <p class="desktop-only text-small">107 posts</p>
        </div>

        <div class="post-content">
          <div>
            <p>{{ postById(postId).text }}</p>
          </div>
        </div>

        <div class="post-date text-faded">
          {{ postById(postId).publishedAt }}
        </div>
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
