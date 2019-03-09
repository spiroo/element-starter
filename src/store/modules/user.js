import { getToken, setToken, removeToken } from '@/utils/auth';
import api from '@/api/user';

const user = {
  state: {
    token: getToken(),
    name: '',
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
    SET_USER_LIST: (state, payload) => {
      state.userList = payload.items;
      state.userTotal = payload.totalItems;
    }
  },

  actions: {
    // 登录
    async login({ commit }, userInfo) {
      try {
        const response = await api.login(userInfo);
        if (response === 200) {
          setToken(res.data);
          commit('SET_TOKEN', res.data);
        }
        return Promise.resolve(response);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    // 获取用户信息
    async getUserInfo({ commit }) {
      try {
        const response = await api.getUserInfo();
        if (response.code === 200) {
          commit('SET_NAME', response.data.name);
        }
        return Promise.resolve(response);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    // 前端 登出
    fedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    },
  
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
