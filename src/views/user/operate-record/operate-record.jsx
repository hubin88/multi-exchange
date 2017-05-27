/**
 * Created by wenxinfu on 2017/2/10.
 */

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './operate-record.scss';
import Nav from '../../../components/nav/nav';
import Api from '../../../server/api';
import PullRefresh from 'reactjs-pull-refresh';
import { callNative, getUrlArguments } from '../../../ultils/helper';
import { getChosedExchange } from '../../../server/tool';
import '../../../css/operate-pullRefresh.css';

class OperateRecord extends Component {

  state = {
    cashData: this.cashData || [],
    goldData: this.goldData || [],
  }

  componentDidMount() {
    getChosedExchange((exchange) => {
      // if(!exchange){
      //   return;
      // }
      const urlParam = getUrlArguments();
      console.log(exchange);
      this.sessionId = urlParam.sessionId;
      this.tradeUrl = exchange.tradUrl;
      Api.getProductData({ sessionId: urlParam.sessionId }, this.tradeUrl).then((json) => {
        this.productData = JSON.parse(json.result).Merchs || [];
        console.log(22, this.productData);
      });
      this.getOperateRecord();
    });
  }

  getOperateRecord = (resolve, reject) => {
    this.param = {
      lastId: this.param ? this.param.lastId : '',
      pageSize: 20,
      sessionId: this.sessionId,
    };
    this.paramGold = {
      lastId: this.paramGold ? this.paramGold.lastId : '',
      pageSize: 20,
      sessionId: this.sessionId,
    };
    Api.getOperateRecord(this.param, this.tradeUrl).then((json) => {
      if (reject && typeof reject === 'function' && json.code !== 0) {
        reject();
      }
      const data = JSON.parse(json.result).records || [];
      console.log('getOperateRecord', data);

      this.data = this.data ? this.data.concat(data) : data;
      // this.cashData = data.filter((item) => parseFloat(item.Used) !== 0);
      this.setProductInfo(this.data);
      this.param.lastId = this.data.length !== 0 ? this.data[this.data.length - 1].HistoryID : '';
      this.setState({
        cashData: this.data,// this.state.cashData.concat(this.cashData),
      });

      if (resolve && typeof resolve === 'function') {
        resolve();
      }
    });
    Api.getOperateRecordGold(this.paramGold, this.tradeUrl).then((json) => {
      if (reject && typeof reject === 'function' && json.code !== 0) {
        reject();
      }
      const data = JSON.parse(json.result).records || [];
      console.log('getOperateRecordGold', data);
      this.data2 = this.data2 ? this.data2.concat(data) : data;
      // this.goldData = data.filter((item) => parseFloat(item.Used) === 0);
      this.setProductInfo(this.data2);

      this.paramGold.lastId = this.data2.length !== 0 ? this.data2[this.data2.length - 1].HistoryID : '';
      this.setState({
        goldData: this.data2, //this.state.goldData.concat(this.goldData),
      });
      if (resolve && typeof resolve === 'function') {
        resolve();
      }
    });
  };

  setIndex = (index) => {
    if (index === '1') {
      document.getElementById('trade1').style.display = 'block';
      document.getElementById('trade2').style.display = 'none';
    } else {
      document.getElementById('trade2').style.display = 'block';
      document.getElementById('trade1').style.display = 'none';
    }
  };
  getCloseType = (type) => {
    switch (parseFloat(type)) {
      case 1:
        return '手动平仓';
      case 2:
        return '止盈平仓';
      case 3:
        return '止损平仓';
      case 4:
        return '强平';
      case 5:
        return '结算平仓';
      default:
        return '';
    }
  }
  setProductInfo = (data) => {
    for (let i = 0; i < data.length; i += 1) {
      data[i].productInfo = this.getText(data[i].ProductCode);
    }

  }
  getText = (ProductCode) => {
    let text = '';
    for (let n = 0; n < this.productData.length; n += 1) {
      if (this.productData[n].merchCode === ProductCode) {
        text = `${this.productData[n].UnitNum + this.productData[n].ShowUnit}`;
      }
    }
    return text;
  }

  getTrade = (data) => data.map((item, index) => <div styleName="record-content" key={index}>
      <div styleName="left">
        <ul>
          <li styleName="name">
          <span>
            {item.ProductName }
          </span>
            <span>{item.Volume}{item.UnitName}</span>
            <span styleName="weight">
            {
              item.productInfo
            }
          </span>
          </li>
          <li>
            <span>建仓价</span>
            <span>
            { parseInt(item.OpenPrice, 10) || '' }
          </span>
          </li>
          <li>
            <span>平仓价</span>
            <span>
            { parseInt(item.ClosePrice, 10) || '' } + {item.ProductCode}
          </span>
          </li>
          <li>
            <span>手续费</span>
            <span>
            {item.OpenFee}
          </span>
          </li>
          <li>
            <span>保证金</span>
            <span>{item.Used}</span>
          </li>
          <li>
            <img src={require('../../../images/time.png')} role="presentation" styleName="iamgesli" />
            <span>{
              item.OpenTime
            }</span>
          </li>
        </ul>
      </div>
      <div styleName="right">
        <ul>
          <li>
            {
              item.Earn > 0 ? <div styleName="profit">
                <span styleName="tips-text">赚</span> +{item.Earn}
              </div> : <div styleName="loss">
                <span styleName="tips-text">亏</span> {item.Earn}
              </div>
            }
          </li>
          <li>
            <span>建仓时间</span>
            <span>{item.OpenTime}</span>
          </li>
          <li>
            <span>平仓类型</span>
            <span>{this.getCloseType(item.CloseType)}</span>
          </li>
          <li>
            <span>交易方向</span>
            <span>{item.Earn > 0 ? '订购' : '代售'}</span>
          </li>
          <li>
            &nbsp;
          </li>
          <li>{
            this.showOrder(item.Earn, item.Used) ?
              <a
                onClick={() => { this.share(item.TradeID, item.Used); }}
                styleName="show-order"
              >
                我要晒单
              </a> : null
          }
          </li>
        </ul>
      </div>
    </div>
  );
  loadMoreCallback = () => new Promise((resolve, reject) => {
    this.getOperateRecord(resolve, reject);
  }).then(() => {
    console.info('加载更多成功！');
  }, () => {
    console.info('加载更多失败！');
  });

  showOrder = (earn, used) => {
    if (used === 0) {
      return false;
    }
    const per = (earn / used) * 100;
    return per >= SHOW_PER;
  }
  share = (TradeID, Used) => {
    let data = {};
    let dd;
    if (Used > 0) {
      dd = this.data;
    } else {
      dd = this.data2;
    }
    dd.forEach((item) => {
      if (item.TradeID === TradeID) {
        data = {
          ProductName: item.ProductName,
          UnitName: item.UnitName,
          OpenPrice: item.OpenPrice,
          ClosePrice: item.ClosePrice,
          HoldPrice: item.HoldPrice,
          Direction: item.Direction,
          Used: item.Used,
          CloseTime: item.CloseTime,
          OpenTime: item.OpenTime,
          OpenFee: item.OpenFee,
          text: item.productInfo,
          Volume: item.Volume,
          Earn: item.Earn,
        };
      }
    });
    const text = JSON.stringify(data);
    const url = `${APP_COMMAND.file}/appH5/orderUnShare.html?params=`;
    window.SHAREURL = url + encodeURIComponent(encodeURIComponent(text));
    callNative(window.executeNative, {
      command: window.SHAREURL,
    });
  };
  productData = [];
  goldData = [];
  cashData = [];

  sessionId = '';
  tradeUrl = '';

  render() {
    const pullRefreshProps = {
      maxAmplitude: 80,
      debounceTime: 30,
      throttleTime: 100,
      deceleration: 0.001,
      loadMore: true,
      refresh: false,
      loadMoreCallback: this.loadMoreCallback,
      hasMore: true,
    };
    return (
      <div styleName="operate-record">
        <Nav
          styleName="operateNav"
          setIndex={this.setIndex} navLink={['1', '2']}
          navText={['现金交易', '金币交易']}
        />
        <div styleName="container">
          <PullRefresh {...pullRefreshProps}>
            <div id="trade1">
              {this.state.cashData.length > 0 ?
                this.getTrade(this.state.cashData) :
                <div styleName="noMsgTip">暂无现金交易</div>}
            </div>
            <div id="trade2" style={{ display: 'none' }}>
              {this.state.goldData.length > 0 ?
                this.getTrade(this.state.goldData) :
                <div styleName="noMsgTip">暂无金币交易</div>}
            </div>
          </PullRefresh>
        </div>
      </div>
    );
  }
}

export default cssModules(OperateRecord, styles, { allowMultiple: true, errorWhenNotFound: false });
