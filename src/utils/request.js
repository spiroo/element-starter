import axios from 'axios';
import qs from 'qs';
import store from '@/store';

// 创建axios 实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000 // 请求超时时间
});

const CancelToken = axios.CancelToken;
const requestMap = new Map();

// request 拦截器
service.interceptors.request.use(
  config => {
    // 这里可以自定义一些config 配置
    // 防重复提交
    const keyString = qs.stringify(
      Object.assign({}, { url: config.url, method: config.method }, config.data)
    );
    if (requestMap.get(keyString)) {
      // 取消当前请求
      config.cancelToken = new CancelToken(cancel => {
        cancel('Please slow down a little');
      });
    }
    requestMap.set(keyString, true);
    Object.assign(config, { _keyString: keyString });

    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }

    // loading + 1
    store.dispatch('setLoading', true);

    return config;
  },
  error => {
    //  这里处理一些请求出错的情况

    // loading 清 0
    setTimeout(function() {
      store.dispatch('setLoading', 0);
    }, 300);

    console.log(error);
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 这里处理一些response 正常放回时的逻辑
    // 重置requestMap
    requestMap.set(response.config._keyString, false);

    // loading - 1
    store.dispatch('setLoading', false);

    return res;
  },
  error => {
    // 这里处理一些response 出错时的逻辑

    // loading - 1
    store.dispatch('setLoading', false);

    return Promise.reject(error);
  }
);

/**
 * @description
 * 请求
 * @param url
 * @param data
 * @param method
 */
const request = ({ url, data = {}, method = 'get' }) => {
  return service({
    method,
    url,
    data,
    params: method.toUpperCase() === 'GET' && data
  });
};

export default request;
