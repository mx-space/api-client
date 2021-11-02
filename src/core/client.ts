import camelcaseKeys from 'camelcase-keys'
import { IClient } from '~/interfaces/client'
import { IRequestAdapter, RequestOptions } from '~/interfaces/instance'
import { IRequestHandler, Method } from '~/interfaces/request'
import { isPlainObject } from '~/utils'
import { attachRequestMethod } from './attachRequest'
import { allClientName, NoteClient } from './clients'
import { PostClient } from './clients/post'
import { RequestError } from './error'

export class HTTPClient {
  private _proxy: IRequestHandler
  // define all clients
  post!: PostClient
  note!: NoteClient

  constructor(private _endpoint: string, private _instance: IRequestAdapter) {
    this._endpoint = _endpoint
      .replace(/\/*$/, '')
      .replace('localhost', '127.0.0.1')
    this._proxy = this.buildRoute(this)()

    this.initGetClient()

    attachRequestMethod(this)
  }

  private initGetClient() {
    const clientsName = allClientName

    for (const name of clientsName) {
      Object.defineProperty(this, name, {
        get() {
          const client = Reflect.get(this, `_${name}`)
          if (!client) {
            throw new ReferenceError(
              `${
                name.charAt(0).toUpperCase() + name.slice(1)
              } Client not inject yet, please inject with client.injectClients(...)`,
            )
          }
          return client
        },
        configurable: false,
        enumerable: false,
      })
    }
  }

  public injectClients<T extends { new (client: HTTPClient): IClient }>(
    ...Clients: T[]
  ): void
  public injectClients<T extends { new (client: HTTPClient): IClient }>(
    Clients: T[],
  ): void
  public injectClients<T extends { new (client: HTTPClient): IClient }>(
    Clients: T[],
    ...rest: T[]
  ) {
    Clients = Array.isArray(Clients) ? Clients : [Clients, ...rest]
    for (const Client of Clients) {
      const cl = new Client(this)
      Object.defineProperty(this, `_${cl.name.toLowerCase()}`, {
        get() {
          return cl
        },
        enumerable: false,
        configurable: false,
      })
    }
  }

  get endpoint() {
    return this._endpoint
  }

  get instance() {
    return this._instance
  }

  public request(options: {
    url: string
    method?: string
    data?: any
    params?: any
  }) {
    return (this._instance as any)[
      String(options.method || 'get').toLowerCase()
    ](options.url, options)
  }

  public get proxy() {
    return this._proxy
  }

  public resolveFullPath(path: string) {
    if (!path.startsWith('/')) {
      path = '/' + path
    }
    return `${this.endpoint}${path}`
  }

  private buildRoute(manager: this): () => IRequestHandler {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const noop = () => {}
    const methods = ['get', 'post', 'delete', 'patch', 'put']
    const reflectors = [
      'toString',
      'valueOf',
      'inspect',
      'constructor',
      Symbol.toPrimitive,
      Symbol.for('util.inspect.custom'),
    ]
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this

    return () => {
      const route = ['']

      const handler: any = {
        get(target: any, name: Method) {
          if (reflectors.includes(name)) return () => route.join('/')
          if (methods.includes(name)) {
            return async (options: RequestOptions) => {
              const url = that.resolveFullPath(route.join('/'))
              route.length = 0
              let res: any
              try {
                res = await manager.request({
                  method: name,
                  ...options,
                  url,
                })
              } catch (e: any) {
                throw new RequestError(
                  e.message,
                  e.code ||
                    e.status ||
                    e.statusCode ||
                    e.response?.status ||
                    e.response?.statusCode ||
                    e.response?.code ||
                    500,
                  url,
                  e,
                )
              }

              const data = res.data
              if (!data) {
                return null
              }

              const transform =
                Array.isArray(data) || isPlainObject(data)
                  ? camelcaseKeys(data, { deep: true })
                  : data

              Object.defineProperty(transform, 'raw', {
                get() {
                  return res
                },
                enumerable: false,
                configurable: false,
              })

              return transform
            }
          }
          route.push(name)
          return new Proxy(noop, handler)
        },
        // @ts-ignore
        apply(target: any, _, args) {
          route.push(...args.filter((x: string) => x !== null))
          return new Proxy(noop, handler)
        },
      }

      return new Proxy(noop, handler) as any
    }
  }
}

export function createClient<T extends IRequestAdapter>(adapter: T) {
  // TODO: add support other network lib
  return (endpoint: string) => {
    return new HTTPClient(endpoint, adapter)
  }
}
