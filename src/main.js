import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/plugins/ant-design-vue';
import '@/styles/index.scss';
import '@/icons';

import common from '@/utils/common'; // 全局方法
import filters from '@/utils/filters'; // 全局过滤器
import '@/utils/permission';
// 注册过滤器
for (let key in filters) {
  Vue.filter(key, filters[key]);
}

Vue.use(common);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
