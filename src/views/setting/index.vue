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
                    <el-form-item label="编号:">1</el-form-item>
                    <el-form-item label="手机:">111</el-form-item>
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
                        <el-button type="primary" @click="onSubmit">保存设置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12">
                <!-- 上传组件 -->
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p>修改头像</p>
            </el-col>
        </el-row>
    </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      userForm: {
        name: '',
        intro: '',
        email: ''
      },
      imageUrl: null
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
