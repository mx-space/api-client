import { LinkModel } from '~/models/link'
import { HTTPClient } from '..'
import { BaseCrudController } from './base'

export class LinkController extends BaseCrudController<LinkModel> {
  constructor(protected readonly client: HTTPClient) {
    super(client)
  }

  name = 'link'
  base = 'links'
}
