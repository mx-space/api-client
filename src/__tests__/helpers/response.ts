import { isEqual } from 'lodash'
import { URLSearchParams } from 'url'
import { spyOn } from 'vitest'

import { axiosAdaptor } from '~/adaptors/axios'

export const buildResponseDataWrapper = (data: any) => ({ data })

export const mockResponse = <T>(
  path: string,
  data: T,
  method = 'get',
  requestBody?: any,
) => {
  const $url = new URL(
    path.startsWith('http')
      ? path
      : `https://example.com/${path.replace(/^\//, '')}`,
  )
  // @ts-ignore
  spyOn(axiosAdaptor, method).mockImplementation(
    // @ts-ignore
    async (_url: string, options: any) => {
      const $_url = new URL(_url)

      if (requestBody) {
        const { data } = options || {}
        if (!isEqual(requestBody, data)) {
          throw new Error(
            `body not equal, got: ${JSON.stringify(
              data,
            )} except: ${JSON.stringify(requestBody)}`,
          )
        }
      }
      if (
        $_url.pathname.endsWith($url.pathname) &&
        ($url.search
          ? isSearchEqual($url.searchParams, $_url.searchParams)
          : true)
      ) {
        return buildResponseDataWrapper(data)
      } else {
        return buildResponseDataWrapper({
          error: 1,
          requestPath: $_url.pathname + $_url.search,
          expectPath: path,
        })
      }
    },
  )

  return data
}

const isSearchEqual = (a: URLSearchParams, b: URLSearchParams) => {
  const keys = Array.from(a.keys()).sort()
  if (keys.toString() !== Array.from(b.keys()).sort().toString()) {
    return false
  }
  return keys.every((key) => {
    const res = a.get(key) === b.get(key)
    if (!res) {
      console.log(
        `key ${key} not equal, receive ${a.get(key)} want ${b.get(key)}`,
      )
    }
    return res
  })
}
