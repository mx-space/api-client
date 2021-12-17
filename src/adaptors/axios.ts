import axios, { AxiosInstance } from 'axios'
import { IRequestAdapter } from '~/interfaces/instance'
const $http = axios.create({})

// ignore axios `method` declare not assignable to `Method`
export const axiosAdaptor: IRequestAdapter<AxiosInstance> =
  Object.preventExtensions({
    get default() {
      return $http
    },

    get(url, options) {
      // @ts-ignore
      return $http.get(url, options)
    },
    post(url, options) {
      const { data, ...config } = options || {}
      // @ts-ignore
      return $http.post(url, data, config)
    },
    put(url, options) {
      const { data, ...config } = options || {}
      // @ts-ignore
      return $http.put(url, data, config)
    },
    delete(url, options) {
      const { ...config } = options || {}
      // @ts-ignore
      return $http.delete(url, config)
    },
    patch(url, options) {
      const { data, ...config } = options || {}
      // @ts-ignore
      return $http.patch(url, data, config)
    },
  })
