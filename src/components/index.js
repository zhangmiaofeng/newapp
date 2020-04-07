// 封装一个插件
// 注册所有的components下的组件为全局
import MyBread from '@/components/my-bread'

// vue插件 暴露一个对象 对象中有一个选项 install 安装的意思

export default {
  install (Vue) {
    // 安装函数
    Vue.component(MyBread.name, MyBread)
  }
}