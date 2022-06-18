<template>
  <div class="app-container">
    <aside>请编写相关内容并发布</aside>
    <el-row type="flex" justify="space-around">
      <el-col :span="6"
        ><el-cascader
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
    <upload-excel-component
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    />
    <el-table
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        v-for="item of tableHeader"
        :key="item"
        :prop="item"
        :label="item"
      />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from "@/components/UploadExcel/index.vue";

import { upArticle } from "@/api/article";

export default {
  name: "UploadExcel",
  components: { UploadExcelComponent },
  data() {
    return {
      id: "",
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
      tableData: [],
      tableHeader: [],
    };
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      }

      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning",
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
    },

    handleUpArticle: async function () {
      if (this.title == "") {
        this.$message.warning("标题不能为空！");
      }
      if (this.content == "") {
        this.$message.warning("内容不能为空！");
      }
      if (this.content != "" && this.title != "") {
        const res = await upArticle({
          author: this.$store.getters.id,
          title: this.title,
          form: this.tableData,
          topics: this.topics,
          isExcel: true,
        });
        console.log(res);
        if (res.code == 200) {
          this.$message.success("发布成功！");
          this.title = "";
        } else {
          this.$message.error(res.msg);
        }
      }
    },
  },
};
</script>
