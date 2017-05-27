module.exports = {
  "parser": "babel-eslint",
  "rules": {
    "strict": 0,
    "no-console": 0,
    "global-require": 0,
    "jsx-a11y/href-no-hash": 0,
    "react/forbid-prop-types": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    'import/no-dynamic-require': 0,
    'max-len': ["error", 120],
  },
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "globals": {
    "DEBUG":true,
    "BASE_SERVER":true,
    "FEEDBAK_INFO": true,
    "OPERATE_RECORD":true,
    "PRODUCT_DATA":true,
    "QUERY_MSGINFO":true,
    "ONEMSG_VIEW":true,
    "MsgCount": true,
    "REGISTER_URL":true,
    "SHARE_URL":true,
    "HOT_ACTIVITY":true,
    "ACCOUNT_GOLD":true,
    "SHOW_PER":true,
    "APP_COMMAND":true,
    "UN_READ_MESSAGE":true,
    "DEPTCODE":true,
    "OPERATE_RECORD_GOLD": true,
  }
};
