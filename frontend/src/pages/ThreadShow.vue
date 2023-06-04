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
      By <a href="#" class="link-unstyled">{{ thread.author?.name }}</a>, <base-date :timestamp="thread.publishedAt" />
      <span
        style="float: right; margin-top: 2px;"
        class="hide-mobile text-faded text-small"
      >{{ thread.repliesCount }} replies by {{ thread.contributorCount }} contributors</span>
    </p>

    <post-list :posts="threadPosts" />

    <post-editor @save="addPost" />
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'
import { findById } from '@/helpers'
import axios from 'axios'

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
      return this.$store.getters.thread(this.id)
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
  },
  created() {
    axios.get(`http://localhost:3000/forum_threads/${this.id}`).then(response => {
      const thread = {
        ...response.data,
        userId: response.data.user_id,
        publishedAt: response.data.published_at
      }

      delete thread.user_id
      delete thread.published_at

      this.$store.commit('setThread', thread)
    }).then(() => {
      axios.get(`http://localhost:3000/users/${this.thread.userId}`).then(response => {
        this.$store.commit('setUser', response.data)
      })
    }).then(() => {
      axios.get('http://localhost:3000/users').then(response => {
        response.data.forEach(user => {
          this.$store.commit('setUser', user)
        })
      })
    }).then(() => {
      axios.get(`http://localhost:3000/forum_threads/${this.id}/posts`).then(response => {
        response.data.forEach(post => {
          const postWithAuthor = {
            ...post,
            userId: post.user_id,
            threadId: post.thread_id,
            publishedAt: post.published_at
          }

          delete postWithAuthor.user_id
          delete postWithAuthor.thread_id
          delete postWithAuthor.published_at

          this.$store.commit('setPost', postWithAuthor)
        })
      })
    })
  }
}
</script>
