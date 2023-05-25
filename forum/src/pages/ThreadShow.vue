<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <p>
      By <a href="#" class="link-unstyled">{{ userById(thread.userId).name }}</a>, 2 hours ago
      <span style="float: left; margin-top: 2px;" class="hide-mobile text-faded text-small">3 replies by 3 contributors</span>
    </p>

    <post-list :posts="threadPosts" />
  </div>
</template>

<script>
import sourceData from '@/data.json'
import PostList from '@/components/PostList'

export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },
  components: {
    PostList
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
    },
    threadPosts() {
      return this.posts.filter(post => post.threadId === this.id)
    }
  },
  methods: {
    userById(id) {
      return this.users.find(user => user.id === id)
    }
  }
}
</script>


<style scoped>
</style>
