import { createStore } from 'vuex'
import sourceData from '@/data.json'
import { findById, upsert } from '@/helpers'

export default createStore({
  state: {
    ...sourceData,
    authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
  },
  getters: {
    authUser(state) {
      const user = findById(state.users, state.authId)

      if (!user) return null

      return {
        ...user,
        get posts() {
          return state.posts.filter(post => post.userId === user.id)
        },
        get postsCount() {
          return this.posts.length
        },
        get threads() {
          return state.threads.filter(thread => thread.userId === user.id)
        },
        get threadsCount() {
          return this.threads.length
        }
      }
    }
  },
  actions: {
    createPost({ state, commit }, post) {
      post.id = (state.posts.length + 1).toString()
      post.userId = this.getters.authUser.id
      post.publishedAt = Math.floor(Date.now() / 1000)

      commit('setPost', post)
      commit('appendPostToThread', { post })
    },

    async createThread({ state, commit }, { threadParams, postParams }) {
      const thread = { ...threadParams }
      thread.id = (state.threads.length + 1).toString()
      thread.userId = this.getters.authUser.id
      thread.publishedAt = Math.floor(Date.now() / 1000)

      commit('setThread', thread)
      commit('appendThreadToForum', { thread })
      commit('appendThreadToUser', { thread })

      const post = { ...postParams }
      post.threadId = thread.id
      this.dispatch('createPost', post)

      return thread
    },

    updateThread(context, threadParams) {
      const originalThread = findById(context.state.threads, threadParams.id)

      const newThread = { ...originalThread, ...threadParams }
      context.commit('setThread', newThread)
    },

    updatePost(context, postParams) {
      const originalPost = findById(context.state.posts, postParams.id)

      const newPost = { ...originalPost, ...postParams }
      context.commit('setPost', newPost)
    },

    updateUser(context, userParams) {
      const originalUser = findById(context.state.users, userParams.id)

      const newUser = { ...originalUser, ...userParams }
      context.commit('setUser', newUser)
    }
  },
  mutations: {
    setPost(state, post) {
      upsert(state.posts, post)
    },

    appendPostToThread(state, { post }) {
      const thread = findById(state.threads, post.threadId)
      thread.posts = thread.posts || []
      thread.posts.push(post.id)
    },

    setThread(state, thread) {
      upsert(state.threads, thread)
    },

    appendThreadToForum(state, { thread }) {
      const forum = findById(state.forums, thread.forumId)
      forum.threads.push(thread.id)
    },

    appendThreadToUser(state, { thread }) {
      const user = findById(state.users, thread.userId)
      user.threads = user.threads || []
      user.threads.push(thread.id)
    },

    setUser(state, user) {
      upsert(state.users, user)
    }
  },
})
