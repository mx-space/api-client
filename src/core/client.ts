import camelcaseKeys from 'camelcase-keys'
import isPlainObject from 'lodash/isPlainObject'
import { IClient } from '~/interfaces/client'
import { RequestInstance, RequestOptions } from '~/interfaces/instance'
import { IRequestHandler, Method } from '~/interfaces/request'
import { PostClient } from './modules/post'

export class HTTPClient {
  private _proxy: IRequestHandler
  // define all clients
  post!: PostClient

  constructor(private _endpoint: string, private _instance: RequestInstance) {
    this._endpoint = _endpoint.replace(/\/*$/, '')
    this._proxy = this.buildRoute(this)()
  }

  public injectClients<T extends { new (client: HTTPClient): IClient }>(
    ...Clients: T[]
  ) {
    for (const Client of Clients) {
      const cl = new Client(this)
      Object.defineProperty(this, cl.name, {
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

  public get(path: string, params?: any) {
    return this._instance.get(this.resolveFullPath(path), {
      params,
    })
  }

  private resolveFullPath(path: string) {
    if (!path.startsWith('/')) {
      path = '/' + path
    }
    return `${this._endpoint}${path}`
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

  private buildRoute(manager: this): () => IRequestHandler {
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
    const that = this

    return () => {
      const route = ['']
      const handler: any = {
        get(target: any, name: Method) {
          if (reflectors.includes(name)) return () => route.join('/')
          if (methods.includes(name)) {
            return async (options: RequestOptions) => {
              const res = await manager.request({
                method: name,
                ...options,
                url: that.resolveFullPath(route.join('/')),
              })

              const data = res.data
              if (!data) {
                return null
              }

              const transform =
                Array.isArray(data) || isPlainObject(data)
                  ? (() => {
                      const transform = camelcaseKeys(data, { deep: true })

                      return {
                        ...transform,
                        get data() {
                          return transform.data ?? transform
                        },
                      }
                    })()
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
          route.push(...args.filter((x: string) => x != null)) // eslint-disable-line eqeqeq
          return new Proxy(noop, handler)
        },
      }

      return new Proxy(noop, handler) as any
    }
  }
}

export function createRestInstance<T extends RequestInstance>(instance: T) {
  return (endpoint: string) => {
    return new HTTPClient(endpoint, instance)
  }
}
