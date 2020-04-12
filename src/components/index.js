// 封装一个插件
// 注册所有的components下的组件为全局
import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
import MyImage from '@/components/my-image'

// vue插件 暴露一个对象 对象中有一个选项 install 安装的意思

export default {
  install (Vue) {
    // 安装函数
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyImage.name, MyImage)
  }
}
