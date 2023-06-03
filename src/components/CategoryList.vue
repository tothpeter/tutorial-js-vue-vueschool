<template>
  <div>
    <div class="forum-list" v-for="category in categories" :key="category.id">
      <div class="list-title">
        <router-link :to="{ name: 'CategoryShow', params: { id: category.id } }">
          {{ category.name }}
        </router-link>
      </div>
      <forum-list :forums="getForumsForCategory(category)" />
    </div>
  </div>
</template>

<script setup>
import ForumList from './ForumList'

import { useStore } from 'vuex'

defineProps({
  categories: {
    required: true,
    type: Array,
  }
})

const state = useStore().state

function getForumsForCategory(category) {
  return state.forums.filter(forum => forum.categoryId === category.id)
}
</script>

<style>

</style>
