<template>
  <div class="container">
    <!-- 筛选条件 -->
    <el-card>
      <div slot="header">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb> -->
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
          <el-select v-model="reqParamse.channel_id" multiple placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <el-card>
      <!-- 具名插槽 -->
      <div slot="header">
        根据筛选条件查询到 0条 结果
      </div>
      <!-- 表格组件 -->
      <el-table
        :data="articles"
        style="width: 100%">
        <el-table-column
          prop="img"
          label="封面"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布日期">
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="text-align:center;margin-top:20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import MyBread from '@/components/my-bread'
export default {
  components: { MyBread },
  data () {
    return {
      // 筛选项表单数据,提交给后台参数
      reqParamse: {
        status: null,
        channel_id: null
      },
      // 频道的下拉选项数据
      channelOptions: [
        { value: 1, label: '绩效考核' }
      ],
      // 时间日期
      dateArr: [],
      // 表格数据
      articles: [
        { img: '1', title: '', status: '', pubdate: '' }
      ]
    }
  },
  // 在创建实例之后发请求 获取数据
  created () {
    this.$http.get('http://ttapi.research.itcast.cn/mp/v1_0/articles')
      .then((res) => {
        console.log(res)
      })
  }
}
</script>

<style lang='stylus' scoped></style>
