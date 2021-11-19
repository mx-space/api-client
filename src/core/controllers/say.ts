import { IController } from '~/interfaces/controller'
import { SayModel } from '~/models/say'
import { HTTPClient } from '..'
import { BaseCrudController } from './base'

export class SayController
  extends BaseCrudController<SayModel>
  implements IController
{
  base = 'says'
  name = 'say'

  constructor(protected client: HTTPClient) {
    super(client)
  }

  protected get proxy() {
    return this.client.proxy(this.base)
  }

  /**
   * 获取随机一条
   */
  getRandom() {
    return this.proxy.random.get<{ data: SayModel | null }>()
  }
}