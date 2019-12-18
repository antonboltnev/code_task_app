export const https = 'http://';
export let host = 'localhost';
export let port = ':8090';

if (window.location.hostname === 'localhost') {
  host = 'localhost';
  port = ':8090'
} else if (window.location.hostname === 'csm-test.web.local') {
  host = 'csm-test.web.local';
  port = ':80'
} else if (window.location.hostname === 'csm-etalon.web.local') {
  host = 'csm-etalon.web.local';
  port = ':80'
} else {
  host = 'csm-dev.web.local';
  port = ':80'
}

export const order = 'order';
export const geo = 'geo';
export const contextPath = '/call-center/v2';
export const path = port + contextPath + '/api/';
