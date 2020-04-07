<template>
<div class='container'>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
          <!-- 使用默认插槽 -->
          <slot></slot>
      </el-breadcrumb-item>
    </el-breadcrumb>
</div>
</template>

<script>
export default {
  name: 'MyBread'
}
</script>

<style lang='less' scoped></style>
