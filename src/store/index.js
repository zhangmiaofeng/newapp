// 存储信息
// 约定信息key是什么
// 存储信息的值是什么 用户信息对象 字符串json

const KEY = 'newapp-user'

export default {
  setUser (user) {
    // 存储用户信息到sessionStorage
    // 现在实现：给什么存储什么 完整替换
    // 预期实现：局部替换
    const localUser = this.getUser()
    // 如果是登录时候使用  {} 空对象  {id,name,photo,token,refresh_token} 完整信息
    // 把你想存入的信息 合并覆盖到  当前user对象即可
    const nowUser = { ...localUser, ...user }
    window.sessionStorage.setItem(KEY, JSON.stringify(nowUser))
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
