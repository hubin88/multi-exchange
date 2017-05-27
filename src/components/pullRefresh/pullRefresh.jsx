/**
 * Created by yjzhme on 2017/1/15.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './pullRefresh.scss';

class PullRefresh extends Component {
  static propTypes = {
    children: PropTypes.any,
    optoins: PropTypes.object,
    pullDown: PropTypes.func,
    pullUp: PropTypes.func,
    style: PropTypes.object,
  }

  static defaultProps = {
    isPullUp: false,
    isPullDown: true,
  }

  state = {
    startY: 0,
    moveY: 0,
  }

  componentDidMount() {
    const pullRefreshWrap = this.pullRefreshWrap;
    pullRefreshWrap.addEventListener('touchmove', (e) => this.touch(e), false);
    pullRefreshWrap.addEventListener('touchend', (e) => this.touch(e), false);
  }

  touch(e) {
    // e.preventDefault();
    const pullRefresh = this.pullRefresh;
    if ((pullRefresh.scrollTop === 0
      || pullRefresh.scrollTop === (pullRefresh.scrollHeight - pullRefresh.offsetHeight))
      && this.state.moveY > 0) {
      switch (e.type) {
        case 'touchmove': {
          const y = e.touches[0].pageY;
          this.setState({ moveY: y });
          break;
        }
        case 'touchend': {
          const y = e.changedTouches[0].pageY;
          const distance = y - this.state.startY;
          if (distance > 80 && this.props.optoins.isPullDown) {
            this.downLoad();
          } else if (distance < -80 && this.props.optoins.isPullUp) {
            this.upLoad();
          } else {
            this.setState({ startY: 0, moveY: 0 });
          }
          break;
        }
        default:
          break;
      }
    } else {
      switch (e.type) {
        case 'touchmove': {
          const y = e.touches[0].pageY;
          this.setState({ startY: y, moveY: y });
          break;
        }
        default:
          break;
      }
    }
  }

  downLoad() {  // 下拉刷新方法
    this.setState({ startY: 0, moveY: 40 });
    this.props.pullDown();
    setTimeout(() => this.setState({ startY: 0, moveY: 0 }), 1000);
  }

  upLoad() {  // 上拉加载更多方法
    this.setState({ startY: 0, moveY: -40 });
    this.props.pullUp();
    setTimeout(() => this.setState({ startY: 0, moveY: 0 }), 1000);
  }

  transformY = () => {   // 计算拉动距离
    const transformY = this.state.moveY - this.state.startY;
    if (transformY >= 100 && this.props.optoins.isPullDown) {
      return 100;
    } else if (transformY <= -100 && this.props.optoins.isPullUp) {
      return -100;
    } else if ((transformY >= 30 && this.props.optoins.isPullDown) ||
      (transformY <= -30 && this.props.optoins.isPullUp)) {
      return transformY;
    }
    return 0;
  }

  renderPullDown() {   // 下拉提示语
    return (
      <span styleName="pull-down">
        <i
          styleName="pull-down-img"
          style={this.transformY() > 40 ? { webkitTransform: 'rotate(180deg)' } : null}
        />
        {this.transformY() >= 80 ? '松手刷新' : '下拉刷新'}
      </span>
    );
  }

  renderPullUp() {  // 上拉提示语
    return (
      <span styleName="pull-up">
        <i
          styleName="pull-up-img"
          style={this.transformY() < -40 ? { webkitTransform: 'rotate(0deg)' } : null}
        />
        {this.transformY() <= -80 ? '松手加载更多' : '上拉加载更多'}
      </span>
    );
  }

  render() {
    return (
      <div
        styleName="pullRefresh-wrap"
        ref={(ref) => { this.pullRefreshWrap = ref; }}
        style={{ webkitTransform: `translateY(${this.transformY()}px)` }}
      >
        {this.props.optoins.isPullDown ? this.renderPullDown() : null}
        <div
          styleName="pullRefresh"
          ref={(ref) => { this.pullRefresh = ref; }}
          style={this.props.style}
        >
          {this.props.children}
        </div>
        {this.props.optoins.isPullUp ? this.renderPullUp() : null}
      </div>
    );
  }
}

export default cssModules(PullRefresh, styles, { allowMultiple: true, errorWhenNotFound: false });
