/**
 * Created by dell on 2017/2/8.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './feedback.scss';
import { check } from '../../server/tool';
import Api from '../../server/api';
import { getUrlArguments, callNative } from '../../ultils/helper';
import Tips from '../../components/tips';

class FeedBack extends Component {

  static PropTypes = {
    matterList: PropTypes.object,
    checked: PropTypes.bool,
  };
  static defaultProps = {};

  componentDidMount() {
    this.timeList.getElementsByTagName('i')[0].setAttribute('class', 'loadimg');
  }

  // 点击选择反馈原因
  setMatterList = (e, nums) => {
    const setli = e.currentTarget.getElementsByTagName('i')[0];
    const len = this.matterList.length;
    for (let i = 0; i < len; i += 1) {
      this.timeList.childNodes[i].getElementsByTagName('i')[0].style.cssText = '';
      this.timeList.childNodes[i].getElementsByTagName('i')[0].setAttribute('class', '');
    }
    setli.setAttribute('class', 'loadimg');
    this.nums = nums;
  };

  matterList = [
    { name: '程序错误', isChecked: true },
    { name: '资金问题' },
    { name: '其它' },
  ];
  pageResize = () => {
    setTimeout(() => {
      window.scrollTo(0, 170);
    }, 100);
  };

  refer = (e) => {
    let num = this.nums;
    const target = e.target;
    if (!num) {
      num = 0;
    }
    const content = this.content.value;
    const phone = this.phone.value;
    if (content === '') {
      Tips.show('反馈信息不能为空');
      return;
    }

    if (phone !== '') {
      if (!(/^1[34578]\d{9}$/.test(phone))) {
        Tips.show(check.account.validate(phone));
        return;
      }
    }
    const deptId = getUrlArguments().deptId;
    const value = {
      deptId,
      feedType: num,
      feedRemark: content,
      mobile: phone,
    };
    Api.feedBackInfo(value).then((msg) => {
      if (msg) {
        Tips.show('谢谢您的反馈');
        this.content.value = '';
        this.phone.value = '';
        target.disabled = true;
        target.style.backgroundColor = '#DDD';
        callNative('executeNative', { command: `${APP_COMMAND.msg}feedback-success` });
      }
    }).catch((msg) => {
      console.log(msg);
      Tips.show('请求失败');
    });
  };
  render() {
    return (
      <div>
        <div styleName="feedBack">
          <p>请选择反馈类型</p>
          <ul styleName="matterList" ref={(ref) => { this.timeList = ref; }}>
            {
              this.matterList.map((item, i) => (
                <li key={i} onClick={(e) => { this.setMatterList(e, i); }} >
                  <i className={`${i === 0 ? 'active' : ''}`} />
                  <span>{item.name}</span>
                </li>
              ))
            }
          </ul>
          <textarea
            type="text"
            placeholder="您的反馈将帮助我们更快的成长"
            styleName="content bgColor"
            ref={(ref) => {
              this.content = ref;
            }}
          />
          <input
            type="text"
            placeholder="请输入手机号（可选）"
            styleName="phone bgColor"
            maxLength="11"
            ref={(ref) => {
              this.phone = ref;
            }}
            onFocus={(e) => { this.pageResize(e); }}
          />
          <button styleName="sub" onClick={(e) => this.refer(e)}>提交反馈</button>
        </div>
      </div>
    );
  }
}

export default cssModules(FeedBack, styles, { allowMultiple: true, errorWhenNotFound: false });

