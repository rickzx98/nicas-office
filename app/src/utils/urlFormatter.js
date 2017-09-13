export function toQueryParam(data) {
  if (data) {
    return '?' + Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
    }).join('&');
  }
  return '';
}
