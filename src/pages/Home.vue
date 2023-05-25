<template>
  <div class="col-large">
    <h1>Welcome to the Jungle</h1>
    <category-list :categories="categories" />
  </div>
</template>

<script>
import sourceData from '@/data.json'
import CategoryList from '@/components/CategoryList'

export default {
  components: {
    CategoryList
  },
  data () {
    return {
      categories: sourceData.categories
    }
  },
}
</script>


<style scoped>

</style>
