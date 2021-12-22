import { IController } from '~/interfaces/controller'
import { SnippetModel } from '~/models/snippet'
import { autoBind } from '~/utils/auto-bind'
import { HTTPClient } from '../core'

export class SnippetController implements IController {
  base = 'snippets'
  name = 'snippet'

  constructor(protected client: HTTPClient) {
    autoBind(this)
  }

  get proxy() {
    return this.client.proxy(this.base)
  }

  getById<T>(id: string) {
    return this.proxy(id).get<SnippetModel<T>>()
  }

  getByReferenceAndName<T>(reference: string, name: string) {
    return this.proxy(reference)(name).get<SnippetModel<T>>()
  }
}
