/**
 * Created by wenxinfu on 2017/2/15.
 */
// 交易所配置
var goodsList = [
  { name: '海思', url: 'haisi' },
  { name: '天津', url: 'tianjin' },
];


var BASE_SERVER = {
  // app请求地址
  AppUrl: 'http://120.76.246.190:9004',
  // 分享App注册页面地址
  registerUrl: 'http://10.10.10.70:9200/register.html',
};

// 操盘记录，盈利达百分之多少就显示晒单按钮
var SHOW_PER = 0.15 * 100;

// 请求信息条数
var MsgCount = 20;

// app使用晒单分享时的H5地址
function getShareAddress() {
  return SHAREURL;
}
// app分享金币H5地址
function getShareGold() {
  return SHARECOLD
}

// 晒单分享暴露接口地址,在晒单里面选中会设置这个地址
var SHAREURL= '';

// 晒单分享金币暴露接口地址,在晒单里面选中会设置这个地址
var SHAREGOLD = '';

var APP_COMMAND = {
  http: 'http://',
  https: 'https://',
  file: 'file://',
  view: 'view://',
  app: 'app://',
  msg: 'msg://',
};


// 原生调用js方法名
var executeNative = 'executeNative';

// 问题反馈
var FEEDBAK_INFO = BASE_SERVER.AppUrl + '/more_trad/opin_fk';

// 操盘记录
var OPERATE_RECORD = '/weipan/getTradeHoldHisPage';

// 操盘记录金币查询(定制)
var OPERATE_RECORD_GOLD = '/weipan/ticketHoldHis';

// 商品信息
var PRODUCT_DATA = '/weipan/getMerchsAndServers';

  // 消息列表
var QUERY_MSGINFO = BASE_SERVER.AppUrl + '/more_trad/query_msginfo';

  // 单条消息预览
var ONEMSG_VIEW = BASE_SERVER.AppUrl + '/more_trad/onemsg_view';

  // 热门活动
var HOT_ACTIVITY = BASE_SERVER.AppUrl + '/more_trad/query_hotActivity';

  // 帐号金币
var ACCOUNT_GOLD = '/weipan/userTicketInfoPage';

  // 查询未读消息
var UN_READ_MESSAGE = BASE_SERVER.AppUrl + '/more_trad/query_notreadmsg';

  //会员机构id
var DEPTCODE='001';