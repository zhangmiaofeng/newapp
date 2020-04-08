<template>
<div class='container'>
    <el-card>
     <div slot="header">
        <my-bread>素材管理</my-bread>
     </div>
     <div class="btn_box">
         <el-radio-group v-model="reqParamse.collect">
            <el-radio-button :label="true" size="small">全部</el-radio-button>
            <el-radio-button :label="false" size="small">收藏</el-radio-button>
        </el-radio-group>
         <el-button type="success">添加素材</el-button>
     </div>
     <!-- 图片素材展示 -->
     <div class="img_list">
         <div class="img_item" v-for="item in 10" :key="item">
             <img src="../../assets/images/avatar.jpg" alt="">
             <div class="foot">
                 <span class="el-icon-star-off selected"></span>
                 <span class="el-icon-delete"></span>
             </div>
         </div>
     </div>
     <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
          </el-pagination>
    </el-card>
</div>
</template>

<script>
import MyBread from '@/components/my-bread'
export default {
  components: { MyBread },
  data () {
    return {
      reqParamse: {
        collect: false,
        page: 1,
        per_page: 10
      }
    }
  }
}
</script>

<style lang='less' scoped>
.el-button {
    float: right;
}
.img_list {
    margin-top: 50px;
    .img_item {
        width: 160px;
        height: 160px;
        border: 1px solid #ddd;
        position: relative;
        display: inline-block;
        margin-right: 50px;
        margin-bottom: 20px;
         img {
        width: 100%;
        height: 100%;
        display: block;
    }
    .foot {
        position: absolute;
        width: 100%;
        height: 20%;
        line-height: 30px;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        text-align: center;
        span {
            margin: 0 20px;
            &.selected {
                color: red
            }
        }
    }
}
}
</style>
