<template>
<div class='container'>
    <el-card>
        <div slot="header">
            <my-bread>发布文章</my-bread>
        </div>
        <!-- 表单 -->
        <el-form label-width="100px">
            <el-form-item label="标题:">
                <el-input v-model="articleForm.title" placeholder="标题" style="width:400px"></el-input>
            </el-form-item>
            <el-form-item label="内容:">
                <!-- 富文本 -->
                <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
            </el-form-item>
            <el-form-item label="封面:">
                <el-radio-group v-model="articleForm.cover.type">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="2">二图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
                <div class="imgBtn">
                    <img src="../../assets/images/default.png" alt="">
                    <!-- 上传组件 -->
                </div>
            </el-form-item>
            <el-form-item label="频道:">
              <my-channel v-model="articleForm.channel_id"></my-channel>
            </el-form-item>
            <el-form-item>
                <el-button type="success" size="small">发表</el-button>
                <el-button type="info" size="small">存入草稿</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>
</template>

<script>
import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: { MyBread, MyChannel, quillEditor },
  data () {
    return {
      articleForm: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      // 富文本配置
      editorOption: {
        placeholder: '请输入内容',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  }

}
</script>

<style lang='less' scoped>
.imgBtn {
    width: 160px;
    height: 160px;
    border: 1px solid #dddd;
    img {
        display: block;
        width: 100%;
        height: 100%;
    }
}
</style>
