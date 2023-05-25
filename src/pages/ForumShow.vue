<template>
  <div class="col-full">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <a href="#" class="btn-green btn-small">Start a new thread</a>
    </div>

    <div class="push-top">
      <thread-list :threads="threads" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import sourceData from '@/data.json'
import ThreadList from '@/components/ThreadList.vue'

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

const forum = sourceData.forums.find(forum => forum.id === props.id)

const threads = sourceData.threads.filter(thread => thread.forumId === forum.id)
</script>
