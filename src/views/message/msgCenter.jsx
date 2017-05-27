/**
 * Created by yjzhme on 2017/2/15.
 */

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import PullRefresh from 'reactjs-pull-refresh';
import { ParamData } from '../../ultils/tools';
import Api from '../../server/api';
import MessageItem from '../../components/message-item/messageItem';
import Tips from '../../components/tips';
import styles from './msgCenter.scss';
import '../../css/pullRefresh.css';

class MsgCenter extends Component {
  state = {
    firstId: 0,
    lastId: 0,
    messages: [],
  }

  componentWillMount() {
    const param = ParamData;
    param.count = MsgCount;
    param.lastId = 0;
    param.desc = 1;
    param.deptId = parseInt(ParamData.deptId, 10);
    this.param = param;
    this.queryMsgInfo(param);
  }

  param = {};

  refreshCallback = () => new Promise((resolve, reject) => {
    this.pullDown(resolve, reject);
  }).then(() => {
    console.info('刷新成功！');
  }, () => {
    console.info('刷新失败！');
  })

  pullUp = (resolve, reject) => {     // 上拉加载
    this.param.lastId = this.state.firstId;
    this.param.desc = 0;
    this.queryMsgInfo(this.param, resolve, reject);
  }


  loadMoreCallback = () => new Promise((resolve, reject) => {
    this.pullUp(resolve, reject);
  }).then(() => {
    console.info('加载更多成功！');
  }, () => {
    console.info('加载更多失败！');
  })

  pullDown = (resolve, reject) => {    // 下拉更新
    this.param.lastId = this.state.lastId;
    this.param.desc = 1;
    this.queryMsgInfo(this.param, resolve, reject);
  }

  queryMsgInfo = (obj, resolve, reject) => {
    Api.queryMsgInfo(obj).then(msgData => {
      if (msgData.code === 0) {
        this.updateMsgData(msgData.result, resolve);
      } else {
        console.log(msgData.message);
        if (reject && typeof reject === 'function') {
          reject();
        }
      }
    }).catch((e) => {
      console.log(e);
      if (reject && typeof reject === 'function') {
        reject();
      }
    });
  }

  updateMsgData = (messages, resolve) => {
    const result = this.param.desc === 1 ? messages.concat(this.state.messages) :
      this.state.messages.concat(messages);
    const dataLength = result.length;
    if (messages.length === 0) {
      Tips.show(this.param.desc === 1 ? '没有新消息' : '没有更多消息');
    } else {
      this.setState({
        messages: result,
        firstId: result[dataLength - 1].msgId,
        lastId: result[0].msgId,
      });
    }
    if (resolve && typeof resolve === 'function') {
      resolve();
    }
  }


  gotoMsgDetails = (msgId) => {
    window.location.href = `./msgDetails.html?deviceNum=${ParamData.deviceNum}&msgId=${msgId}`;
  }


  pullRefreshProps = {
    maxAmplitude: 80,
    debounceTime: 30,
    throttleTime: 100,
    deceleration: 0.001,
    loadMore: true,
    refreshCallback: this.refreshCallback,
    loadMoreCallback: this.loadMoreCallback,
    hasMore: true,
  }

  render() {
    return (
      <div styleName="msgCenter">
        <PullRefresh {...this.pullRefreshProps}>
          {this.state.messages.length > 0 ? this.state.messages.map((message) =>
            <MessageItem
              message={message} key={message.msgId}
              gotoMsgDetails={() => this.gotoMsgDetails(message.msgId)}
            />
          ) : <div styleName="noMsgTip">没有最新消息</div>}
        </PullRefresh>
      </div>
    );
  }
}

export default cssModules(MsgCenter, styles, { allowMultiple: true, errorWhenNotFound: false });
