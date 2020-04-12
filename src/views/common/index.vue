<template>
<div class='container'>
    <el-card>
        <div slot="header">
            <my-bread>评论管理</my-bread>
        </div>
        <el-table :data="comments">
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
            <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    {{scope.row.comment_status?'正常':'关闭'}}
                </template>
            </el-table-column>
            <el-table-column width="160px" label="操作">
                <template slot-scope="scope">
                    <el-button
                    v-if="!scope.row.comment_status"
                    size="small"
                    type="success"
                    @click="toggleStatus(scope.row)"
                    >打开评论</el-button>
                    <el-button @click="toggleStatus(scope.row)" v-else size="small" type="danger">关闭评论</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          style="margin-top:15px"
          background layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePager"
        ></el-pagination>
    </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      total: 0,
      comments: []
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async getComments () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    // 切换  打开  关闭 评论功能
    async toggleStatus (row) {
      const {
        data: { data }
      } = await this.$http.put(`comments/status?article_id=${row.id}`, {
        allow_comment: !row.comment_status
      })
      this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
      // 修改当前状态  更新列表
      row.comment_status = data.allow_comment
    }
  }
}
</script>

<style lang='stylus' scoped></style>
