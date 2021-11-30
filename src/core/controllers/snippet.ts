import { IController } from '~/interfaces/controller'
// organize-imports-ignore
import { IRequestHandler, RequestProxyResult } from '~/interfaces/request'
import { SnippetModel } from '~/models/snippet'
import { HTTPClient } from '..'

export class SnippetController implements IController {
  base = 'snippets'
  name = 'snippet'

  constructor(protected client: HTTPClient) {}

  get proxy(): IRequestHandler {
    return this.client.proxy(this.base)
  }

  getById(id: string) {
    return this.proxy(id).get<SnippetModel>()
  }

  getByReferenceAndName(reference: string, name: string) {
    return this.proxy(reference)(name).get<SnippetModel>()
  }
}
