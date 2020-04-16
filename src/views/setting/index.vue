<template>
<div class='container'>
    <!-- 个人设置 -->
    <el-card>
        <div slot="header">
            <my-bread>个人设置</my-bread>
        </div>
        <!-- 栅格系统 -->
        <el-row>
            <el-col :span="12">
                <!-- 表单 -->
                <el-form label-width="120px">
                    <el-form-item label="编号:">{{userForm.id}}</el-form-item>
                    <el-form-item label="手机:">{{userForm.mobile}}</el-form-item>
                    <el-form-item label="媒体名称:">
                        <el-input v-model="userForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="媒体介绍:">
                        <el-input type="textarea" :rows="3" v-model="userForm.intro"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱:">
                        <el-input v-model="userForm.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveUserInfo">保存设置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12">
                <!-- 上传组件 -->
                <el-upload
                    class="avatar-uploader"
                    action=""
                    :http-request="myUpload"
                    :show-file-list="false"
                    >
                    <img v-if="userForm.photo" :src="userForm.photo" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p>修改头像</p>
            </el-col>
        </el-row>
    </el-card>
</div>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      userForm: {
        id: null,
        mobile: null,
        name: null,
        intro: null,
        email: null,
        photo: null
      }
    }
  },
  created () {
    // 获取用户信息
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      console.log(data)
      this.userForm = data
    },
    async saveUserInfo () {
      await this.$http.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('保存设置成功')
      // 当刷新页面的时候 home组件使用的本地存储数据 更新本地存储
      store.setUser({ name: this.userForm.name })
      // 更新home组件的用户名
      eventBus.$emit('updateName', this.userForm.name)
    },
    // 上传头像
    myUpload (result) {
      // 选中图片后触发函数 选择的结果result
      // 文件信息获取 result.file
      // axios+formData 上传数据
      console.log(result)
      const formData = new FormData()
      formData.append('photo', result.file)
      this.$http.patch('user/photo', formData)
        .then((res) => {
          // 上传头像成功
          this.$message.success('修改头像成功')
          // 预览
          this.userForm.photo = res.data.data.photo
          // 同步本地存储
          store.setUser({ photo: this.userForm.photo })
          // 同步home组件
          eventBus.$emit('updatePhoto', this.userForm.photo)
        })
    }
  }
}
</script>

<style lang='less' scoped>
.avatar-uploader {
    margin-left: 180px;
}
p {
    text-align: center;
    font-size: 14px;
}
</style>
