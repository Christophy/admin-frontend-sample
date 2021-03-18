<template>
  <div class="app-container">
    <el-row type="flex" align="end">
      <el-button @click="create">Create</el-button>
    </el-row>
    <el-row>
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
        <el-table-column label="Title">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="Author" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.publisher }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="Status" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusLabel">{{ scope.row.status | statusName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createdTime" label="createdTime">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.createTime | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="actions">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-open" @click="detail(scope.row.id)" />
            <el-button type="primary" size="small" icon="el-icon-edit" @click="edit(scope.row.id)" v-if="roles.indexOf('ROLE_ADMIN')>=0 || (name == scope.row.publisher  && scope.row.status == 2)" />
            <el-button type="primary" size="small" icon="el-icon-delete" @click="deleteRow(scope.row.id)" v-if="roles.indexOf('ROLE_ADMIN')>=0 || (name == scope.row.publisher  && scope.row.status == 2)"/>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="end">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="pageNum"
        @current-change="handleCurrentChange"
        hide-on-single-page>
      </el-pagination>
    </el-row>

  </div>
</template>

<script>
import { getList, deleteArticle } from '@/api/article'
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  filters: {
    statusLabel(status) {
      const statusMap = {
        0: 'success',
        1: 'gray',
        2: 'danger'
      }
      return statusMap[status]
    },
    statusName(status) {
      const statusMap = {
        0: 'published',
        1: 'submitted',
        2: 'draft'
      }
      return statusMap[status]
    },
    formatDate(time) {
      return parseTime(new Date(time))
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      pageSize: 10,
      pageNum: 1
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const params = { pageNum: this.pageNum, pageSize: this.pageSize }
      getList(params).then(response => {
        this.total = response.data.total
        this.list = response.data.items
        this.listLoading = false
        if (response.data.items.length === 0 && this.pageNum > 1) {
          this.pageNum = 1
          this.handleCurrentChange(1)
        }
      })
    },
    handleCurrentChange(currentPage) {
      this.pageNum = currentPage
      // reload data
      this.fetchData()
    },
    edit(id) {
      this.$router.push('/article/edit/' + id)
    },
    create() {
      this.$router.push('/article/create/')
    },
    detail(id) {
      this.$router.push('/article/detail/' + id)
    },
    deleteRow(id) {
      deleteArticle(id).then(response => {
        this.$message.success('Delete Success')
        this.fetchData()
      }).catch(ex => {
        console.log(ex)
        this.$message.error('Delete Error')
      })
    }
  }
}
</script>
