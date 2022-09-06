import ky from 'ky-universal'
import type { Options, ResponsePromise } from 'ky-universal'

import type { IRequestAdapter } from '~/interfaces/adapter'

const $http = ky.create({})
// TODO post data not only json,
const getDataFromKyResponse = async (response: ResponsePromise) => {
  const res = await response

  const isJsonType = res.headers
    .get('content-type')
    ?.includes('application/json')
  const json = isJsonType ? await res.clone().json() : null

  const result: Awaited<ResponsePromise> & {
    data: any
  } = {
    ...res,
    data: json ?? (await res.clone().text()),
  }
  return result
}

export const kyAdaptor: IRequestAdapter<typeof $http, ResponsePromise> =
  Object.preventExtensions({
    get default() {
      return $http
    },

    responseWrapper: {} as any as ResponsePromise,
    get(url, options) {
      return getDataFromKyResponse($http.get(url, options))
    },
    post(url, options) {
      const data = options.data
      delete options.data
      const kyOptions: Options = {
        ...options,
        json: data,
      }

      return getDataFromKyResponse($http.post(url, kyOptions))
    },
    put(url, options) {
      const data = options.data
      delete options.data
      const kyOptions: Options = {
        ...options,
        json: data,
      }
      return getDataFromKyResponse($http.put(url, kyOptions))
    },

    patch(url, options) {
      const data = options.data
      delete options.data
      const kyOptions: Options = {
        ...options,
        json: data,
      }
      return getDataFromKyResponse($http.patch(url, kyOptions))
    },
    delete(url, options) {
      return getDataFromKyResponse($http.delete(url, options))
    },
  })
