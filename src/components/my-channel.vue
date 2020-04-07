<template>
  <el-select clearable :value="value" placeholder="请选择" @change="fn">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    // 获取频道下拉选项数据
    this.getChannelOptions()
  },
  methods: {
    // 获取频道下拉列表数据
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      // console.log(data)
      this.channelOptions = data.channels
    },
    fn (val) {
      if (val === '') val = null
      //  数据交给父组件使用
      this.$emit('input', val)
    }
  }
//   // 计算属性: 新数据依赖data里面的数据
//   // 监听：监听某一个属性的变化，做一些异步操作开销较大的操作
//   watch: {
//     // 清空频道
//     'reqParamse.channel_id': function (newValue, oldValue) {
//       if (newValue) {
//         this.reqParamse.channel_id = null
//       }
//     }
//   }
}
</script>

<style lang='less' scoped></style>
