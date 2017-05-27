/**
 * Created by yjzhme on 2017/2/15.
 */

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import Api from '../../server/api';
import { ParamData } from '../../ultils/tools';
import styles from './msgDetails.scss';

class MsgDetails extends Component {
  state = {
    msgContent: '',
  };
  componentWillMount() {
    const param = ParamData;
    this.oneMsgView(param);
  }

  oneMsgView = (obj) => {
    Api.oneMsgView(obj).then(mesContent => {
      if (mesContent.code === 0) {
        const result = mesContent.result;
        this.setState({
          msgContent: result.msgContent,
        });
      }
    });
  }
  render() {
    return (
      <div styleName="msgDetails-wrap">
        <div styleName="msgDetails">
          {this.state.msgContent}
        </div>
      </div>
    );
  }
}

export default cssModules(MsgDetails, styles, { allowMultiple: true, errorWhenNotFound: false });

