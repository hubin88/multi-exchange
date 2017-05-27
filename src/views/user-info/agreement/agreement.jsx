/**
 * Created by admin on 2017/2/7.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './agreement.scss';
import { Notice } from './notice';
import { Agree } from './agree';
import Api from '../../../server/api';

class Agreement extends Component {
  static propTypes = {
    deptId: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      exchanges: [],
      hasDelete: 0,
    };
  }

  componentWillMount() {
    const options = {
      deptId: this.props.deptId,
    };
    Api.queryChange(options).then((json) => {
      const exchanges = json.result;
      this.setState({
        exchanges,
      });
    });
  }

  toggleContent = (e, t) => {
    e.stopPropagation();
    e.preventDefault();
    const target = t;
    const i = e;
    if (target.style.display === 'block') {
      target.style.display = 'none';
      i.target.style.backgroundImage = `url(${require('../../../images/down.png')})`;
    } else {
      target.style.display = 'block';
      i.target.style.backgroundImage = `url(${require('../../../images/up.png')})`;
    }
  };
  changeAgree = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const target = e.target;
    const flag = e.target.getAttribute('class').includes('agreeJpg');
    console.log(flag);
    if (flag) {
      // target.style.cssText = ``;
      target.setAttribute('class', 'deletJpg');
      this.setState({
        hasDelete: ++this.state.hasDelete,
      });
    } else {
      target.setAttribute('class', 'agreeJpg');
      this.setState({
        hasDelete: --this.state.hasDelete,
      });
    }
  };
  submit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const isSubmit = this.state.hasDelete === 0;
    if (!isSubmit) return;
    this.box.parentNode.style.left = 0;
  };
  showExchange = (item) => {
    const id = item.exchangeId;
    return (
      <li key={id}>
        <div styleName="title">
          <span
            className="agreeJpg"
            onClick={this.changeAgree}
          />
          <span styleName="title-text">{item.appName}</span>
        </div>
        <div
          styleName="content" style={{ display: 'block' }}
          ref={(ref) => { this[`content${id}`] = ref; }}
        >
          <div>
            <div
              styleName="title-content"
              style={{ display: 'block' }}
              onClick={(e) => { this.toggleContent(e, this[`notice${id}-content`]); }}
            >开户须知
            </div>
            <div
              styleName="detailed "
              style={{ display: 'none' }}
              ref={(ref) => { this[`notice${id}-content`] = ref; }}
            >{Notice}
            </div>
          </div>
          <div>
            <div
              styleName="title-content"
              style={{ display: 'block' }}
              onClick={(e) => { this.toggleContent(e, this[`agreement${id}-content`]); }}
            >客户协议书
            </div>
            <div
              styleName="detailed"
              style={{ display: 'none' }}
              ref={(ref) => { this[`agreement${id}-content`] = ref; }}
            >{Agree}
            </div>
          </div>
        </div>
      </li>
    );
  };

  render() {
    const isSubmit = this.state.hasDelete === 0;
    return (
      <div styleName="agreement" ref={(ref) => { this.box = ref; }}>
        <ul>
          {this.state.exchanges.map((item) => this.showExchange(item))}
        </ul>
        <div styleName="button">
          <input
            type="button" styleName={isSubmit ? 'pass' : 'no-pass'} value="同意用户协议"
            onClick={this.submit}
          />
        </div>
      </div>
    );
  }
}

export default cssModules(Agreement, styles, { allowMultiple: true, errorWhenNotFound: false });
