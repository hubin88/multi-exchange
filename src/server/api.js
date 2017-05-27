/**
 * Created by dell on 2017/2/15.
 */

import postJSON from './helper';
import postAjax from './help';
import * as InterFace from './inter-face-type';

export default class Api {
  // 问题反馈
  static feedBackInfo(obj) {
    return postJSON(FEEDBAK_INFO, obj);
  }

  // 操盘记录
  static getOperateRecord(obj, url) {
    return postJSON(url + OPERATE_RECORD, obj);
  }
  // 操盘记录金币查询(定制版)
  static getOperateRecordGold(obj, url) {
    return postJSON(url + OPERATE_RECORD_GOLD, obj);
  }

  // 商品信息
  static getProductData(obj, url) {
    return postJSON(url + PRODUCT_DATA, obj);
  }

  // 消息列表
  static queryMsgInfo(obj = {}) {
    return postAjax({
      pre: InterFace.MORE_TRADE,
      pos: InterFace.QUERY_MSGINFO,
      data: obj,
      name: Api.queryMsgInfo.name,
    });
  }

  //
  static oneMsgView(obj = {}) {
    return postAjax({
      pre: InterFace.MORE_TRADE,
      pos: InterFace.ONEMSG_VIEW,
      data: obj,
      name: Api.queryMsgInfo.name,
    });
  }

  // 热门活动
  static getHotActivity(obj = {}) {
    return postAjax({
      pre: InterFace.MORE_TRADE,
      pos: InterFace.HOT_ACTIVITY,
      data: obj,
      name: Api.getHotActivity.name,
    });
  }

  // 未读信息
  static getUnReadMsg(obj = {}) {
    return postAjax({
      pre: InterFace.MORE_TRADE,
      pos: InterFace.UN_READ_MESSAGE,
      data: obj,
      name: Api.getUnReadMsg.name,
    });
  }

  // 账户金币
  static getAccountGold(obj, url) {
    return postJSON(url + ACCOUNT_GOLD, obj);
  }

  // 查询机构信息
  static getOrg(obj = {}) {
    return postAjax({
      pre: InterFace.MORE_TRADE,
      pos: InterFace.QUERY_DEPT,
      data: obj,
      name: Api.getOrg.name,
    });
  }

  // 查询交易所
  static queryChange(obj = {}) {
    return postAjax({
      pre: InterFace.MORE_TRADE,
      pos: InterFace.QUERY_CHANGE,
      data: obj,
      name: Api.queryChange.name,
    });
  }

  // 登录
  static login(obj = {}, url) {
    return postAjax({
      pre: InterFace.WEIPAN,
      pos: InterFace.LOGIN,
      data: obj,
      name: Api.login.name,
    }, url);
  }

  // 注册
  static register(obj = {}) {
    return postAjax({
      pre: InterFace.MORE_TRADE,
      pos: InterFace.REGISTER,
      data: obj,
      name: Api.register.name,
    });
  }

  // 忘记密码
  static forgetPassword(obj = {}, url) {
    return postAjax({
      pre: InterFace.WEIPAN,
      pos: InterFace.FORGET_PASSWORD,
      data: obj,
      name: Api.forgetPassword.name,
    }, url);
  }

  // 获取注册验证码
  static getRegisterCode(obj = {}) {
    return postAjax({
      pre: InterFace.MORE_TRADE,
      pos: InterFace.GET_REGISTER_CODE,
      data: obj,
      name: Api.getRegisterCode.name,
    });
  }

  // 获取忘记密码验证码
  static getForgetCode(obj = {}, url) {
    return postAjax({
      pre: InterFace.WEIPAN,
      pos: InterFace.GET_FORGET_CODE,
      data: obj,
      name: Api.getForgetCode.name,
    }, url);
  }

  // 重设密码
  static resetPassword(obj = {}, url) {
    return postAjax({
      pre: InterFace.WEIPAN,
      pos: InterFace.RESET_PASSWORD,
      data: obj,
      name: Api.resetPassword.name,
    }, url);
  }

  // 提示信息
  static getTips(obj = {}) {
    return postAjax({
      pre: InterFace.MORE_TRADE,
      pos: InterFace.GET_TIPS,
      data: obj,
      name: Api.getTips.name,
    });
  }

  // 系统设置是否注册,版本升级
  static queryRegistInfo(obj = {}, url) {
    return postAjax({
      pre: InterFace.WEIPAN,
      pos: InterFace.QUERY_REGISTINFO,
      data: obj,
      name: Api.queryRegistInfo.name,
    }, url);
  }
}
