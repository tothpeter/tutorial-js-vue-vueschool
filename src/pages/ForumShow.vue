<template>
  <div class="col-full">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <router-link :to="{ name: 'ThreadCreate', params: { id: forum.id } }"
                   class="btn-green btn-small">Start a new thread</router-link>
    </div>

    <div class="push-top">
      <thread-list :threads="threads" />
    </div>
  </div>
</template>

<script setup>
import ThreadList from '@/components/ThreadList.vue'
import { findById } from '@/helpers'

import { computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

const state = useStore().state

const forum = computed(() => { return findById(state.forums, props.id) })
const threads = computed(() => { return state.threads.filter(thread => thread.forumId === props.id) })
</script>
