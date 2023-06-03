<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input
        v-model="form.title"
        type="text"
        id="thread_title"
        class="form-input"
        name="title"
      />
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        v-model="form.text"
        name="content"
        id="thread_content"
        class="form-input">
      </textarea>
    </div>

    <div class="btn-group">
      <button @click="$emit('cancel')" type="button" class="btn-ghost">Cancel</button>
      <button type="submit" class="btn-blue">
        {{ existing ? 'Update' : 'Create' }}
      </button>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: '' },
  text: { type: String, default: '' }
})

const form = {
  title: props.title,
  text: props.text
}

const existing = !!props.title

const emit = defineEmits(['save'])

function save() {
  emit('save', { ...form })
}
</script>
