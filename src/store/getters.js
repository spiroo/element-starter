const getters = {
  requestLoading: state => state.app.requestLoading,
  size: state => state.app.size,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  userList: state => state.user.userList,
  userTotal: state => state.user.userTotal
};
export default getters;
