import { createStore } from 'vuex'
import sourceData from '@/data.json'

export default createStore({
  state: {
    ...sourceData,
    authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
  },
  getters: {
    authUser(state) {
      const user = state.users.find(user => user.id === state.authId)

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

      commit('createPost', { post })
      commit('appendPostToThread', { post })
    },

    async createThread({ state, commit }, { threadParams, postParams }) {
      const thread = { ...threadParams }
      thread.id = (state.threads.length + 1).toString()
      thread.userId = this.getters.authUser.id
      thread.publishedAt = Math.floor(Date.now() / 1000)

      commit('createThread', { thread })
      commit('appendThreadToForum', { thread })
      commit('appendThreadToUser', { thread })

      const post = { ...postParams }
      post.threadId = thread.id
      this.dispatch('createPost', post)

      return thread
    },

    updateThread(context, { threadParams }) {
      context.commit('updateThread', threadParams)
    },

    updatePost(context, { postParams }) {
      context.commit('updatePost', postParams)
    },

    updateUser(context, user) {
      context.commit('updateUser', { user, userId: user.id })
    }
  },
  mutations: {
    createPost(state, { post }) {
      state.posts.push(post)
    },

    createThread(state, { thread }) {
      state.threads.push(thread)
    },

    appendPostToThread(state, { post }) {
      const thread = state.threads.find(thread => thread.id === post.threadId)
      thread.posts = thread.posts || []
      thread.posts.push(post.id)
    },

    appendThreadToForum(state, { thread }) {
      const forum = state.forums.find(forum => forum.id === thread.forumId)
      forum.threads.push(thread.id)
    },

    appendThreadToUser(state, { thread }) {
      const user = state.users.find(user => user.id === thread.userId)
      user.threads = user.threads || []
      user.threads.push(thread.id)
    },

    updateThread(state, threadParams) {
      const threadIndex = state.threads.findIndex(thread => thread.id === threadParams.id)
      const originalThread = state.threads[threadIndex]

      state.threads[threadIndex] = { ...originalThread, ...threadParams }
    },

    updatePost(state, postParams) {
      const postIndex = state.posts.findIndex(post => post.id === postParams.id)
      const originalPost = state.posts[postIndex]

      state.posts[postIndex] = { ...originalPost, ...postParams }
    },

    updateUser(state, { user, userId }) {
      const userIndex = state.users.findIndex(user => user.id === userId)

      state.users[userIndex] = { ...user }
    }
  },
})
