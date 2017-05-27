/**
 * Created by admin on 2017/2/6.
 */
import ReactDOM from 'react-dom';
import cookie from 'cookie';
import Api from './api';

export function insertComponent(component) {
  const el = document.createElement('div');
  document.body.appendChild(el);
  ReactDOM.render(component, el);
  return el;
}

export function removeComponentByRef(ref) {
  const p = ref.parentNode;
  ReactDOM.unmountComponentAtNode(p);
  p.parentNode.removeChild(p);
}
export function getQueryString(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = location.search.substr(1).match(reg);
  if (r != null) return unescape(decodeURI(r[2]));
  return null;
}
export function removeWrap() {
  const wrap = document.getElementById('wrap');
  wrap.parentNode.parentNode.removeChild(wrap.parentNode);
}

export function getFileName() {
  const pathname = window.location.pathname;
  const last = pathname.lastIndexOf('.');
  const start = pathname.lastIndexOf('/') + 1;
  const filename = pathname.substring(last, start);
  return filename;
}
// cookie处理
export class Cookie {
  static setCookie(name, val, option) {
    const v = (typeof val === 'string') ? val : JSON.stringify(val);
    document.cookie = cookie.serialize(name, v, option);
  }

  static getCookie(cName) {
    const p = cookie.parse(document.cookie);
    if (cName in p) {
      return p[cName];
    }
    return null;
  }

  static getJSONCookie(cName) {
    return JSON.parse(Cookie.getCookie(cName));
  }

  static deleteCookie(cName) {
    Cookie.setCookie(cName, '', { maxAge: -1 });
  }
}

// 去掉左右两边的空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

// 判断值是否为空
function isEmpty(strValue) {
  if (strValue === null
    || strValue === undefined
    || trim(strValue) === ''
    || trim(strValue).toLowerCase() === 'null'
    || trim(strValue).toLowerCase() === 'undefined') {
    return true;
  }
  return false;
}
// 倒计时
export const timer = (id) => {
  let t = 60;
  const btn = document.getElementById(id);
  btn.setAttribute('disabled', true);
  const timeCount = () => {
    if (t === 0) {
      clearTimeout(timeCount);
      t = 60;
      btn.innerText = '获取验证码';
      btn.removeAttribute('disabled');
    } else {
      if (!btn.getAttribute('disabled')) {
        btn.innerText = '获取验证码';
        clearTimeout(timeCount);
        return;
      }
      t -= 1;
      btn.innerText = `重新获取${t}s`;
      setTimeout(() => {
        timeCount();
      }, 1000);
    }
  };
  return timeCount();
};

// 各种验证
export const check = {
  // 手机号码
  account: {
    reg: /^1[34578]{1}[0-9]{9}$/,
    error: '请输入正确的手机号',
    error_empty: '请输入手机号',
    validate(val) {
      const value = String(val);
      if (isEmpty(value)) return this.error_empty;
      const flag = this.reg.test(trim(value));
      return flag ? true : this.error;
    },
  },
  // 验证码
  code: {
    reg: /^\d{4}$/,
    error: '验证码错误',
    validate(val) {
      const value = String(val);
      const flag = this.reg.test(trim(value));
      return flag ? true : this.error;
    },
  },
  // 密码
  password: {
    storage: null,
    reg: /^\w{6,12}$/,
    error: '密码长度为6~12个字符',
    validate(val) {
      const value = String(val);
      const flag = this.reg.test(trim(value));
      if (flag) {
        this.storage = value;
      }
      return flag ? true : this.error;
    },
  },
  // 密码确认
  repassword: {
    error: '两次密码不一致',
    validate(val) {
      const value = String(val);
      if (value !== check.password.storage) {
        return this.error;
      }
      return true;
    },
  },
  // 旧密码
  passwordOld: {
    reg: /^\w{6,12}$/,
    error: '密码长度为6~12个字符',
    validate(val) {
      const value = String(val);
      const flag = this.reg.test(trim(value));
      return flag ? true : this.error;
    },
  },
};
// 图片加载
export function loadImage(urlArr) {
  urlArr.forEach((item) => {
    const img = new Image();
    img.src = item;
  });
}

// 判断设备
export function getDevice() {
  const UserAgent = navigator.userAgent.toLowerCase();
  if (/ipad/.test(UserAgent)) {
    return 'Ios';
  } else if (/iphone os/.test(UserAgent)) {
    return 'Ios';
  } else if (/android/.test(UserAgent)) {
    return 'android';
  } else if (/windows ce/.test(UserAgent)) {
    return 'Windows CE';
  } else if (/windows mobile/.test(UserAgent)) {
    return 'Windows Mobile';
  } else if (/windows nt 5.0/.test(UserAgent)) {
    return 'Windows 2000';
  } else if (/windows nt 5.1/.test(UserAgent)) {
    return 'Windows XP';
  } else if (/windows nt 6.0/.test(UserAgent)) {
    return 'Windows Vista';
  } else if (/windows nt 6.1/.test(UserAgent)) {
    return 'Windows 7';
  } else if (/windows nt 6.2/.test(UserAgent)) {
    return 'Windows 8';
  } else if (/windows nt 6.3/.test(UserAgent)) {
    return 'Windows 8.1';
  }
  return 'Unknow';
}
export const getChosedExchange = (callback) => {
  const options = {
    deptId: getQueryString('deptId'),
  };
  Api.queryChange(options).then((json) => {
    const exchanges = json.result;
    const exchangeCode = getQueryString('exchangeCode');
    const exchange = exchanges.filter((ex) => ex.exchangeCode === exchangeCode).pop();
    callback(exchange);
  });
};
