<template>
  <div class>
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column
        v-loading="loading"
        align="center"
        label="ID"
        width="240"
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row._id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt20">
      <el-pagination
        :current-page="listQuery.pageNo"
        :page-sizes="[10, 15, 20, 40]"
        :total="listQuery.total"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { userApi } from "../../../api";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  mixins: [
    {
      methods: {
        handleCurrentChange(no) {
          debugger;
          this.listQuery.pageNo = no;
          this.getList();
        },
        handleSizeChange(res) {
          debugger;
          this.listQuery.pageSize = res;
          this.getList();
        }
      }
    }
  ],
  props: {
    type: {
      type: String,
      default: "CN"
    }
  },
  data() {
    return {
      list: [],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        type: this.type,
        sort: "+id",
        keyword: ""
      },
      loading: false
    };
  },
  created() {
    this.getList();
  },

  methods: {
    getList() {
      this.loading = true;
      this.$emit("create"); // for test
      this.$http
        .post(userApi.query, {
          pageNo: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize,
          keyword: this.listQuery.keyword
        })
        .then(({ list, total }) => {
          this.list = list;
          this.listQuery.total = total;
          this.loading = false;
        });
    }
  }
};
</script>

