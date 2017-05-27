/**
 * Created by wenxinfu on 2017/2/14.
 */

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './to-activity.scss';
import './to-activity.css';
import { getUrlArguments } from '../../../ultils/helper';
import '../../../server/qrcode.min';

class ToActivity extends Component {
  static defauleProps = {}

  componentDidMount() {
    const urlObj = getUrlArguments();
    this.url = `${window.BASE_SERVER.registerUrl}?deptid=${
      urlObj.deptId}&fromOpenid=${urlObj.fromOpenId}&brokerid=${urlObj.brokerId}`;
    const code = new window.QRcode('qrcode', {
      text: this.url,
      width: 128,
      height: 128,
    });
    console.log(code);
  }

  goRegisterUrl = () => {
    window.location.href = this.url;
  };

  render() {
    return (
      <div styleName="to-activity">
        <div className="attention_box">
          <div className="atten_blo">
            <div className="atten_blo1"><img
              src={require('../../../images/atten_img1.jpg')}
              role="presentation"
            />
            </div>
            <div className="atten_blo2"><img
              src={require('../../../images/atten_img2.jpg')}
              role="presentation"
            />
            </div>
            <div className="atten_blo3 relative" onClick={this.goRegisterUrl}>
              <div><img src={require('../../../images/atten_img3.jpg')} role="presentation" /></div>
              <div className="friend"><img
                src={require('../../../images/friend.gif')}
                role="presentation"
              /></div>
              <div id="qrcode" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default cssModules(ToActivity, styles, { allowMultiple: true, errorWhenNotFound: false });
