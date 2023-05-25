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
import { defineProps } from 'vue'
import ForumList from './ForumList'
import sourceData from '../data.json'

defineProps({
  categories: {
    required: true,
    type: Array,
  }
})

function getForumsForCategory(category) {
  return sourceData.forums.filter(forum => forum.categoryId === category.id)
}
</script>

<style>

</style>
