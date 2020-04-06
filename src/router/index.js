import VueRouter from 'vue-router'

import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'

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
    },
    // 处理404 页面
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})

export default router
