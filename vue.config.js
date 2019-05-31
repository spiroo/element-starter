const path = require('path');

function resolve(dir) {
  return path.join(__dirname, './', dir);
}

module.exports = {
  baseUrl: '/',
  chainWebpack: config => {
    // svg loader
    const svgRule = config.module.rule('svg'); // 找到svg-loader
    svgRule.uses.clear(); // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/); // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      });

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images');
    imagesRule.exclude.add(resolve('src/icons'));
    config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    open: true,
    port: 9523,
    proxy: {
      '/server': {
        target: 'http://jsonplaceholder.typicode.com', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/server': ''
        }
      }
    }
  }
};
