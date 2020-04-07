<template>
  <div class="container">article</div>
</template>

<script>
export default {
  // 在创建实例之后发请求 获取数据
  created () {
    this.$http.get('http://ttapi.research.itcast.cn/mp/v1_0/articles')
      .then((res) => {
        console.log(res)
      })
  }
}
</script>

<style lang='stylus' scoped></style>
