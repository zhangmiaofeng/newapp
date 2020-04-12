<template>
<div class='container'>
    <el-card>
        <div slot="header">
            <my-bread>{{articleId ? '修改文章' : '发布文章'}}</my-bread>
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
                <el-radio-group v-model="articleForm.cover.type" @change="changeType">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
                <!-- 素材上传组件 -->
                <!-- <my-image v-model="articleForm.cover.images[0]"></my-image> -->
                <div v-if="articleForm.cover.type === 1">
                  <my-image v-model="articleForm.cover.images[0]"></my-image>
                </div>
                <div v-if="articleForm.cover.type === 3">
                  <my-image v-model="articleForm.cover.images[0]"></my-image>
                  <my-image v-model="articleForm.cover.images[1]"></my-image>
                  <my-image v-model="articleForm.cover.images[2]"></my-image>
                </div>
            </el-form-item>
            <el-form-item label="频道:">
              <my-channel v-model="articleForm.channel_id"></my-channel>
            </el-form-item>
            <el-form-item v-if="!articleId">
                <el-button type="primary" size="small" @click="submit(false)">发表</el-button>
                <el-button size="small" @click="submit(true)">存入草稿</el-button>
            </el-form-item>
            <el-form-item v-else>
                <el-button type="success" size="small" @click="update(false)">修改</el-button>
                <el-button size="small" @click="update(true)">存入草稿</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>
</template>

<script>
// import MyBread from '@/components/my-bread'
// import MyChannel from '@/components/my-channel'
// import MyImage from '@/components/my-image'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  // components: { MyBread, MyChannel, quillEditor, MyImage },
  components: { quillEditor },
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
      },
      // 文章id
      articleId: null
    }
  },
  // 监听事件
  watch: {
    $route () {
      // 如果没有文章id  恢复默认数据
      if (!this.$route.query.id) {
        this.articleId = null
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            imgages: []
          },
          channel_id: null
        }
      }
    }
  },
  created () {
    // 获取地址栏传参
    this.articleId = this.$route.query.id
    // 判断
    if (this.articleId) {
      this.getArticle()
    }
  },
  methods: {
    // 获取文章数据
    async getArticle () {
      const { data: { data } } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
    changeType () {
      // 重置图片数据
      this.articleForm.cover.images = []
    },
    // 存入草稿
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '文章存入草稿成功' : '文章发表成功')
      // 路由跳转到内容管理
      this.$router.push('/article')
    },
    // 修改文章
    async update (draft) {
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '修改存入草稿成功' : '文章修改成功')
      // 路由跳转到内容管理
      this.$router.push('/article')
    }
  }
}
</script>

<style lang='less' scoped></style>
