import VueRouter from 'vue-router'

import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'

Vue.use(VueRouter)

const router = new VueRouter({
// 配置路由规则
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})

export default router
