<template>
<div class='container'>
    <!-- 图片按钮 -->
    <div class="imgBtn">
      <img src="../assets/images/default.png" @click="openDialog()" alt="">
      <!-- 上传组件 -->
    </div>
    <!-- 对话框 -->
    <el-dialog title="选择封面" :visible.sync="dialogVisible" width="700">
      <span>tabs</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
export default {
  name: 'MyImage',
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    // 打开对话框
    openDialog () {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang='less' scoped>
.img-btn {
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
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
</style>
