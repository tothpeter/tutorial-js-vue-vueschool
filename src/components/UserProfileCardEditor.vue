<template>
  <div class="profile-card">
    <form @submit.prevent="save">
      <p class="text-center">
      <img :src="user.avatar" class="avatar-xlarge" alt="">
    </p>

    <div class="form-group">
      <input
        v-model="activeUser.username"
        type="text"
        placeholder="Username"
        class="form-input text-lead text-bold"
      />
    </div>

    <div class="form-group">
      <input
        v-model="activeUser.name"
        type="text"
        placeholder="Full name"
        class="form-input text-lead text-bold"
      />
    </div>

    <div class="form-group">
      <label for="user_bio">Bio</label>
      <textarea
        v-model="activeUser.bio"
        placeholder="Bio"
        class="form-input text-lead text-bold"
        id="user_bio"
      ></textarea>
    </div>

    <div class="form-group">
      <label class="form-label" for="user_website">Website</label>
      <input
        v-model="activeUser.website"
        placeholder="Website"
        class="form-input text-lead text-bold"
        id="user_website"
      />
    </div>

    <div class="form-group">
      <label class="form-label" for="user_email">Email</label>
      <input
        v-model="activeUser.email"
        placeholder="Email"
        class="form-input text-lead text-bold"
        id="user_email"
      />
    </div>

    <div class="form-group">
      <label class="form-label" for="user_location">Location</label>
      <input
        v-model="activeUser.location"
        placeholder="Location"
        class="form-input text-lead text-bold"
        id="user_location"
      />
    </div>

    <div class="btn-group space-between">
      <button @click="cancel" class="btn-ghost">Cancel</button>
      <button type="submit" class="btn-blue">Save</button>
    </div>
    </form>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const props = defineProps({
  user: {
    required: true,
    type: Object
  }
})

const activeUser = { ...props.user }

const store = useStore()
const router = useRouter()

function save() {
  store.dispatch('updateUser', activeUser)
  router.push({ name: 'Profile' })
}

function cancel() {
  router.push({ name: 'Profile' })
}
</script>
