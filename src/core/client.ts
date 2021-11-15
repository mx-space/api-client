import camelcaseKeys from 'camelcase-keys'
import { IController } from '~/interfaces/controller'
import { IRequestAdapter, RequestOptions } from '~/interfaces/instance'
import { IRequestHandler, Method } from '~/interfaces/request'
import { isPlainObject } from '~/utils'
import { attachRequestMethod } from './attachRequest'
import {
  AggregateController,
  allContollerNames,
  CommentController,
  NoteController,
  PageController,
  PostController,
} from './controllers'
import { SayController } from './controllers/say'
import { RequestError } from './error'

class HTTPControllerModule {
  post!: PostController
  note!: NoteController
  page!: PageController
  comment!: CommentController
  aggregate!: AggregateController
  say!: SayController
}

export class HTTPClient extends HTTPControllerModule {
  private _proxy: IRequestHandler
  // define all clients

  constructor(private _endpoint: string, private _instance: IRequestAdapter) {
    super()
    this._endpoint = _endpoint
      .replace(/\/*$/, '')
      .replace('localhost', '127.0.0.1')
    this._proxy = this.buildRoute(this)()

    this.initGetClient()

    attachRequestMethod(this)
  }

  private initGetClient() {
    const clientsName = allContollerNames

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

  public injectControllers<T extends { new (client: HTTPClient): IController }>(
    ...Controller: T[]
  ): void
  public injectControllers<T extends { new (client: HTTPClient): IController }>(
    Controller: T[],
  ): void
  public injectControllers<T extends { new (client: HTTPClient): IController }>(
    Controller: T[],
    ...rest: T[]
  ) {
    Controller = Array.isArray(Controller) ? Controller : [Controller, ...rest]
    for (const Client of Controller) {
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
    return (this as any)['$$' + String(options.method || 'get').toLowerCase()](
      options.url,
      options,
    )
  }

  public get proxy() {
    return this._proxy
  }

  private resolveFullPath(path: string) {
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
  return (endpoint: string) => {
    return new HTTPClient(endpoint, adapter)
  }
}
