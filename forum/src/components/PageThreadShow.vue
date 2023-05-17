<template>
  <div class="col-large push-top">
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

<script>
import sourceData from '@/data.json'

export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
      users: sourceData.users
    }
  },
  computed: {
    thread() {
      return this.threads.find(thread => thread.id === this.id)
    }
  },
  methods: {
    postById(id) {
      return this.posts.find(post => post.id === id)
    },
    userById(id) {
      return this.users.find(user => user.id === id)
    }
  }
}
</script>


<style scoped>
</style>
