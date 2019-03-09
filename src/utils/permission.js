import router from '@/router';
import store from '@/store';
import { getToken } from './auth';
import NProgress from 'nprogress'; // 进度条
import 'nprogress/nprogress.css'; // 进度条样式
import { Message } from 'element-ui';

const whiteList = ['/login', '/', '/about', '/user']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: '/'
      });
      NProgress.done();
    } else {
      if (store.getters.name === '') {
        // 实时拉取用户的信息
        store
          .dispatch('getUserInfo')
          .then(() => {
            next();
          })
          .catch(err => {
            store.dispatch('fedLogOut').then(() => {
              Message.error('拉取用户信息失败，请重新登录！' + err);
              next({
                path: '/'
              });
            });
          });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next('/login');
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
