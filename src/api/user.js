import request from '@/utils/request';

export default {
  // 登录
  login(data) {
    return request({
      url: '/login',
      method: 'post',
      data
    });
  },
  // 获取用户信息
  getUserInfo() {
    return request({
      url: '/userinfo',
      method: 'get'
    });
  },
  // 获取用户列表
  fetchUserList(params) {
    const query = {
      cmd: 'entrance',
      cmd_op: 'userList',
      ...params
    };
    return request({
      url: '/service/cloud/httpCommandService',
      method: 'get',
      data: query
    });
  }
};
