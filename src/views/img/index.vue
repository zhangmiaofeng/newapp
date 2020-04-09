<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn_box">
        <el-radio-group v-model="reqParamse.collect" @change="changeCollect">
          <el-radio-button :label="true" size="small">全部</el-radio-button>
          <el-radio-button :label="false" size="small">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" @click="openDialog()">添加素材</el-button>
      </div>
      <!-- 图片素材展示 -->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="foot" v-show="!reqParamse.collect">
            <span class="el-icon-star-off" @click="toggleCollect(item)" :class="{selected:item.is_collected}"></span>
            <span @click="deleteImage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParamse.per_page"
        :current-page="reqParamse.page"
        @current-change="changePager"
      ></el-pagination>
    </el-card>
    <!-- 弹框组件 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <span>
        <!-- 上传组件 -->
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :headers="uploadHeaders"
          name="image"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import MyBread from '@/components/my-bread'
export default {
  components: { MyBread },
  data () {
    return {
      reqParamse: {
        collect: false,
        page: 1,
        per_page: 10
      },
      total: 0,
      images: [],
      dialogVisible: false,
      imageUrl: null,
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    //   获取素材列表
    this.getImagelist()
  },
  methods: {
    async getImagelist () {
      const { data: { data } } = await this.$http.get('user/images', this.reqParamse)
      // console.log(data)
      this.total = data.total_count
      this.images = data.results
    },
    // 切换收藏
    changeCollect () {
      this.reqParamse.page = 1
      this.getImagelist()
    },
    changePager (newPage) {
      this.reqParamse.page = newPage
      this.getImagelist()
    },
    // 打开弹框
    openDialog () {
      this.dialogVisible = true
    },
    // 上传图片
    handleAvatarSuccess (res) {
      console.log(res)
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      // 上传成功后过2秒关闭对话框更新列表
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParamse.page = 1
        this.getImagelist()
      }, 2000)
    },
    // 点击收藏图标
    async toggleCollect (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      console.log(data)
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      // 更新当前图片的状态
      item.is_collected = data.collect
    },
    // 删除素材
    deleteImage (id) {
      this.$confirm('亲，此操作要永久删除素材，是否继续？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${id}`)
        this.$message.success('删除成功')
        this.getImagelist()
      }).catch(() => {})
    }
  }
}
</script>

<style lang='less' scoped>
.el-button {
  float: right;
}
.img_list {
  margin-top: 50px;
  .img_item {
    width: 160px;
    height: 160px;
    border: 1px solid #ddd;
    position: relative;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .foot {
      position: absolute;
      width: 100%;
      height: 20%;
      line-height: 30px;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      text-align: center;
      span {
        margin: 0 20px;
        &.selected {
          color: red;
        }
      }
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
