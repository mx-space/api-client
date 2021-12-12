import { extend } from 'umi-request'
import { IRequestAdapter } from '~/interfaces/instance'
const $http = extend({
  getResponse: true,
  requestType: 'json',
  responseType: 'json',
})

export const umiAdaptor: IRequestAdapter = {
  get(url, options) {
    return $http.get(url, options)
  },
  post(url, options) {
    return $http.post(url, options)
  },
  put(url, options) {
    return $http.put(url, options)
  },
  delete(url, options) {
    return $http.delete(url, options)
  },
  patch(url, options) {
    return $http.patch(url, options)
  },
}
;(umiAdaptor as any).default = $http
