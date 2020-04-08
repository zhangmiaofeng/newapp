import VueRouter from 'vue-router'

import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'
import Img from '@/views/img'

import store from '@/store'

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
        },
        {
          path: '/image',
          name: 'img',
          component: Img
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

// 设置前置路由导航守卫
router.beforeEach((to, from, next) => {
  // // 判断是否登录
  // if (to.path === '/login') return next()
  // // 判断是否登录
  // if (!store.getUser().token) return next('/login')
  // // 放行
  // next()
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
export default router
