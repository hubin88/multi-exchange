var ip = require('ip');

const config = {
  server: {
    host: ip.address(), // IP 地址
    port: 9200, // 端口号
  },
  copyFile: [
    { from: './src/single_part', to: './' },
    { from: './config.js', to: './config.js' },
  ],
  html: [
    // { name: 'feedBack', title: '意见反馈', entry: './src/single-page/feedBack' },
    // { name: 'hotActivity', title: '热点', entry: './src/single-page/hotspot' },
    // { name: 'operateRecord', title: '操盘记录', entry: './src/single-page/operate-record' },
    // { name: 'orderShare', title: '晒单已分享', entry: './src/single-page/order-share' },
    // { name: 'orderUnShare', title: '晒单未分享', entry: './src/single-page/order-unshare' },
    // { name: 'toActivity', title: '分享活动', entry: './src/single-page/to-activity' },
    // { name: 'toShare', title: '好友分享', entry: './src/single-page/to-share' },
    // { name: 'changepwd', title: '修改密码', entry: './src/single-page/changepwd' },
    { name: 'register', title: '注册', entry: './src/single-page/register' },
    // { name: 'resetpwd', title: '忘记密码', entry: './src/single-page/feedBack' },
    // { name: 'msgCenter', title: '消息中心', entry: './src/single-page/msgCenter' },
    // { name: 'msgDetails', title: '消息详情', entry: './src/single-page/msgDetails' },
    // { name: 'agreement', title: '用户协议', entry: './src/single-page/agreement' },
    // { name: 'accountGold', title: '账户金币', entry: './src/single-page/account-gold' },
    // { name: 'scrollPage', title: '首页滚动', entry: './src/single-page/scroll-page' },
  ],

};

module.exports = config;
