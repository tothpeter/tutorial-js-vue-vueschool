<template>
  <div class="col-full push-top">
    <h1>Editing <i>{{ thread.title }}</i></h1>

    <thread-editor @cancel="cancel" @save="update" :title="thread.title" :text="text" />
  </div>
</template>

<script setup>
import ThreadEditor from '@/components/ThreadEditor.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

const store = useStore()
const state = store.state

const thread = computed(() => { return state.threads.find(thread => thread.id === props.id) })

let text = state.posts.find(post => post.id === thread.value.posts[0]).text

function cancel() {
  router.push({ name: 'ThreadShow', params: { id: props.id } })
}

function update({ title, text }) {
  const threadParams = {
    title,
    id: props.id
  }

  store.dispatch('updateThread', { threadParams })

  const postParams = {
    text,
    id: thread.value.posts[0]
  }

  store.dispatch('updatePost', { postParams })

  router.push({ name: 'ThreadShow', params: { id: props.id } })
}
</script>
