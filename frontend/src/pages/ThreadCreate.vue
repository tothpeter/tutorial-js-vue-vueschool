<template>
  <div class="col-full push-top">
    <h1>Create a new thread in <i>{{ forum.name }}</i></h1>

    <thread-editor @cancel="cancel" @save="create" />
  </div>
</template>

<script setup>
import ThreadEditor from '@/components/ThreadEditor.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
import { findById } from '@/helpers'

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

const store = useStore()
const state = store.state

const forum = computed(() => { return findById(state.forums, props.id) })

function cancel() {
  router.push({ name: 'ForumShow', params: { id: props.id } })
}

async function create({ title, text }) {
  const threadParams = {
    title,
    forumId: props.id
  }

  const postParams = {
    text
  }

  const newThread = await store.dispatch('createThread', {
    threadParams,
    postParams
  })

  router.push({ name: 'ThreadShow', params: { id: newThread.id } })
}
</script>
