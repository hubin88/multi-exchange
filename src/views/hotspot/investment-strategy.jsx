/**
 * Created by wenxinfu on 2017/2/21.
 */

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import './celue.css';
import styles from './investment-strategy.scss';
import { callNative } from '../../ultils/helper';

class InvestmentStrategy extends Component {
  componentDidMount() {
    this.setTime();
  }

  setTime = () => {
    const time = new Date();
    let month = time.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let day = time.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    this.nowTime = `${time.getFullYear()}-${month}-${day}`;

    this.setState({
      nowTime: this.nowTime,
    });
  }
  setIndex = () => {
    callNative(window.executeNative, {
      command: `${window.APP_COMMAND.view}hotActivity`,
    });
  }

  render() {
    return (
      <div styleName="investment-strategy">
        <nav styleName="celue">
          <ul styleName="hots">
            <li onClick={this.setIndex}>
              热门活动
            </li>
            <li>
              投资策略
            </li>
            <li>
              <div styleName="msg">
                <img src={require('../../images/messageInfo.png')} alt="" />
                {/* <span />*/}
              </div>

            </li>
          </ul>
        </nav>
        <div styleName="content">
          <div id="investmentStrategy">
            <div className="strategy">
              <div className="title clearfix">
                <b className="left">【早间策略】</b>
                <p className="right" id="times">{this.nowTime}</p>
              </div>
              <div className="varieties">
                <div className="top clearfix">
                  <div className="l left">
                    <p>红木</p>
                  </div>
                  <div className="writte">
                    <p>红木3850-3870布局空单，止损3890，止盈3800；3680-3700布局多单，止损3660，止盈3750；支撑位3650
                      3700，压力位3800 3850。</p>
                  </div>
                </div>
              </div>
              <div className="content" >
                <p>红木：周四亚盘震荡下行，欧盘延续亚盘走势，逼近前期低点，美盘时段转为上涨，日内整体波动幅度巨大，
                  操作空间十分可观，日内整体震荡趋势为主，有出现箱体迹象。</p>
                <p>&nbsp;</p>
                <p><img alt="" styleName="widthO" src={require('../../images/19173440vdnf.png')} /></p>
                <div>
                  <p>基本面：根据尼日利亚联邦共和国环境部长哈吉亚·阿米娜·莫哈米德（Hajia Amina
                    Mohammed）的要求，该国政府已经停止了签发濒危野生动植物种国际贸易公约（CITES）许可证的工作，
                    原因是该国的非法木材采伐目前已经不可控制，
                    且森林资源的开采和野生动植物种的经营都是处于不可持续经营状态。
                    环境部长称不再颁发CITES许可的工作状态从2017年1月即已经开始，将会至少持续到3月，
                    直到政府寻求到一个稳妥的解决方案。在南非约翰内斯堡,
                    联合国濒危野生动植物国际贸易公约(CITES，也称华盛顿公约)的缔约国召开第十七届缔约方大会。此次会议上，
                    缔约国代表讨论并通过了多项与红木产业相关的内容。
                    缔约方大会对我国红木市场上常用的几大红木主力原材料均进入国际管制，
                    红木材料来源急剧减少，红木进口与运输成本迅速上涨。与此同时，红木行业似乎还处于盘整阶段，
                    整体行情相对冷清，市场上红木价格与材料倒挂的现象比较普遍，令行情显得扑朔迷离。
                    红木行业2017年的行情走势将会如何?红木是否值得收藏?目前的市场是回暖的前奏，
                    还是新一轮下跌的拐点?这是众多投资者以及生产企业都很关注的问题。根据供求关系和物以希为贵原则，
                    红木材料市场回暖机会很大，对红木未来行情充满信心。</p>
                  <p>&nbsp;</p>
                  <p>
                    技术面：技术上，日线级别来看，收出一根小阴线，行情在支撑位附近徘徊多日。
                    短周期上，30和60分钟图中看，涨跌幅度均较大。日内操作仍可结合操作，高空低多。</p>
                </div>
                <p><img alt="" styleName="widthO" src={require('../../images/051027199r07.png')} /></p>
                <p>① 17:00 欧元区12月季调后经常帐</p>
                <p>② 17:30 英国1月季调后零售销售月率</p>
                <p>③ 23:00 美国1月谘商会领先指标月率</p>
                <p>④ 次日02:00 美国至2月17日当周石油钻井总数</p>
              </div>
            </div>
          </div>
        </div>
        <center className="fotter">以上策略观点仅供参考，请自主下单，自负盈亏</center>
      </div>
    );
  }
}

export default cssModules(InvestmentStrategy, styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
});
