<template>
  <div class="user">
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="userRealName" label="姓名" width="180"></el-table-column>
      <el-table-column prop="userMobile" label="电话"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>
            <el-badge is-dot class="item" :type="status(scope.row.userSourceName)"></el-badge>
            {{ scope.row.userSourceName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="typeName" label="类型"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import paginationMixin from '@/mixins/paginationMixin.js';

export default {
  name: 'users',
  mixins: [paginationMixin],
  created() {
    this.getList();
  },
  computed: {
    ...mapGetters(['userList', 'userTotal']),
    status() {
      return function(str) {
        return str === '未激活' ? null : 'success';
      }
    }
  },
  methods: {
    getList() {
      this.$store.dispatch('getUserList', {
        pageSize: this.pageParams.pageSize,
        pageCount: this.pageParams.page,
        userType: 0
      }).then(res => {
        console.log('res == ', res);
      });
    }
  }
};
</script>

<style lang="scss">
.user {
  padding: 30px;

  .el-badge {
    margin-top: 5px;
  }
}
</style>
