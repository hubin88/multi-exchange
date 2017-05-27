/**
 * Created by yjzhme on 2017/2/15.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './messageItem.scss';

require('../../images/xtgg.png');
require('../../images/cltx.png');
require('../../images/cptx.png');
require('../../images/hqyj.png');
require('../../images/yhhd.png');

class MessageItem extends Component {
  static propTypes = {
    message: PropTypes.object,
    gotoMsgDetails: PropTypes.func,
  }

  msgTypePic = {
    系统公告: './images/xtgg.png',
    策略提醒: './images/cltx.png',
    操盘提醒: './images/cptx.png',
    行情预警: './images/hqyj.png',
    优惠活动: './images/yhhd.png',
  }

  render() {
    return (
      <div styleName="messageItem" onClick={this.props.gotoMsgDetails}>
        <div styleName="msg-title">
          <img
            styleName="msgType-pic" src={this.msgTypePic[this.props.message.msgType]} alt=""
          />
          <span styleName="msgType">{this.props.message.msgType}</span>
          { this.props.message.msgState === '1' ? null : <i styleName="noRead" /> }
          <span styleName="msgTime">{this.props.message.msgTime}</span>
        </div>
        <div styleName="msg-title-warp">
          <div styleName="msg-title">
            {this.props.message.msgTitle}
          </div>
        </div>
      </div>
    );
  }
}

export default cssModules(MessageItem, styles, { allowMultiple: true, errorWhenNotFound: false });
