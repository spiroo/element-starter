<template>
  <div class="user">
    
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
