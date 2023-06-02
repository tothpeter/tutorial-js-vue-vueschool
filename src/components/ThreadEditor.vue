<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input
        v-model="title"
        type="text"
        id="thread_title"
        class="form-input"
        name="title"
      />
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        v-model="text"
        name="content"
        id="thread_content"
        class="form-input">
      </textarea>
    </div>

    <div class="btn-group">
      <button @click="$emit('cancel')" type="button" class="btn-ghost">Cancel</button>
      <button type="submit" class="btn-blue">Save</button>
    </div>
  </form>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'


const props = defineProps({
  title: {
    required: false,
    type: String
  },
  text: {
    required: false,
    type: String
  }
})

let title = props.title || ''
let text = props.text || ''

const emit = defineEmits(['save'])

function save() {
  emit('save', {
    title,
    text
  })
}
</script>
