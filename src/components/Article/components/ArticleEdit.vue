<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title" >
              <el-input v-model="postForm.title" :maxlength="100" name="name" label="title" required>
                Title
              </el-input>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>

              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item>

        <el-button type="submit" @click="draftForm" v-if="postForm.status == 2">draft</el-button>
        <el-button type="submit" @click="submitForm" v-if="postForm.status == 2">submit</el-button>
        <el-button type="submit" @click="publishForm" v-if="postForm.status == 1 && roles.indexOf('ROLE_ADMIN')>=0">publish</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { getDetail, insertArticle } from '@/api/article'
import { mapGetters } from 'vuex'

const defaultForm = {
  status: 2,
  title: '', // 文章题目
  content: '', // 文章内容
  source_uri: '', // 文章外链
  create_time: undefined, // 前台展示时间
  id: undefined
}

export default {
  name: 'ArticleEdit',
  components: { Tinymce },
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
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.display_time))
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    },
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    if (this.isEdit) {
      const id = this.id
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      getDetail(id).then(response => {
        this.postForm = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          const oldStatus = this.postForm.status
          this.postForm.status = '1'
          insertArticle(this.postForm).then(response => {
            this.$message({
              message: '保存成功',
              type: 'success',
              showClose: true,
              duration: 1000
            })
            // draft
            this.loading = false
          }).catch(ex => {
            console.log(ex)
            this.postForm.status = oldStatus
          })
        } else {
          return false
        }
      })
    },
    publishForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          const oldStatus = this.postForm.status
          this.postForm.status = '0'
          insertArticle(this.postForm).then(response => {
            this.$message({
              message: '保存成功',
              type: 'success',
              showClose: true,
              duration: 1000
            })
            // draft
            this.loading = false
          }).catch(ex => {
            console.log(ex)
            this.postForm.status = oldStatus
          })
        } else {
          return false
        }
      })
    },
    draftForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          insertArticle(this.postForm).then(response => {
            this.$message({
              message: '保存成功',
              type: 'success',
              showClose: true,
              duration: 1000
            })
            // draft
            this.postForm.status = '2'
            this.loading = false
          })
        } else {
          return false
        }
      })
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
