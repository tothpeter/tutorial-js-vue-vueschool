<template>
  <div class="col-large push-top">
    <h1>{{ category.name }}</h1>
    <category-list :categories="[category]" />
  </div>
</template>

<script setup>
import CategoryList from '@/components/CategoryList'
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

const category = computed(() => {
  return findById(state.categories, props.id)
})
</script>
