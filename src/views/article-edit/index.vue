<template>
  <div class="app-container">
    <article-edit v-bind:is-edit="isEdit" v-bind:id = "id"/>
  </div>
</template>

<script>
import ArticleEdit from '@/components/Article/components/ArticleEdit'

export default {
  components: { ArticleEdit },
  filters: {
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  },
  props: ['id', 'isEdit']
}
</script>
