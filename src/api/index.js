// 配置一个axios 导出
import axios from 'axios'

import store from '@/store'
import router from '../router'

// 进行基准地址和请求头的配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.defaults.transformResponse = [
  (data) => {
    try {
      return JSON.parse(data)
    } catch (e) {
      return data
    }
  }
]
// axios.defaults.headers = {
//   // 头部加token
//   Authorization: `Bearer ${store.getUser().token}`
// }

// 在每次请求前去拿到token  使用请求拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 修改config,追加headers
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
},
function (error) {
  // 认为返回错误的promise对象
  return Promise.reject(error)
})
// 响应拦截器：在每次响应后 做某一些事情
axios.interceptors.response.use((res) => {
  // 成功的时候做一些事情
  return res
}, (err) => {
  if (err.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(err)
})
// 导出
export default axios
