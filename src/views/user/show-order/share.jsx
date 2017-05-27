/**
 * Created by wenxinfu on 2017/2/13.
 */

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './share.scss';
import './share.css';
import { getUrlParamObj } from '../../../ultils/helper';

class Share extends Component {
  static defaultProps = {};
  state = { objName: this.objName };

  componentWillMount() {
    this.objName = getUrlParamObj();
    this.profitRatio = `${Math.floor((this.objName.Earn / this.objName.Used) * 100)}%`;
    console.log(this.objName);
  }
  objName = {};
  render() {
    return (
      <div styleName="unshare">
        <div className="box">
          <div className="title">
            <img className="left" src={require('../../../images/maomao.png')} role="presentation" />
            <div className="left">
              <h1>{this.objName.Used || 20.00}元本金<span>入账</span>11.29元</h1>
              <p>轻松投资，不服来战！</p>
            </div>
          </div>
          <div className="form">
            <img src={require('../../../images/form.png')} role="presentation" />
            <div className="form_w">
              <div className="top">
                <span className="left one">{this.objName.ProductName + this.objName.text || 22}</span>
                <span className="left two">{this.objName.CloseTime || '2016年8月22日'}</span>
              </div>
              <div className="bottom">
                <div className="left l">
                  <ul>
                    <li className="li">建仓价</li>
                    <li className="li">建仓金额</li>
                    <li className="li">购买方式</li>
                    <li className="li">建仓时间</li>
                    <li className="li">平仓时间</li>
                    <li>
                      <span>平仓盈亏</span>
                    </li>
                  </ul>
                </div>
                <div className="left r">
                  <div className="top">
                    <ul className="clearfix">
                      <li className="left">{this.objName.OpenPrice || 1}</li>
                      <li className="li left">平仓价</li>
                      <li className="left r">{this.objName.HoldPrice || 2}</li>
                      <li className="left">{this.objName.Used || 0}元</li>
                      <li className="li left">建仓方向</li>
                      <li className="left r">{this.objName.Direction === 'B' ? '订购' : '代售' || '订购'}</li>
                      <li className="left b">{this.objName.Used === '0' ? '金币' : '现金' || '现金'}</li>
                      <li className="li left b">手续费</li>
                      <li className="left r b">{this.objName.OpenFee || 150}</li>
                    </ul>
                  </div>
                  <div className="bottom">
                    <ul>
                      <li className="clearfix">
                        <span className="left l">{this.objName.OpenTime || '2016-8-22'}</span>
                        <span className="left r">20:22:22</span>
                      </li>
                      <li className="clearfix">
                        <span className="left l">{this.objName.CloseTime || '2016-8-22'}</span>
                        <span className="left r">20:22:22</span>
                      </li>
                      <li className="clearfix">
                        <p>{`${this.objName.Earn}(${this.profitRatio})` || '1129(112.9%)'}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fotter">
            <img src={require('../../../images/dekaron.png')} role="presentation" />
            <div styleName="footer" className="follow">
              <div className="left l">
                <img src={require('../../../images/code1.png')} role="presentation" />
              </div>
              <div className="left r">
                <img src={require('../../../images/share.gif')} role="presentation" />
                <p>可购买6桶沥青或600g白银,</p>
                <p>盈利可提现，亏损我买单！</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default cssModules(Share, styles, { allowMultiple: true, errorWhenNotFound: false });
