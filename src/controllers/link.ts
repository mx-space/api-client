import { HTTPClient } from '../core'
import { BaseCrudController } from './base'
import { IRequestAdapter } from '~/interfaces/adapter'
import { LinkModel } from '~/models/link'
import { autoBind } from '~/utils/auto-bind'

declare module '../core/client' {
  interface HTTPClient<
    T extends IRequestAdapter = IRequestAdapter,
    ResponseWrapper = unknown,
  > {
    link: LinkController<ResponseWrapper>
    friend: LinkController<ResponseWrapper>
  }
}

export class LinkController<ResponseWrapper> extends BaseCrudController<
  LinkModel,
  ResponseWrapper
> {
  constructor(protected readonly client: HTTPClient) {
    super(client)
    autoBind(this)
  }

  name = ['link', 'friend']
  base = 'links'
}
