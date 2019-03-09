const getters = {
  requestLoading: state => state.app.requestLoading,
  size: state => state.app.size,
  token: state => state.user.token,
  name: state => state.user.name,
  userList: state => state.user.userList,
  userTotal: state => state.user.userTotal
};
export default getters;
