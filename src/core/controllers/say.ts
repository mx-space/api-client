import { IController } from '~/interfaces/controller'
import { IRequestHandler } from '~/interfaces/request'
import { SayModel } from '~/models/say'
import { HTTPClient } from '..'

class BaseCrudController<T> {
  proxy!: IRequestHandler
  getById(id: string) {
    return this.proxy(id).get<T>()
  }
}
// @ts-expect-error
export class SayController
  extends BaseCrudController<SayModel>
  implements IController
{
  base = 'says'
  name = 'say'

  constructor(private client: HTTPClient) {
    super()
  }
  // @ts-expect-error
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
