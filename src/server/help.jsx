/**
 * Created by admin on 2017/2/6.
 */
import 'fetch-ie8';

function ajax(url, obj) {
  const postData = (typeof obj === 'object') ? JSON.stringify(obj) : obj;
  const postUrl = `${url}`;
  return fetch(postUrl, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: `{"version":1,"params":${postData}}`,
  }).then(res => res.json()).then((rs) => {
    if (parseInt(rs.code, 10) !== 0) {
      console.error(`调用失败! ${JSON.stringify(rs)}`);
      throw new Error(rs.message);
    }
    return rs;
  });
}
function postAjax(options, ajaxUrl = BASE_SERVER.AppUrl) {
  const url = `${ajaxUrl}/${options.pre}/${options.pos}`;
  return ajax(url, options.data, options.name);
}
export default postAjax;
