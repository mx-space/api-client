import { LinkModel } from '~/models/link'
import { autoBind } from '~/utils/auto-bind'
import { HTTPClient } from '../core'
import { BaseCrudController } from './base'

declare module '../core/client' {
  interface HTTPClient {
    link: LinkController
    friend: LinkController
  }
}

export class LinkController extends BaseCrudController<LinkModel> {
  constructor(protected readonly client: HTTPClient) {
    super(client)
    autoBind(this)
  }

  name = ['link', 'friend']
  base = 'links'
}
