/**
 * Created by wenxinfu on 2017/2/17.
 */

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './account-gold.scss';
import Nav from '../../../components/nav/nav';
import Alert from '../../../components/alert/alert';
import { getChosedExchange } from '../../../server/tool';
import { getUrlArguments } from '../../../ultils/helper';
import { timeStampConvert } from '../../../ultils/tools';
import Api from '../../../server/api';

class AccountGold extends Component {

  state = {
    title: this.title,
  }

  componentWillMount() {
    getChosedExchange((exchange) => {
      this.tradeUrl = exchange.tradUrl;
      this.title = ['有效(0)', '已失效'];
      this.getGold(this.goldStatus.use);
    });
  }

  getGold = (goldStatus) => {
    this.setTitle();
    Api.getAccountGold({
      sessionId: this.urlParam.sessionId,
      status: goldStatus,
      pageSize: 20,
      pageIndex: 1,
    }, this.tradeUrl).then((json) => {
      // console.log(json);
      const records = JSON.parse(json.result).records || [];
      console.log(333, records);
      if (goldStatus === this.goldStatus.use) {
        this.useData = records;
        this.title[0] = `有效(${this.useData.length})`;
      } else {
        this.usedData = records || [];
        this.title[1] = `已失效(${this.usedData.length})`;
      }
      this.setTitle();
    });
  }
  setTitle = () => {
    this.setState({
      title: this.title,
    });
  }
  setIndex = (index) => {
    if (index === '1') {
      document.getElementById('gold1').style.display = 'block';
      document.getElementById('gold2').style.display = 'none';
    } else {
      if (this.ss === false) {
        this.getGold(this.goldStatus.used);
        this.ss = true;
      }
      document.getElementById('gold2').style.display = 'block';
      document.getElementById('gold1').style.display = 'none';
    }
  }
  getDateDay = (dateString) => {
    const now = new Date();
    const date = timeStampConvert(dateString);
    return parseInt(Math.abs(now - date) / 1000 / 60 / 60 / 24, 10);
  }
  isExpires = (expiresDate) => {
    const day = this.getDateDay(expiresDate);
    if (day <= 3) {
      Alert.show('亲,该金币即将过期,建议尽快建仓使用', '注意', () => {

      }, undefined, undefined, false, true, '', '好的');
    }
  }
  title = [];
  urlParam = getUrlArguments();
  tradeUrl = '';
  goldStatus = {
    use: 1,
    used: 0,
  }
  useData = [];
  usedData = [];
  ss=false;
  render() {
    const count = this.useData.length;
    const faceValue = count === 0 ? 10 : this.useData[0].FaceValue;
    const num = faceValue * count;
    return (
      <div styleName="account-gold">
        <Nav setIndex={this.setIndex} navLink={['1', '2']} navText={this.title} />
        <div styleName="content">
          <div id="gold1">
            {num !== 0 ? <div>金币金额{num}元</div> : null}
            {
              this.useData.length > 0 ? this.useData.map((item, index) =>
                <div
                  styleName="golding" key={index}
                  onClick={() => { this.isExpires(item.ExpiresDate); }}
                >
                  <div styleName="head">
                    <div>
                      <span styleName="h3">{item.Remark }</span>
                      {
                        this.getDateDay(item.ExpiresDate) <= 3 ?
                          <span styleName="expire">即将到期</span> : null
                      }
                    </div>
                    <p>有效期：
                      {`${item.AddTime.substring(0, 10)}/${item.ExpiresDate.substring(0, 10)}`}
                    </p>
                    <div styleName="goldNum">
                      <span styleName="num">{item.FaceValue || 10}</span>
                      <span styleName="AddNums">
                    ×{item.Remain}
                      </span>
                    </div>
                  </div>
                  <div styleName="use-rule">使用规则：请在有效内使用，过期自动作废</div>
                </div>
              ) : <div styleName="noMsgTip">暂无可用金币</div>
            }
          </div>
          <div id="gold2" style={{ display: 'none' }}>
            {
              this.usedData.length > 0 ? this.usedData.map((item, index) =>
                <div styleName="gold" key={index}>
                  <div styleName="head">
                    <div>
                      <span styleName="h3">{item.Remark }</span>
                      <span styleName="expire">{
                        item.status === 0 ? '已过期' : '已使用'
                      }</span>
                    </div>
                    <p>有效期：
                      {`${item.AddTime.substring(0, 10)}-${item.ExpiresDate.substring(0, 10)}`}
                    </p>
                    <div styleName="goldNum">
                      <span styleName="num">{item.FaceValue || 10}</span>
                      <span styleName="AddNums">
                    ×{item.Remain}
                      </span>
                    </div>
                  </div>
                  <div styleName="use-rule">使用规则：使用规则：请在有效内使用，过期自动作废</div>
                </div>
              ) : <div styleName="noMsgTip">暂无失效金币</div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default cssModules(AccountGold, styles, { allowMultiple: true, errorWhenNotFound: false });
