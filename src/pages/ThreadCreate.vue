<template>
  <div class="col-full push-top">
    <h1>Create a new thread in <i>{{ forum.name }}</i></h1>

    <form @submit.prevent="create">
      <div class="form-group">
        <label for="thread_title">Title:</label>
        <input
          v-model="newThread.title"
          type="text"
          id="thread_title"
          class="form-input"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="thread_content">Content:</label>
        <textarea
          v-model="newPost.text"
          name="content"
          id="thread_content"
          class="form-input">
        </textarea>
      </div>

      <div class="btn-group">
        <button @click="cancel" type="button" class="btn-ghost">Cancel</button>
        <button type="submit" class="btn-blue">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { defineProps, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

const props = defineProps({
  id: {
    required: true,
    type: Number
  }
})

const store = useStore()
const state = store.state

const forum = computed(() => { return state.forums.find(forum => forum.id === props.id) })

const newThread = reactive({
  title: 'TTTitle',
  forumId: props.id
})

const newPost = {
  text: 'Cont'
}

function cancel() {
  router.push({ name: 'ForumShow', params: { id: props.id } })
}

function create() {
  store.dispatch('createThread', {
    post: newPost,
    thread: newThread
  })

  router.push({ name: 'ForumShow', params: { id: props.id } })
  // newThread.title = ''
  // newPost.content = ''
}
</script>

<style>

</style>
