import Vue from 'vue'
import App from './App.vue'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入路由
import router from '@/router'

// 引入axios
import axios from '@/api'
Vue.prototype.$http = axios

// 挂载
Vue.use(ElementUI)
// I在控制台提示信息
Vue.config.productionTip = false

// main.js
// 职责：导入项目需要的依赖资源 js css 等等其他资源
// 创建一个根实例

// 创建一个根实例 渲染根组件 挂载在App组件
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
