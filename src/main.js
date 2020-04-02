import Vue from 'vue'
import App from './App.vue'

// I在控制台提示信息
Vue.config.productionTip = false

// main.js
// 职责：导入项目需要的依赖资源 js css 等等其他资源
// 创建一个根实例

// 创建一个根实例 渲染根组件 挂载在App组件
new Vue({
  render: h => h(App)
}).$mount('#app')
