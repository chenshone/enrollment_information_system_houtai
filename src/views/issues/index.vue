<template>
  <div>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column label="日期" prop="datetime"> </el-table-column>
      <el-table-column label="姓名" prop="author"> </el-table-column>
      <el-table-column label="性别" prop="sex" width="50"> </el-table-column>
      <el-table-column label="地区" prop="addr"> </el-table-column>
      <el-table-column label="联系方式" prop="tel"> </el-table-column>
      <el-table-column label="分数" prop="score" width="50"> </el-table-column>
      <el-table-column label="内容" prop="content"> </el-table-column>
      <el-table-column label="回复内容" prop="reply.content"> </el-table-column>
      <el-table-column label="回复人" prop="reply.author"> </el-table-column>
      <el-table-column label="回复时间" prop="reply.datetime">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleReply(scope.$index, scope.row)"
            >Reply</el-button
          >
          <el-popover placement="top-start" trigger="hover">
            <div>
              <el-button
                size="mini"
                type="primary"
                @click="handleDeleteContent(scope.$index, scope.row)"
                >删除提问</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="handleDeleteReply(scope.$index, scope.row)"
                >删除回复</el-button
              >
            </div>
            <el-button size="mini" type="danger" slot="reference"
              >Delete</el-button
            >
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
      :total="totalComments"
    >
    </el-pagination>
  </div>
</template>

<script>
import dayjs from "dayjs";

import {
  getCommentsById,
  upReply,
  updateReply,
  delReply,
  delContent,
} from "@/api/issues";

export default {
  name: "Issues",
  data() {
    return {
      totalComments: 0,
      currentPage: 0,
      tableData: [],
    };
  },
  methods: {
    handleReply(index, row) {
      console.log(index, row);
      this.$prompt("请输入内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          const isUp = !row.reply;
          console.log("isUp", isUp);
          const reply = isUp
            ? {
                cid: row.id,
                uid: this.$store.getters.id,
                content: value,
              }
            : {
                id: row.reply.id,
                content: value,
                uid: this.$store.getters.id,
              };

          this.handleUpOrUpdateReply(reply, isUp).then((res) => {
            console.log("res;;;;;;;", res);
            const replyObj = {
              id: res.id,
              datetime: dayjs(res.datetime).format("YY-MM-DD HH:mm:ss"),
              cid: row.id,
              author: this.$store.getters.name,
              content: reply.content,
            };
            this.$set(row, "reply", replyObj);
            this.$message({
              type: "success",
              message: "回复成功",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    handleDeleteContent: async function (index, row) {
      console.log(index, row);
      const res = await delContent({ cid: row.id });
      console.log("res: " + res);
      if (res.code == 200) {
        this.tableData.splice(index, 1);
        this.$message({ type: "success", message: "删除成功" });
      } else {
        this.$message.error(res.msg);
      }
    },
    handleDeleteReply: async function (index, row) {
      if (!!row.reply) {
        const res = await delReply({ rid: row.reply.id, cid: row.id });
        if (res.code == 200) {
          this.$set(row, "reply", null);
          this.$message({ type: "success", message: "删除成功" });
        } else {
          this.$message.error(res.msg);
        }
      } else {
        this.$message({ type: "success", message: "删除成功" });
      }
    },
    handleCurrentChange: async function (page) {
      const { data } = await getCommentsById(page);
      this.totalComments = data.sum;

      this.tableData = data.comments.map((element) => {
        element.datetime = dayjs(element.datetime).format("YY-MM-DD HH:mm:ss");
        if (element.reply) {
          element.reply.datetime = dayjs(element.reply.datetime).format(
            "YY-MM-DD HH:mm:ss"
          );
        }
        console.log(element.datetime);
        return element;
      });
    },

    handleUpOrUpdateReply: async function (reply, isUp) {
      let res = null;
      if (isUp) {
        res = await upReply(reply);
      } else {
        res = await updateReply(reply);
      }
      return res.data;
    },
  },
  mounted: async function () {
    await this.handleCurrentChange(1);
  },
};
</script>

<style lang="scss" scoped></style>
