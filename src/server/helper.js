
import 'fetch-ie8';

function postJSON(url, obj) {
  const newObj = { params: obj };
  const postData = (typeof newObj === 'object') ? JSON.stringify(newObj) : newObj;
  return fetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: postData,
  }).then(res => res.json()).then((rs) => {
    if (rs.code !== 0) {
      console.error(`调用失败! ${JSON.stringify(rs)}`);
    }
    return rs;
  });
}

export default postJSON;

