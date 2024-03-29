import { createClient } from './core'

export * from './controllers'
export { createClient, RequestError } from './core'
export type { HTTPClient } from './core'
export * from './models'
export { camelcaseKeys as simpleCamelcaseKeys } from './utils/camelcase-keys'

export default createClient
