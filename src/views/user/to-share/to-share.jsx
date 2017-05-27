/**
 * Created by wenxinfu on 2017/2/14.
 */

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './to-share.scss';
import './to-share.css';

class ToShare extends Component {

  getDocument = (id) => document.getElementById(id);

  shareNotice = () => {
    this.getDocument('shareNotice').style.display = 'block';
  }
  hideShareNotice = () => {
    this.getDocument('shareNotice').style.display = 'none';
  }
  activityInfo = () => {
    this.getDocument('activityInfo').style.display = 'block';
  }
  hideActivityInfo = () => {
    this.getDocument('activityInfo').style.display = 'none';
  }

  render() {
    return (
      <div styleName="to-share">
        <div className="share-box">
          <div className="share_box">
            <div className="share_blo">
              <img src={require('../../../images/share_img1.jpg')} role="presentation" />
            </div>
            <div className="share_but">
              <div className="msfx_but">
                <a onClick={this.shareNotice}><img
                  src={require('../../../images/share_but1.png')} role="presentation"
                /></a>
              </div>
              <div className="hdgz_but">
                <a onClick={this.activityInfo}><img
                  src={require('../../../images/share_but2.png')} role="presentation"
                /></a>
              </div>
            </div>
          </div>

          <div id="activityInfo" style={{ display: 'none' }}>
            <div className="fee_alpha" />
            <div className="pop_box">
              <div className="pop_tit relative">
                <div className="hdgz">活动规则</div>
                <div className="close">
                  <a onClick={this.hideActivityInfo}><img
                    src={require('../../../images/close.png')} role="presentation"
                  /></a>
                </div>
              </div>
              <div className="rule_cont">
                <p>
                  <span>① 成功邀请好友，可得金币奖励；<br />
                好友数量+1，则金币奖励
                <span
                  className="sharegetcoin"
                />，数量上限为
                <span className="coinlimit" />。
							</span><br /> (好友完成手机验证即视为邀请成功)。
                </p>
                <p>
                  <span>②</span> 好友首次进入海丝微订货系统，可得
                  <span className="registersendcoin" style={{ color: '#333' }} />枚金币+资金建仓首单保障。
                </p>
                <p>
                  <img src={require('../../../images/share_img3.png')} role="presentation" />
                </p>
              </div>
            </div>
          </div>

          <div id="shareNotice" onClick={this.hideShareNotice} style={{ display: 'none' }}>
            <div className="fee_alpha1" />
            <div className="yindao_box">
              <img src={require('../../../images/xiangdao.png')} role="presentation" />
            </div>
          </div>
        </div>
        <div className="stopshare-box" style={{ display: 'none' }}>
          <div className="img-wrap"><img
            src={require('../../../images/tips.png')}
            role="presentation"
          /></div>
          <div className="import-tip"><h3>未注册，无法分享链接</h3></div>
          <div className="import-tip">请进入交易界面完成注册流程，立即开启分享活动</div>
        </div>
      </div>
    );
  }
}

export default cssModules(ToShare, styles, { allowMultiple: true, errorWhenNotFound: false });
