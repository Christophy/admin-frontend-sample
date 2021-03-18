<template>
  <div class="app-container">
    <el-form :rules="createRules" auto-complete="on" :model="createForm" ref="createForm">
      <el-form-item prop="username">
        <el-input v-model="createForm.username"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="createForm.password" type="password"/>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm">submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { validUsername } from '@/utils/validate'

export default {
  // components: {  },
  filters: {
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      createForm: {},
      createRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      }
    }
  },
  created() {
  },
  methods: {
    submitForm() {
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.$message('ok')
        } else {
          this.$message('not valid')
          return false
        }
      })
    }
  }
}
</script>
