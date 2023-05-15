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

<script>
import sourceData from '@/data.json'

export default {
  data () {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
      users: sourceData.users
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
