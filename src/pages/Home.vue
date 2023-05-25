<template>
  <div class="col-large">
    <h1>Welcome to the Jungle</h1>
    <forum-list :forums="forums" />
  </div>
</template>

<script>
import sourceData from '@/data.json'
import ForumList from '@/components/ForumList'

export default {
  components: {
    ForumList
  },
  data () {
    return {
      forums: sourceData.forums
    }
  },
}
</script>


<style scoped>

</style>
