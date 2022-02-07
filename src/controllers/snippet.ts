import { IController } from '~/interfaces/controller'
import { SnippetModel } from '~/models/snippet'
import { autoBind } from '~/utils/auto-bind'
import { HTTPClient } from '../core'

declare module '../core/client' {
  interface HTTPClient {
    snippet: SnippetController
  }
}

export class SnippetController implements IController {
  base = 'snippets'
  name = 'snippet'

  constructor(protected client: HTTPClient) {
    autoBind(this)
  }

  get proxy() {
    return this.client.proxy(this.base)
  }

  getById<T = unknown>(id: string) {
    return this.proxy(id).get<SnippetModel<T>>()
  }

  getByReferenceAndName<T = unknown>(reference: string, name: string) {
    return this.proxy(reference)(name).get<T>()
  }
}
