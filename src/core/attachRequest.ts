import type { HTTPClient } from '.'

export function attachRequestMethod<T extends HTTPClient>(target: T) {
  Object.defineProperty(target, 'get', {
    value: function (url: string, options?: any) {
      // HINT: method get only accept search params;
      const { params = {} } = options
      const qs = handleSearchParams(params)

      return target.instance.get(url + `${qs ? `${'?' + qs}` : ''}`)
    },
  })

  // Object.defineProperty(target, 'post', {
  //   value: function (path: string, options?: any) {
  //     return target.instance.post(resolveFullPath(path), options)
  //   },
  // })
}

function handleSearchParams(obj: any) {
  if (!obj && typeof obj !== 'object') {
    throw new TypeError('params muse be object.')
  }

  const search = new URLSearchParams()

  Object.entries<any>(obj).forEach(([k, v]) => {
    // FIXME: deep level handle
    search.set(k, v)
  })

  return search.toString()
}
