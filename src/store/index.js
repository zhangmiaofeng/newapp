// 存储信息
// 约定信息key是什么
// 存储信息的值是什么 用户信息对象 字符串json

const KEY = 'newapp-user'

export default {
  setUser (user) {
    // 存储用户信息到sessionStorage
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    // 获取用户信息从sessionStorage中取出来
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    // 清除用户信息
    window.sessionStorage.removeItem(KEY)
  }
}
