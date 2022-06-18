<template>
  <div class="components-container">
    <aside>请编写相关内容并发布你的文章</aside>
    <el-row type="flex" justify="space-around">
      <el-col :span="6"
        ><el-cascader
          :disabled="isOld"
          v-model="topics"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
        ></el-cascader
      ></el-col>
      <el-col :span="10"
        ><el-input
          v-model="title"
          placeholder="请输入标题"
          size="medium"
        ></el-input
      ></el-col>
      <el-col :span="4"
        ><el-button type="primary" @click="handleUpArticle"
          ><i class="el-icon-upload el-icon--right">upload</i></el-button
        ></el-col
      >
    </el-row>

    <div>
      <tinymce ref="editor" v-model="content" :height="300" />
    </div>
    <!-- <div class="editor-content" v-html="content" /> -->
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";

import { upArticle, getArticleById, updateArticle } from "@/api/article";

export default {
  name: "TinymceDemo",
  components: { Tinymce },
  data() {
    return {
      id: "",
      content: "",
      isOld: false,
      topics: ["走进紫大", "学校简介"],
      title: "",
      options: [
        {
          value: "走进紫大",
          label: "走进紫大",
          children: [
            {
              value: "学校简介",
              label: "学校简介",
            },
            {
              value: "校园风光",
              label: "校园风光",
            },
          ],
        },
        {
          value: "院系专业",
          label: "院系专业",
          children: [
            {
              value: "智能制造学院",
              label: "智能制造学院",
            },
            {
              value: "电子工程与光电技术学院",
              label: "电子工程与光电技术学院",
            },
            {
              value: "计算机学院",
              label: "计算机学院",
            },
            {
              value: "商学院",
              label: "商学院",
            },
            {
              value: "人文与社会科学学院",
              label: "人文与社会科学学院",
            },
          ],
        },
        {
          value: "招生指南",
          label: "招生指南",
          children: [
            {
              value: "招生简章",
              label: "招生简章",
            },
            {
              value: "招生计划",
              label: "招生计划",
            },
            {
              value: "往年分数线",
              label: "往年分数线",
            },
            {
              value: "志愿填报指南",
              label: "志愿填报指南",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleUpArticle: async function () {
      if (this.title == "") {
        this.$message.warning("标题不能为空！");
      }
      if (this.content == "") {
        this.$message.warning("内容不能为空！");
      }
      if (this.content != "" && this.title != "") {
        if (this.isOld) {
          const res = await updateArticle({
            id: this.id,
            author: this.$store.getters.id,
            title: this.title,
            content: this.content,
          });

          console.log(res);
          if (res.code == 200) {
            this.$message.success("修改成功！");
            this.title = "";
          } else {
            this.$message.error(res.msg);
          }
        } else {
          const res = await upArticle({
            author: this.$store.getters.id,
            title: this.title,
            content: this.content,
            topics: this.topics,
          });
          console.log(res);
          if (res.code == 200) {
            this.$message.success("发布成功！");
            this.title = "";
          } else {
            this.$message.error(res.msg);
          }
        }
      }
    },
  },
  mounted: async function () {
    if (this.$route.query.id) {
      console.log("mounted: " + this.$route.query.id);
      const { data } = await getArticleById(this.$route.query.id);
      console.log("res:::", data);
      this.id = this.$route.query.id;
      this.title = data.article.title;
      this.content = data.article.content;
      this.isOld = true;
    }
  },
};
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>
