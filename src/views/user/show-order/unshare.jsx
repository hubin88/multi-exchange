/**
 * Created by wenxinfu on 2017/2/13.
 */

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './unshare.scss';
import './unshare.css';
import { getUrlParamObj } from '../../../ultils/helper';

class UnShare extends Component {
  state = { paramObj: this.paramObj };

  componentWillMount() {
    this.paramObj = getUrlParamObj();
  }
  paramObj = {};

  showShare = () => {
    document.getElementById('share').style.display = 'block';
  }
  closeShare = () => {
    document.getElementById('share').style.display = 'none';
  }
  hideShareNotice = () => {
    document.getElementById('shareNotice').style.display = 'none';
  }
  shareNotice = () => {
    document.getElementById('shareNotice').style.display = 'block';
  }


  render() {
    return (
      <div styleName="share">
        <div className="box">
          <div className="principal">
            <img src={require('../../../images/principal1.png')} role="presentation" />
            <div className="top">
              <h1>{this.paramObj.Used}元本金入账{this.paramObj.Earn}元</h1>
              <ul className="clearfix one">
                <li className="left one">
                  <p>购买品种</p>
                </li>
                <li className="left">
                  <p>买入点位</p>
                </li>
                <li className="left">
                  <p>卖出点位</p>
                </li>
                <li className="left two">
                  <p>方向</p>
                </li>
                <li className="left">
                  <p>本金</p>
                </li>
                <li className="left last">
                  <p>盈亏(元)</p>
                </li>
              </ul>

              <ul className="clearfix two">
                <li className="left one">
                  <p>{this.paramObj.ProductName || ''}{this.paramObj.text || ''}</p>
                </li>
                <li className="left">
                  <p>{this.paramObj.OpenPrice || ''}</p>
                </li>
                <li className="left">
                  <p className="brown">{this.paramObj.ClosePrice || ''}</p>
                </li>
                <li className="left two">
                  <p>{this.paramObj.Direction === 'B' ? '多' : '少'}</p>
                </li>
                <li className="left" style={{ position: 'relative' }}>
                  <p>{this.paramObj.Used}元</p>
                  {
                    this.paramObj.Used === 0 ?
                      <span style={{ position: 'absolute', left: '0', top: '-26%', width: '15%' }}>
                        <img src={require('../../../images/gold.png')} role="presentation" />
                      </span> : null
                  }
                </li>
                <li className="left last">
                  <p className="red">{this.paramObj.Earn}元</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="empty">
            <img src={require('../../../images/principal2.png')} role="presentation" />
            <div className="bottom">
              <span>{this.paramObj.Used === 0 ? '本金翻了' : '空手套白狼'}</span>
              <p className="one">{this.paramObj.Used === 0 ? `${this.paramObj.Used}倍` : ''}</p>
              <p className="two">大神，这么好的成绩，</p>
              <p className="th">快去朋友圈得瑟一下吧！</p>
            </div>
          </div>
          <div className="ring">
            <a onClick={this.shareNotice}>
              <img src={require('../../../images/ring.png')} role="presentation" />
            </a>
            <div className="writte">
              <a onClick={this.showShare}>
                <p>得瑟有好礼</p>
              </a>
            </div>
          </div>
          <div className="fotter">
            <img className="img" src={require('../../../images/fotter.png')} role="presentation" />
            <div className="bottom">
              <ul className="clearfix one">
                <li className="left" styleName="fans">
                  <img src={require('../../../images/zc_tx.png')} role="presentation" />
                </li>
                <li className="left" styleName="fans">
                  <img src={require('../../../images/zc_tx.png')} role="presentation" />
                </li>
                <li className="left" styleName="fans">
                  <img src={require('../../../images/zc_tx.png')} role="presentation" />
                </li>
                <li className="left" styleName="fans">
                  <img src={require('../../../images/zc_tx.png')} role="presentation" />
                </li>
                <li className="left" styleName="fans">
                  <img src={require('../../../images/zc_tx.png')} role="presentation" />
                </li>
              </ul>
              <ul className="clearfix two">
                <li className="left">
                  <img src={require('../../../images/ing.png')} role="presentation" />
                </li>
                <li className="left">
                  <img src={require('../../../images/ing.png')} role="presentation" />
                </li>
                <li className="left">
                  <img src={require('../../../images/ing.png')} role="presentation" />
                </li>
                <li className="left">
                  <img src={require('../../../images/ing.png')} role="presentation" />
                </li>
                <li className="left">
                  <img src={require('../../../images/ing.png')} role="presentation" />
                </li>
              </ul>
              <ul className="clearfix th">
                <li className="left">
                  <img src={require('../../../images/cat.png')} role="presentation" />
                </li>
                <li className="left">
                  <img src={require('../../../images/cat.png')} role="presentation" />
                </li>
                <li className="left">
                  <img src={require('../../../images/cat.png')} role="presentation" />
                </li>
                <li className="left">
                  <img src={require('../../../images/cat.png')} role="presentation" />
                </li>
                <li className="left">
                  <img src={require('../../../images/cat.png')} role="presentation" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div id="share" className="share" style={{ display: 'none' }}>
          <div className="share_back" />
          <div className="ring1">
            <div className="title clearfix">
              <img
                className="left" src={require('../../../images/ring1.png')}
                role="presentation"
              />
              <a onClick={this.closeShare}>
                <img className="right" src={require('../../../images/x.png')} role="presentation" />
              </a>

            </div>
            <div className="circle">
              <ul>
                <li className="clearfix">
                  <img
                    className="left" src={require('../../../images/circle1.png')}
                    role="presentation"
                  />
                  <p className="left">每成功圈粉一位好友,可得1枚10元金币</p>
                </li>
                <li className="clearfix">
                  <img
                    className="left" src={require('../../../images/circle2.png')}
                    role="presentation"
                  />
                  <p className="left">1个交易日内（不含当日）成功圈粉满5位好友,可再得100元金币</p>
                </li>
              </ul>
            </div>
            <div className="remarks">
              <img src={require('../../../images/remarks.png')} role="presentation" />
              <div>备注</div>
            </div>
            <div className="write">
              <ul>
                <li className="clearfix">

                  <p className="left">1、好友通过晒单页面注册新微盘，算作成功圈粉。</p>
                </li>
                <li className="clearfix">

                  <p className="left">2、1笔晒单的操作最多只能得到1次100元圈粉奖励。</p>
                </li>
                <li className="clearfix">

                  <p className="left">3、10元奖励金币实时发放，100元奖励金币在完成任务当天结算后系统统一发放。</p>
                </li>
                <li className="clearfix">

                  <p className="left">4、本页面可通过操盘记录页面重复进入。如有疑问请咨询在线客服。</p>
                </li>
              </ul>
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
    );
  }
}

export default cssModules(UnShare, styles, { allowMultiple: true, errorWhenNotFound: false });
