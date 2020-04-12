<template>
<div class='container'>
    <!-- 图片按钮 -->
    <div class="imgBtn">
      <img :src="value||defaultImage" @click="openDialog()" alt="">
      <!-- 上传组件 -->
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700">
        <!-- tabs切换组件 -->
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="素材库" name="image">
                <!-- 按钮组件 -->
                <el-radio-group v-model="reqParams.collect" @change="changeCollect" size="mini">
                    <el-radio-button :label="false">全部</el-radio-button>
                    <el-radio-button :label="true">收藏</el-radio-button>
                </el-radio-group>
                <!-- 图片素材展示 -->
                <div class="img_list">
                    <div class="img_item"
                    @click="selectedImage(item.url)"
                    v-for="item in images"
                    :key="item.id"
                    :class="{selected: selectedImageUrl === item.url}">
                    <img :src="item.url" alt />
                    </div>
                </div>
                 <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="reqParams.per_page"
                    :current-page="reqParams.page"
                    @current-change="changePager"
                ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="上传图片" name="upload">
                <!-- 上传组件 -->
                <el-upload
                class="avatar-uploader"
                action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :headers="uploadHeaders"
                name="image"
                >
                <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-tab-pane>
        </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
import store from '@/store'
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 图片列表数据
      images: [],
      total: 0,
      selectedImageUrl: null,
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      //  上传图片的地址
      uploadImageUrl: null,
      //  封面图地址
      //   value: defaultImage
      defaultImage
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 打开对话框
    openDialog () {
      this.dialogVisible = true
      // 清空之前选中上传图片的地址
      this.selectedImageUrl = null
      this.uploadImageUrl = null
      this.getImages()
    },
    // 获取图片列表数据
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { paramse: this.reqParams })
      console.log(data)
      this.images = data.results
      this.total = data.total_count
    },
    // 切换收藏
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    // 上传图片
    handleAvatarSuccess (res) {
      console.log(res)
      this.uploadImageUrl = res.data.url
    },
    // 确认上传图片
    confirmImage () {
      // 关闭前显示选中图片上传地址
      if (this.activeName === 'image') {
        this.$emit('input', this.selectedImageUrl)
        // this.value = this.selectedImageUrl
      } else {
        this.$emit('input', this.uploadImageUrl)
        // this.value = this.uploadImageUrl
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  display: inline-block;
  margin-right: 20px;
}
.imgBtn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
.img_list {
  margin-top: 50px;
  .img_item {
    width: 160px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    margin-bottom: 10px;
     // 以下选中样式
    position: relative;
    &.selected {
        &::after{
        // .img-item.selected::after{}
        content:"";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2) url(../assets/images/selected.png) no-repeat center / 50px 50px;
        }
    }
  }
}
img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
}
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
.img-list {
  margin-top: 10px;
}
.img-item {
  width: 160px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 10px;
  position: relative;
  &.selected {
    &::after {
      // .img-item.selected::after{}
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center / 50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
}
</style>
