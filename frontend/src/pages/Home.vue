<template>
  <div class="col-large push-top">
    <h1>Welcome to the Jungle</h1>
    <category-list :categories="categories" />
  </div>
</template>

<script>
import CategoryList from '@/components/CategoryList'

export default {
  components: {
    CategoryList,
  },
  computed: {
    categories() {
      return this.$store.state.categories
    },
  },
};
</script>
