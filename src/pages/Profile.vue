<template>
  <div class="flex-grid">
    <div class="col-3 push-top">
      <user-profile-card :user="user" />
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

import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const user = computed(() => store.getters.authUser)
</script>

<style>

</style>
