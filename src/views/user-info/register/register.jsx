import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './register.scss';
import Api from '../../../server/api';
import {
  timer,
  check,
  getQueryString,
  getFileName,
  getChosedExchange,
  getDevice,
} from '../../../server/tool';
import { callNative } from '../../../ultils/helper';
import Tips from '../../../components/tips';
import Dialog from '../../../components/dialog';
import RegisterSuccess from '../register-success/register-success';
import Agreement from '../agreement/agreement';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class Register extends Component {
  static propTypes = {
    isRegister: PropTypes.bool,
    deptId: PropTypes.string,
    exchangeCode: PropTypes.string,
    brokerId: PropTypes.string,
    deviceType: PropTypes.string,
    fromOpenId: PropTypes.string,
    deptCode: PropTypes.string,
  };

  static defaultProps = {
    isRegister: getFileName() === 'register',
    deptId: getQueryString('deptId'),
    exchangeCode: getQueryString('exchangeCode'),
    deviceType: getDevice().toLowerCase(),
    brokerId: getQueryString('brokerId'),
    fromOpenId: getQueryString('openId'),
    deptCode: getQueryString('deptCode') || window.DEPTCODE,
  };

  constructor(props) {
    super(props);
    this.state = {
      isAccountNotEmpty: false,
      isCodeNotEmpty: false,
      isPassWordNotEmpty: false,
      isPassWord2NotEmpty: false,
      isAgreement: true,
      tipsText: '新用户注册送888元',
      chosedExchange: {},
    };
  }

  componentWillMount() {
    const deptId = this.props.deptId;
    getChosedExchange((exchange) => {
      console.log(exchange);
      this.setState({
        chosedExchange: exchange,
      });
    });
    const options = {
      deptId,
    };
    if (this.props.isRegister) {
      Api.getTips(options).then((json) => {
        const text = json.result.registerTip;
        this.setState({
          tipsText: text,
        });
      });
      if (this.props.brokerId) {
        const obj = {
          deptCode: this.props.deptCode,
          terminalType: this.props.deviceType,
        };
        Api.getOrg(obj).then((json) => {
          const result = json.result;
          this.downLoadUrl = result.downUrl.includes('http') ? result.downUrl : `http://${result.downUrl}`;
          console.log(this.downLoadUrl);
        });
      }
    }
  }

  checke = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const val = e.target.value;
    const id = e.target.getAttribute('id');
    const notEmpty = /\S/;
    switch (id) {
      case 'account':
        if (notEmpty.test(val)) {
          this.setState({
            isAccountNotEmpty: true,
          });
        } else {
          this.setState({
            isAccountNotEmpty: false,
          });
        }
        if (val.length > 11) {
          this.account.value = val.substr(0, 11);
        }
        break;
      case 'password':
        if (notEmpty.test(val)) {
          this.setState({
            isPassWordNotEmpty: true,
          });
        } else {
          this.setState({
            isPassWordNotEmpty: false,
          });
        }
        break;
      case 'password2':
        if (notEmpty.test(val)) {
          this.setState({
            isPassWord2NotEmpty: true,
          });
        } else {
          this.setState({
            isPassWord2NotEmpty: false,
          });
        }
        break;
      case 'code':
        if (notEmpty.test(val)) {
          this.setState({
            isCodeNotEmpty: true,
          });
        } else {
          this.setState({
            isCodeNotEmpty: false,
          });
        }
        if (val.length > 4) {
          this.code.value = val.substr(0, 4);
        }
        break;
      case 'agreement':
        this.setState({
          isAgreement: !this.state.isAgreement,
        });
        break;
      default: return false;
    }
    return false;
  };

  successGetCode = () => {
    timer('code-btn');
    Tips.show('验证码已发送');
  }
  agreeMent = () => {
    this.box.style.left = '-100%';
  };
  registerGetCode = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const flag = e.target.getAttribute('disabled');
    const { chosedExchange } = this.state;
    if (flag) return;
    let options;
    if (this.props.isRegister) {
      options = {
        deptId: this.props.deptId,
        mobile: this.account.value,
        msgType: '0',
      };
    } else {
      options = {
        orgId: chosedExchange.orgId,
        mobile: this.account.value,
        msgType: '0',
      };
    }

    const isAccountPass = check.account.validate(options.mobile);
    if (Tips.length >= 1) {
      return;
    }
    if (isAccountPass !== true) {
      Tips.show(isAccountPass);
      return;
    }
    if (this.props.isRegister) {
      Api.getRegisterCode(options).then(() => {
        this.successGetCode();
      }).catch(err => Tips.show(err.message));
    } else {
      Api.getForgetCode(options, chosedExchange.tradUrl).then(() => {
        this.successGetCode();
      }).catch(err => Tips.show(err.message));
    }
  };

  submit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const isSubmit = this.state.isAccountNotEmpty && this.state.isCodeNotEmpty
      && this.state.isPassWordNotEmpty && this.state.isPassWord2NotEmpty && this.state.isAgreement;
    if (!isSubmit) return;
    let options;
    const { chosedExchange } = this.state;
    const btn = document.getElementById('code-btn');
    if (this.props.isRegister) {
      options = {
        deptId: this.props.deptId,
        mobile: this.account.value,
        valiCode: this.code.value,
        password: this.password.value,
        fromOpenId: this.props.fromOpenId,
        brokerId: this.props.brokerId,
        channelType: 'app',
      };
    } else {
      options = {
        orgId: chosedExchange.orgId,
        mobile: this.account.value,
        newPwdOne: this.password.value,
        valiCode: this.code.value,
      };
    }
    const isAccountPass = check.account.validate(options.mobile);
    const isCodePass = check.code.validate(options.valiCode);
    const isPasswordPass = check.password.validate(this.password.value);
    const isPassword2Pass = check.repassword.validate(this.password2.value);
    if (isAccountPass !== true) {
      Tips.show(isAccountPass);
      return;
    }
    if (isCodePass !== true) {
      Tips.show(isCodePass);
      return;
    }
    if (isPasswordPass !== true) {
      Tips.show(isPasswordPass);
      return;
    }
    if (isPassword2Pass !== true) {
      Tips.show(isPassword2Pass);
      return;
    }
    if (this.props.isRegister) {
      Api.register(options).then((json) => {
        btn.removeAttribute('disabled');
        const flag = Boolean(this.props.brokerId);
        if (flag) {
          const url = this.downLoadUrl;
          Tips.show(json.message);
          window.location.href = url;
        } else {
          Dialog.show('', <RegisterSuccess mobile={options.mobile} password={options.password} />);
        }
      }).catch(err => Tips.show(err.message));
    } else {
      Api.forgetPassword(options, chosedExchange.tradUrl).then((json) => {
        btn.removeAttribute('disabled');
        Tips.show(json.message);
        callNative(window.executeNative, { command: `${APP_COMMAND.msg}reset-password-success` });
      }).catch(err => Tips.show(err.message));
    }
  };

  render() {
    const isSubmit = this.state.isAccountNotEmpty && this.state.isCodeNotEmpty
      && this.state.isPassWordNotEmpty && this.state.isPassWord2NotEmpty && this.state.isAgreement;
    return (
      <div
        styleName="register-box" ref={(ref) => {
          this.box = ref;
        }}
      >
        <div styleName="register">
          <form styleName="form" autoComplete="off">
            <div styleName="account">
              <label htmlFor="account">
                <input
                  type="tel" id="account"
                  styleName="icon icon-phone" placeholder="请输入手机号码" maxLength="15"
                  ref={(ref) => {
                    this.account = ref;
                  }}
                  autoFocus="autofocus"
                  onChange={this.checke}
                />
                <button
                  type="button"
                  id="code-btn"
                  styleName="code-btn"
                  onClick={this.registerGetCode}
                >获取验证码
                </button>
              </label>
            </div>
            <div styleName="code">
              <label htmlFor="code">
                <input
                  type="tel" id="code"
                  styleName="icon icon-code" placeholder="请输入验证码" maxLength="4"
                  ref={(ref) => {
                    this.code = ref;
                  }}
                  autoComplete="off"
                  onChange={this.checke}
                />
              </label>
            </div>
            <div styleName="password">
              <label htmlFor="password">
                <input
                  type="password"
                  id="password"
                  styleName="icon icon-pwd"
                  placeholder="请输入密码"
                  maxLength="12"
                  ref={(ref) => {
                    this.password = ref;
                  }}
                  autoComplete="off"
                  onChange={this.checke}
                />
              </label>
            </div>
            <div styleName="password">
              <label htmlFor="password2">
                <input
                  type="password"
                  id="password2"
                  styleName="icon icon-pwd2"
                  placeholder="请再次输入密码"
                  maxLength="12"
                  ref={(ref) => {
                    this.password2 = ref;
                  }}
                  autoComplete="off"
                  onChange={this.checke}
                />
              </label>
            </div>
            {this.props.isRegister ?
              <div styleName="agreement">
                <div
                  styleName={`icon ${this.state.isAgreement ? 'icon-agree' : 'icon-no-agree'}`}
                  id="agreement" onClick={this.checke}
                />
                <div styleName="no-bottom-line">
                  我已阅读并同意<span styleName="text" onClick={this.agreeMent}>《用户协议书》</span>
                </div>
              </div> : null}
            <div styleName="submit">
              <input
                type="submit"
                styleName={`submit-btn ${isSubmit ? 'pass' : 'no-pass'} ${this.props.isRegister ? '' : 'margin-top20'}`}
                value={this.props.isRegister ? '注册' : '确定'}
                onClick={this.submit}
              />
            </div>
            {this.props.isRegister ?
              <div
                styleName="tips"
                dangerouslySetInnerHTML={{ __html: this.state.tipsText.replace(/(\d+)/g, '<span>$1</span>') }}
              /> : null}
          </form>
        </div>
        <Agreement deptId={this.props.deptId} />
      </div>
    );
  }
}
