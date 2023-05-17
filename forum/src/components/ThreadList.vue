<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>

      <div v-for="thread in threads"
        :key="thread.id"
        class="thread">
        <div>
          <p>
            <a href="#">{{ thread.title }}</a>
          </p>

          <p class="text-faded text-small">
            By <a href="#">{{ userById(thread.userId).name }}</a>, {{ thread.publishedAt }}
          </p>
        </div>

        <div class="activity">
          <p class="replies-count">
            {{ thread.posts.length }} replies
          </p>

          <img class="avatar-medium" :src="userById(thread.userId).avatar" alt="">

          <div>
            <p class="text-xsmall">
              <a href="#">{{ userById(thread.userId).name }}</a>
            </p>
            <p class="text-xsmall text-faded">{{ thread.publishedAt }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sourceData from '@/data.json'

export default {
  props: {
    threads: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      posts: sourceData.posts,
      users: sourceData.users
    }
  },
  methods: {
    postById(id) {
      return this.posts.find(post => post.id === id)
    },
    userById(id) {
      return this.users.find(user => user.id === id)
    }
  }
}
</script>


<style scoped>

</style>
