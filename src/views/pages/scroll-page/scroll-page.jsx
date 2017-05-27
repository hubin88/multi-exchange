/**
 * Created by dell on 2016/12/26.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './scroll-page.scss';
import { callNative } from '../../../ultils/helper';

const pageFullNum = 4;
const screenW = document.documentElement.clientWidth;

class ScrollPage extends Component {
  static propTypes = {
    goCallBack: PropTypes.func,
    dispatch: PropTypes.func,
    command: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      pageNum: 0,
    };
    this.scrollEventArr = [
      ['touchstart', this.touchStartScrollPage, false],
      // ['touchmove', this.touchMoveScrollPage, false],
      ['touchend', this.touchEndScrollPage, false],
    ];
    this.btnEventArr = [
      ['touchstart', this.onClickBtnStart, true],
      ['touchend', this.onClickBtnEnd, true],
    ];
  }

  // imagesArr = [
  //   { url: require('../../../images/help/help_na1.png') },
  //   { url: require('../../../images/help/help_na2.png') },
  //   { url: require('../../../images/help/help_na1.png') },
  // ];

  componentDidMount() {
    this.eventListener(this.goAppBtn, 'addEventListener', this.btnEventArr);
    this.eventListener(this.scrollPage, 'addEventListener', this.scrollEventArr);
  }

  componentWillUnmount() {
    this.eventListener(this.goAppBtn, 'removeEventListener', this.btnEventArr);
    this.eventListener(this.scrollPage, 'removeEventListener', this.scrollEventArr);
  }

  onClickBtnStart = (e) => {
    this.eventListener(this.scrollPage, 'removeEventListener', this.scrollEventArr);
    e.preventDefault();
    e.stopPropagation();
    this.goHome(e);
  };

  onClickBtnEnd = (e) => {
    this.eventListener(this.scrollPage, 'addEventListener', this.scrollEventArr);
    e.preventDefault();
    e.stopPropagation();
  };

  eventListener = (el, listenerFunc, opt = [[]]) => (
    opt.forEach((item) => {
      el[listenerFunc](...item);
    })
  );

  touchStartScrollPage = (e) => {
    this.eventListener(this.goAppBtn, 'removeEventListener', this.btnEventArr);
    this.eventListener(this.scrollPage, 'addEventListener', [['touchmove', this.touchMoveScrollPage, false]]);
    e.preventDefault();
    e.stopPropagation();
    if (e.touches.length === 1) {
      this.pageWrap.style.webkitTransition = '';
      this.pageWrap.style.transition = '';
      const touch = e.touches[0] || e.changedTouches[0];
      this.startX = parseInt(touch.pageX, 10);
      this.nowPageNum = this.state.pageNum;
      this.startTime = new Date().getTime();
    }
  };

  touchMoveScrollPage = (e) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const touch = e.touches[0] || e.changedTouches[0];
      const moveX = parseInt(touch.pageX, 10) - this.startX;
      this.moveScale = moveX / screenW;
      this.setState({ pageNum: this.nowPageNum - this.moveScale });
    }
  };

  touchEndScrollPage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.touches.length === 0) {
      this.pageWrap.style.WebkitTransition = '-webkit-transform 300ms';
      this.pageWrap.style.transition = 'transform 300ms';
      const endTime = new Date().getTime();
      let pageNum = this.nowPageNum;
      if (this.state.pageNum <= 0) {
        pageNum = 0;
      } else if (this.state.pageNum >= (pageFullNum - 1)) {
        pageNum = pageFullNum - 1;
      } else if ((endTime - this.startTime) <= 300 || 2 * Math.abs(this.moveScale) >= 2) {
        if (this.moveScale >= 0) {
          pageNum -= 1;
        } else {
          pageNum += 1;
        }
      }
      this.setState({ pageNum });
      this.eventListener(this.goAppBtn, 'addEventListener', this.btnEventArr);
      this.eventListener(this.scrollPage, 'removeEventListener', [['touchmove', this.touchMoveScrollPage, false]]);
    }
  };

  goHome = (e) => {
    e.preventDefault();
    if (this.props.goCallBack) this.props.goCallBack();
    callNative(window.executeNative, { command: `${APP_COMMAND.msg}gohome-success` });
  };

  render() {
    return (
      <div styleName="scroll-page" ref={(ref) => { this.scrollPage = ref; }}>
        <div
          styleName="page-wrap"
          ref={(ref) => { this.pageWrap = ref; }}
          style={{
            transform: `translateX(${-this.state.pageNum * 100}%)`,
            WebkitTransform: `translateX(${-this.state.pageNum * 100}%)`,
            transition: 'transform 300ms',
            WebkitTransition: '-webkit-transform 300ms',
          }}
        >
          {
            Array.from({ length: pageFullNum - 1 }, (n, idx) => (
              <div key={idx} styleName={`page-bg page-bg-${idx}`} />
            ))
          }
          <div styleName={'page-bg page-bg-3'}>
            <div styleName="pageBtnBox"><b
              ref={(ref) => { this.goAppBtn = ref; }}
              styleName={'page-btn'}
            >马上进入</b></div>
          </div>
        </div>
      </div>
    );
  }
}

export default cssModules(ScrollPage, styles, { allowMultiple: true, errorWhenNotFound: false });
