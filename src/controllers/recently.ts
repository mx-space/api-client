import { IController } from '~/interfaces/controller'
import { RecentlyModel } from '~/models/recently'
import { autoBind } from '~/utils/auto-bind'
import { HTTPClient } from '../core'

export class RecentlyController implements IController {
  base = 'recently'
  name = ['recently', 'shorthand']

  constructor(private readonly client: HTTPClient) {
    autoBind(this)
  }

  get proxy() {
    return this.client.proxy(this.base)
  }
  /**
   * 获取最新一条
   */
  getLatestOne() {
    return this.proxy.latest.get<RecentlyModel>()
  }

  getAll() {
    return this.proxy.all.get<{ data: RecentlyModel[] }>()
  }

  getList(
    before?: string | undefined,
    after?: string | undefined,
    size?: number | number,
  ) {
    return this.proxy.get<{ data: RecentlyModel[] }>({
      params: {
        before,
        after,
        size,
      },
    })
  }
}
