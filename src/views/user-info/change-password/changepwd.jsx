import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './changepwd.scss';
import Api from '../../../server/api';
import { check, getQueryString, getChosedExchange } from '../../../server/tool';
import { callNative } from '../../../ultils/helper';
import Tips from '../../../components/tips';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class Changepwd extends Component {
  static propTypes = {
    deptId: PropTypes.string,
    sessionId: PropTypes.string,
    exchangeCode: PropTypes.string,
  };

  static defaultProps = {
    sessionId: getQueryString('sessionId'),
    deptId: getQueryString('deptId'),
    exchangeCode: getQueryString('exchangeCode'),
  };

  constructor(props) {
    super(props);
    this.state = {
      isOldPwdNotEmpty: false,
      isPassWordNotEmpty: false,
      isPassWord2NotEmpty: false,
      chosedExchange: {},
    };
  }

  componentWillMount() {
    getChosedExchange((exchange) => {
      this.setState({
        chosedExchange: exchange,
      });
    });
  }

  checke = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const val = e.target.value;
    const id = e.target.getAttribute('id');
    const notEmpty = /\S/;
    switch (id) {
      case 'old-password':
        if (notEmpty.test(val)) {
          this.setState({
            isOldPwdNotEmpty: true,
          });
        } else {
          this.setState({
            isOldPwdNotEmpty: false,
          });
        }
        break;
      case 'pwd':
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
        break;
      default:
        return false;
    }
    return false;
  };

  submit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const isSubmit = this.state.isOldPwdNotEmpty && this.state.isPassWordNotEmpty
      && this.state.isPassWord2NotEmpty;
    if (!isSubmit) return;
    const { chosedExchange } = this.state;
    const options = {
      sessionId: this.props.sessionId,
      oldPwd: this.oldPassword.value,
      newPwdOne: this.password.value,
    };
    const isPasswordOldPass = check.passwordOld.validate(this.oldPassword.value);
    const isPasswordPass = check.password.validate(this.password.value);
    const isPassword2Pass = check.repassword.validate(this.password2.value);
    if (isPasswordOldPass !== true) {
      Tips.show(isPasswordOldPass);
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
    Api.resetPassword(options, chosedExchange.tradUrl).then((json) => {
      Tips.show(json.message);
      callNative(window.executeNative, {
        command: `${APP_COMMAND.msg}modify-password-success`,
      });
    }).catch(err => Tips.show(err.message));
  };

  render() {
    const isSubmit = this.state.isOldPwdNotEmpty && this.state.isPassWordNotEmpty && this.state.isPassWord2NotEmpty;
    return (
      <div>
        <form styleName="form" >
          <div styleName="password">
            <label htmlFor="password">
              <span styleName="">旧密码</span>
              <input
                type="password"
                id="old-password"
                placeholder="请输入旧密码"
                maxLength="12"
                ref={(ref) => {
                  this.oldPassword = ref;
                }}
                onChange={this.checke}
              />
            </label>
          </div>
          <div styleName="password">
            <label htmlFor="password">
              <span styleName="">新密码</span>
              <input
                type="password"
                id="pwd"
                placeholder="请输入密码"
                maxLength="12"
                ref={(ref) => {
                  this.password = ref;
                }}
                onChange={this.checke}
              />
            </label>
          </div>
          <div styleName="password">
            <label htmlFor="password">
              <span styleName="">确认密码</span>
              <input
                type="password"
                id="password2"
                placeholder="请再次输入密码"
                maxLength="12"
                ref={(ref) => {
                  this.password2 = ref;
                }}
                onChange={this.checke}
              />
            </label>
          </div>
          <div styleName="submit">
            <input
              type="submit"
              styleName={`submit-btn ${isSubmit ? 'pass' : 'no-pass'} margin-top20`}
              value="提交"
              onClick={this.submit}
            />
          </div>
        </form>
      </div>
    );
  }
}
