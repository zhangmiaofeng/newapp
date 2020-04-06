import VueRouter from 'vue-router'

import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'

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
      // name: 'home',
      component: Home,
      // 路由重定向
      // redirect: '/welcome',
      children: [
        {
          // path: '/welcome',
          path: '/',
          name: 'welcome',
          component: Welcome
        },
        {
          path: '/article',
          name: 'article',
          component: Article
        }
      ]
    }
  ]
})

export default router
