import _camelcaseKeys from 'camelcase-keys'

export * from './controllers'
export { createClient, RequestError } from './core'
export type { HTTPClient } from './core'
export * from './models'

// export helper lib
export const camelcaseKeysDeep = <T>(obj: T) => {
  return camelcaseKeys(obj, { deep: true }) as T
}

export const camelcaseKeys = _camelcaseKeys
