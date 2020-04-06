<template>
<div class='container'>
  <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt="">
      <!-- 表单 -->
      <el-form :model="loginForm" ref="loginForm" :rules="loginRules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号码" style="width:300px;margin-right:10px;"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入短信验证码" style="width:180px;margin-right:10px;"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
         <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
  </el-card>
</div>
</template>

<script>
export default {
  data () {
    // 声明自定义的函数
    const checkMobile = (rule, value, callback) => {
      // 校验手机号码 1开头 第二位3-9  9位数组 /^1[3-9]\d{9}$/
      if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机号码格式不正确'))
      callback()
    }
    return {
      loginForm: {
        mobile: '',
        code: ''
      },
      // 表单验证规则
      // 添加自定义校验规则
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // 自定义校验规则
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 整体校验规则
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log('成功提交')
          // 请求后台数据 传递参数
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then(res => {
              console.log(res.data)
            })
            .catch(() => {

            })
        } else {
          console.log('提交失败')
          return false
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(../../assets/images/login_bg.jpg) no-repeat center / cover
}
    .my-card {
        width: 400px;
        height: 400px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -60%);
        img {
           display: block;
           width: 200px;
           margin: 0 auto;
        }
    }
</style>
