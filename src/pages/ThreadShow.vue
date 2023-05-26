<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <p>
      By <a href="#" class="link-unstyled">{{ userById(thread.userId).name }}</a>, 2 hours ago
      <span style="float: left; margin-top: 2px;" class="hide-mobile text-faded text-small">3 replies by 3 contributors</span>
    </p>

    <post-list :posts="threadPosts" />

    <post-editor @save="addPost" />
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'

export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },
  components: {
    PostList,
    PostEditor
  },
  data () {
    return {
      threads: this.$store.state.threads,
      posts: this.$store.state.posts,
      users: this.$store.state.users,
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
    },
    addPost(eventData) {
      const newPost = {
        ...eventData.post,
        id: this.posts.length + 1,
        userId: this.users[0].id,
        threadId: this.id,
      }

      this.posts.push(newPost)
      this.thread.posts.push(newPost.id)
    }
  }
}
</script>


<style scoped>
</style>
