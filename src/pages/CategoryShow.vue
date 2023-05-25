<template>
  <div class="col-large push-top">
    <h1>{{ category.name }}</h1>
    <category-list :categories="[category]" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import sourceData from '@/data.json'
import CategoryList from '@/components/CategoryList'

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

const category = sourceData.categories.find(category => category.id === props.id)
</script>
