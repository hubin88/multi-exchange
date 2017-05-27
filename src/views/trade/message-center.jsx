/**
 * Created by wenxinfu on 2017/2/7.
 */

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './message-center.scss';

class MessageCenter extends Component {
  static defaultProps = {};

  render() {
    return (
      <div styleName="message-center">
        <ul styleName="message-ul">
          <li>
            <a href="">
              <nav styleName="nav-title">
                <div styleName="title">

                  <span>

                    <img src={require('../../images/tips.png')} alt="" />
                  </span>
                  <span>
                   系统公告
                 </span>
                  <span styleName="show-tips" />
                </div>
                <div styleName="time">
                  2017-01-16 17:30:60
                </div>
              </nav>

              <div styleName="content">
                重要通知
              </div>
            </a>
          </li>
          <li>
            <a href="">
              <nav styleName="nav-title">
                <div styleName="title">
                  系统公告
                </div>
                <div styleName="time">
                  2017-01-16 17:30:60
                </div>
              </nav>

              <div styleName="content">
                重要通知
              </div>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default cssModules(MessageCenter, styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
});
