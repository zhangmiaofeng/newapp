<template>
  <div class="wrapper">
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <!-- 公司logo -->
        <div class="logo" :class="{miniLogo:isCollapse}">后台管理系统</div>
        <!-- 导航菜单 -->
        <el-menu
          :default-active="$route.path"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="el-icon-menu"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-position"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/common">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 图标 文字 -->
          <span class="el-icon-s-fold" @click="toggleMenu()"></span>
          <span class="text">某科技有限公司</span>
          <!-- 右边下拉菜单 -->
          <el-dropdown class="my-dropdown" @command="changMenu">
            <span class="el-dropdown-link">
              <img :src="photo" alt />
              {{name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-setting" @click.native="loadout()">个人设置</el-dropdown-item> -->
              <el-dropdown-item icon="el-icon-unlock" command="setting">退出登录</el-dropdown-item>
              <el-dropdown-item icon="el-icon-unlock" command="loadout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
            <!-- 二级路由的出口 -->
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      // 控制展开收起
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  created () {
    // 更新名字
    eventBus.$on('updateName', (name) => {
      this.name = name
    })
    // 从本地存储中取用户信息
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    // 切换侧边栏导航展开还是收起
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    // 个人设置
    setting () {
      // click 事件是原生事件 要绑定在原生dom上
      // 事件修饰符native 就是原生
      this.$router.push({ name: '/setting' })
    },
    // 退出登录
    loadout () {
      // 清除用户信息
      store.clearUser()
      this.$router.push({ name: '/login' })
    },
    // 当触发command的时候会自动传递触发的事件类型
    changMenu (menuType) {
      this[menuType]()
    }
  }

}
</script>

<style lang='less' scoped>
.el-container {
  height: 100%;
}
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #002033;
    // height: 100%;
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 10px;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
    .my-dropdown {
      float: right;
      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .el-dropdown-link {
        font-weight: bold;
      }
    }
  }
}
.logo {
  width: 100%;
  height: 60px;
  line-height: 60px;
  color: #fff;
  text-align: center;
}
// 小图
.miniLogo {
//   background-image: url(../../assets/images/logo_admin_01.png) no-repeat;
//   background-size: 36px auto;
font-size: 14px;
}
.el-menu {
  // 边框一像素
  border-right: none;
}
</style>
