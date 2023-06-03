<template>
  <div class="flex-grid">
    <div class="col-3 push-top">
      <user-profile-card :user="user" v-if="!edit" />
      <user-profile-card-editor :user="user" v-else  @save="updateUserProfile" />
    </div>

    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead">{{ user.name }}'s recent activity</span>
      </div>
      <hr />
      <PostList :posts="user.posts" />
    </div>
  </div>
</template>

<script setup>
import PostList from '@/components/PostList.vue'
import UserProfileCard from '@/components/UserProfileCard'
import UserProfileCardEditor from '@/components/UserProfileCardEditor'

import { computed } from 'vue'
import { useStore } from 'vuex'

defineProps({
  edit: {
    required: true,
    type: Boolean,
    default: false
  }
})

const store = useStore()

const user = computed(() => store.getters.authUser)
</script>
