<template>
  <div class="flex-grid">
    <div class="col-3 push-top">
      <user-profile-card :user="user" v-if="!state.updatingProfile" />
      <user-profile-card-editor :user="user" v-else  @save="updateUserProfile" />
      <span @click="openCloseProfileEditor">Edit</span>
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

import { computed, reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const user = computed(() => store.getters.authUser)

const state = reactive({
  updatingProfile: !false,
})

function openCloseProfileEditor() {
  state.updatingProfile = !state.updatingProfile
}

function updateUserProfile(eventData) {
  store.dispatch('updateUser', eventData.user)
  openCloseProfileEditor()
}
</script>

<style>

</style>
