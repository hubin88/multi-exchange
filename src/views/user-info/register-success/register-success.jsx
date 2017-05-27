/**
 * Created by admin on 2017/2/8.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './register-success.scss';
import { removeWrap, getChosedExchange } from '../../../server/tool';
import { callNative } from '../../../ultils/helper';


class RgisterSuccess extends Component {
  static propTypes = {
    name: PropTypes.string,
    mobile: PropTypes.string,
    password: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }
  componentWillMount() {
    getChosedExchange((exchange) => {
      this.setState({
        name: exchange.exchangeName,
      });
    });
  }

  entryLogin = () => {
    removeWrap();
    callNative(window.executeNative, {
      command: `${APP_COMMAND.msg}register-success`,
      params: {
        mobile: this.props.mobile,
        password: this.props.password,
      },
    });
  };

  render() {
    console.log(this.names);
    return (
      <div styleName="register-success">
        <div styleName="title">
          <span>恭喜!</span>
        </div>
        <div styleName="content">
          您已成功注册到
          <span>{this.state.name}</span>
          并同步注册了其他交易所
        </div>
        <div styleName="entry-home">
          <span onClick={this.entryLogin}>立即登录</span>
        </div>
      </div>
    );
  }
}

export default cssModules(RgisterSuccess, styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
});
