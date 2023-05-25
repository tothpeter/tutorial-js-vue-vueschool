<template>
  <div>
    <div class="forum-listing" v-for="forum in forums" :key="forum.id">
      <div class="forum-details">
        <router-link
          class="text-xlarge"
          :to="{ name: 'ForumShow', params: { id: forum.id } }"
        >
          {{ forum.name }}
        </router-link>
        <p>{{ forum.description }}</p>
      </div>

      <div class="thread-count">
        <p v-if="forum.threads">
          <span class="count">{{ forum.threads.length }}</span>
          {{ forum.threads.length > 1 ? 'threads' : 'thread' }}
        </p>
        <p v-else>no threads</p>
      </div>

      <div class="last-thread"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  forums: {
    required: true,
    type: Array,
  }
})
</script>

<style>

</style>
