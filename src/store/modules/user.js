import { getToken, setToken, removeToken } from '@/utils/auth';
import api from '@/api/user';

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    userList: [],
    userTotal: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_USER_LIST: (state, payload) => {
      state.userList = payload.items;
      state.userTotal = payload.totalItems;
    }
  },

  actions: {
    // 登录
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        api
          .login(userInfo)
          .then(res => {
            if (res.code === 200) {
              setToken(res.data);
              commit('SET_TOKEN', res.data);
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    // 获取用户信息
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .getUserInfo()
          .then(res => {
            console.log(res);
            if (res.code === 200) {
              commit('SET_NAME', res.data.name);
              commit('SET_AVATAR', res.data.avatar);
              commit('SET_ROLES', res.data.role);
            }
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //
    // // 登出
    // LogOut ({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', [])
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 前端 登出
    fedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    },
    // 获取用户列表
    // getUserList({ commit }, payload) {
    //   return new Promise((resolve, reject) => {
    //     api
    //       .fetchUserList(payload)
    //       .then(res => {
    //         console.log(res);
    //         if (res.code === 0) {
    //           commit('SET_USER_LIST', res.result);
    //         }
    //         resolve();
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // }
    async getUserList({ commit }, payload) {
      try {
        const response = await api.fetchUserList(payload);
        console.log('response = ', response);
        if (response.code === 0) {
          commit('SET_USER_LIST', response.result);
        }
        return Promise.resolve(response.result);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
};

export default user;
