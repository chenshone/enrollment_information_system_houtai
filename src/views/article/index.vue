<template>
  <div>
    <el-cascader
      v-model="topics"
      :options="options"
      :props="{ expandTrigger: 'hover' }"
    ></el-cascader>
    <el-button @click="handleCascaderChange(currentPage)">Search</el-button>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column label="日期" prop="datetime"> </el-table-column>
      <el-table-column label="作者" prop="author"> </el-table-column>
      <el-table-column label="标题" prop="title"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleReply(scope.$index, scope.row)"
            :disabled="scope.row.isExcel"
            >Update</el-button
          >
          <el-button
            type="danger"
            @click="handleDelete(scope.$index, scope.row.id)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
      :total="totalArticles"
    >
    </el-pagination>
  </div>
</template>

<script>
import dayjs from "dayjs";

import { getArticleByPageAndTopic, deleteArticle } from "@/api/article";

export default {
  name: "Issues",
  data() {
    return {
      totalArticles: 0,
      currentPage: 0,
      tableData: [],
      topics: ["走进紫大", "学校简介"],
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
    handleReply(index, row) {
      console.log(index, row);
      this.$router.push("/writing/index?id=" + row.id);
    },
    handleDelete: async function (index, id) {
      const res = await deleteArticle(id);
      if (res.code == 200) {
        this.tableData.splice(index, 1);
        this.$message({ type: "success", message: "删除成功" });
      } else {
        this.$message.error(res.msg);
      }
    },
    handleCurrentChange: async function (page) {
      const { data } = await getArticleByPageAndTopic({
        page,
        topics: this.topics,
      });
      this.totalArticles = data.sum;

      this.tableData = data.articles.map((element) => {
        element.datetime = dayjs(element.datetime).format("YY-MM-DD HH:mm:ss");
        console.log(element.datetime);
        return element;
      });
    },
    handleCascaderChange: async function (page) {
      await this.handleCurrentChange(page);
    },
  },
  mounted: async function () {
    await this.handleCurrentChange(1);
  },
};
</script>

<style lang="scss" scoped></style>
