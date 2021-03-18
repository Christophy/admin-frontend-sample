<template>
  <div class="app-container">
    <article-detail v-bind:id="id"/>
  </div>
</template>

<script>
import ArticleDetail from '@/components/Article/components/ArticleDetail'

export default {
  components: { ArticleDetail },
  filters: {
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
  },
  props: ['id']
}
</script>
