<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="username" prop="username">
      </el-table-column>
      <el-table-column align="center" label="actions">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-delete" @click="deleteUser(scope.row.id)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/user'
export default {
  // components: {  },
  filters: {
  },
  data() {
    return {
      list: [],
      listLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getList().then(res => {
        this.list = res.data.items
        this.listLoading = false
      }).catch(e => {
        console.log(e)
      })
    },
    deleteUser(id) {
      this.$message(id)
      // deleteUser().then(res => {
      //   this.$message('delete succeded!')
      // }).catch(e => {
      //   console.log(e)
      // })
    }
  }
}
</script>
