import { createStore } from 'vuex'
import sourceData from '@/data.json'

export default createStore({
  state: sourceData,
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
