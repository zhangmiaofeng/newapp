<template>
  <div class="container">
    <!-- 筛选条件 -->
    <el-card>
      <div slot="header">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>-->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单 -->
      <el-form size="small">
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParamse.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <!-- 使用自己的组件 -->
          <my-channel v-model="reqParamse.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <el-card>
      <!-- 具名插槽 -->
      <div slot="header">根据筛选条件查询到 {{total}}条 结果</div>
      <!-- 表格组件 -->
      <el-table :data="articles" style="width: 100%">
        <el-table-column prop="images" label="封面" width="180">
          <!-- 使用作用域插槽 -->
          <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <el-image :src="scope.row.cover.images[0]" fit="cover" style="width:120px;height:80px">
              <div slot="error" class="image-slot">
                <img class="el-icon-picture-outline" style="width:120px;height:80px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="successfo">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="操作" width="180">
          <template slot-scope="scope">
            <el-button plain type="primary" icon="el-icon-edit" @click="edit(scope.row.id)" circle>编辑</el-button>
            <el-button plain type="danger" @click="del(scope.row.id)" icon="el-icon-delete" circle>删除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期"></el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="text-align:center;margin-top:20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParamse.per_page"
          :current-page="reqParamse.page"
          @current-change="changePager"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
export default {
  components: { MyBread, MyChannel },
  data () {
    return {
      // 筛选项表单数据,提交给后台参数
      reqParamse: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道的下拉选项数据
      channelOptions: [],
      // 时间日期
      dateArr: [],
      // 表格数据
      articles: [],
      total: 0
    }
  },
  // 在创建实例之后发请求 获取数据
  created () {
    this.getArticles()
  },
  methods: {
    // 获取筛选结果数据 携带参数
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { paramse: this.reqParamse })
      console.log(data)
      this.articles = data.results
      this.total = data.total_count
    },
    // 改变分页
    changePager (newPage) {
      this.reqParamse.page = newPage
      this.getArticles()
    },
    // 筛选功能
    search () {
      // 从第一页开始
      this.reqParamse.page = 1
      this.getArticles()
    },
    // 点击日期事件 传参日期数组
    changDate (dateArr) {
      if (dateArr) {
        console.log(dateArr)
        this.reqParamse.begin_pubdate = dateArr[0]
        this.reqParamse.end_pubdate = dateArr[1]
      } else {
        this.reqParamse.begin_pubdate = null
        this.reqParamse.end_pubdate = null
      }
    },
    // 编辑
    edit (id) {
      // 跳转到编辑页面
      this.$router.push('/publish?id=' + id)
    },
    // 删除
    del (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles/${id}`)
        this.$message.error('删除文章成功')
        this.getArticles()
      }).catch(() => {})
    }
  }
}
</script>

<style lang='less' scoped></style>
