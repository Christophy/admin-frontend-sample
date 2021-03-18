<template>
  <div class="createPost-container">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span = "24">
            <el-row class="title">
              <el-header>{{postForm.title}}({{postForm.createTime | formatDate}} by {{postForm.publisher}})</el-header>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="main-content" v-html="postForm.content">
        </el-row>
      </div>
  </div>
</template>

<script>
import { getDetail } from '@/api/article'
import { parseTime } from '@/utils'

export default {
  name: 'ArticleDetail',
  // components: {  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      postForm: {}
    }
  },
  computed: {
  },
  created() {
    const id = this.id
    this.fetchData(id)
  },
  methods: {
    fetchData(id) {
      getDetail(id).then(response => {
        this.postForm = response.data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  filters: {
    formatDate(time) {
      return parseTime(new Date(time))
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
