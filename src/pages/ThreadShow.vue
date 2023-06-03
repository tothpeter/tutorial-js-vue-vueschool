<template>
  <div class="col-large push-top">
    <h1>
      {{ thread.title }}
      <router-link
        :to="{ name: 'ThreadEdit', params: { id: thread.id } }"
        custom
        v-slot="{ navigate }"
      >
        <button @click="navigate" class="btn-green btn-small">Edit</button>
      </router-link>
    </h1>

    <p>
      By <a href="#" class="link-unstyled">{{ userById(thread.userId).name }}</a>, 2 hours ago
      <span
        style="float: right; margin-top: 2px;"
        class="hide-mobile text-faded text-small"
      >3 replies by 3 contributors</span>
    </p>

    <post-list :posts="threadPosts" />

    <post-editor @save="addPost" />
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'
import { findById } from '@/helpers'

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
  computed: {
    threads() {
      return this.$store.state.threads
    },
    posts() {
      return this.$store.state.posts
    },
    users() {
      return this.$store.state.users
    },
    thread() {
      return findById(this.threads, this.id)
    },
    threadPosts() {
      return this.posts.filter(post => post.threadId === this.id)
    }
  },
  methods: {
    userById(id) {
      return findById(this.users, id)
    },
    addPost(eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id,
      }

      this.$store.dispatch('createPost', post)
    }
  }
}
</script>
