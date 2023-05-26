import { createStore } from 'vuex'
import sourceData from '@/data.json'

export default createStore({
  state: {
    ...sourceData,
    authId: '38St7Q8Zi2N1SPa5ahzssq9kbyp1'
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
    createPost(context, post) {
      context.commit('createPost', { post })
      context.commit('appendPostToThread', { post })
    }
  },
  mutations: {
    createPost(state, { post }) {
      post.id = state.posts.length + 1
      post.userId = state.users[0].id

      state.posts.push(post)
    },
    appendPostToThread(state, { post }) {
      const thread = state.threads.find(thread => thread.id === post.threadId)
      thread.posts.push(post.id)
    }
  },
})
