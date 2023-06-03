import { createStore } from 'vuex'
import sourceData from '@/data.json'
import { findById, upsert } from '@/helpers'

export default createStore({
  state: {
    ...sourceData,
    authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
  },
  getters: {
    authUser(state, getters) {
      return getters.user(state.authId)
    },

    user(state) {
      return function(id) {
        const user = findById(state.users, id)

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

    thread(state) {
      return function(id) {
        const thread = findById(state.threads, id)

        return {
          ...thread,
          get author() {
            return findById(state.users, thread.userId)
          },
          get repliesCount() {
            return thread.posts.length - 1
          },
          get contributorCount() {
            return thread.contributors.length
          }
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
      commit('appendPostToThread', { parentId: post.threadId, childId: post.id })
      commit('appendContributorToThread', { parentId: post.threadId, childId: post.userId })
    },

    async createThread({ state, commit }, { threadParams, postParams }) {
      const thread = { ...threadParams }
      thread.id = (state.threads.length + 1).toString()
      thread.userId = this.getters.authUser.id
      thread.publishedAt = Math.floor(Date.now() / 1000)

      commit('setThread', thread)
      commit('appendThreadToForum', { parentId: thread.forumId, childId: thread.id })
      commit('appendThreadToUser', { parentId: thread.userId, childId: thread.id })

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

    appendPostToThread: makeAppendChildToParentMutation({ parentName: 'threads', childName: 'posts' }),

    setThread(state, thread) {
      upsert(state.threads, thread)
    },

    appendThreadToForum: makeAppendChildToParentMutation({ parentName: 'forums', childName: 'threads' }),
    appendThreadToUser: makeAppendChildToParentMutation({ parentName: 'users', childName: 'threads' }),
    appendContributorToThread: makeAppendChildToParentMutation({ parentName: 'threads', childName: 'contributors' }),

    setUser(state, user) {
      upsert(state.users, user)
    }
  },
})

function makeAppendChildToParentMutation({ parentName, childName }) {
  return (state, { parentId, childId }) => {
    const resource = findById(state[parentName], parentId)
    resource[childName] = resource[childName] || []

    if(!resource[childName].includes(childId)) {
      resource[childName].push(childId)
    }
  }
}
