import type { HTTPClient } from '.'

export function attachRequestMethod<T extends HTTPClient>(target: T) {
  const resolveFullPath = target.resolveFullPath

  Object.defineProperty(target, 'get', {
    value: function (path: string, params?: any) {
      return target.instance.get(resolveFullPath(path), {
        params,
      })
    },
  })
}
