<template>
<div class='container'>
    <!-- 粉丝管理 -->
    <el-card>
        <div slot="header">
            <my-bread>粉丝管理</my-bread>
        </div>
        <!-- tab组件 -->
        <el-tabs v-model="activeName" >
            <el-tab-pane label="粉丝列表" name="list">
                <div class="fans">
                    <div class="fans-item" v-for="item in fansList" :key="item.id">
                        <el-avatar style="width:80px;height:80px" :src="item.photo"></el-avatar>
                        <p style="font-size:12px">{{item.name}}</p>
                        <el-button size="mini" plain="" type="primary">+关注</el-button>
                    </div>
                </div>
                <!-- 分页 -->
                <el-pagination
                    style="margin-top:20px"
                    v-if="total > reqParams.per_page"
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="reqParams.per_page"
                    :current-page="reqParams.page"
                    @current-change="changePager"
                ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="粉丝画像" name="photo">
                柱状图
            </el-tab-pane>
        </el-tabs>
    </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 24
      },
      fansList: [],
      total: 0,
      activeName: 'photo',
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  created () {
    this.getFansList()
  },
  methods: {
    async getFansList () {
      const { data: { data } } = await this.$http.get('followers', { params: this.reqParams })
      console.log(data)
      this.fansList = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.reqParamspage = newPage
      this.getFansList()
    },
    handleClick () {}
  }
}
</script>

<style lang='less' scoped>
.fans-item {
  text-align: center;
  width: 180px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
  padding-top: 15px;
}
</style>
