import { IController } from '~/interfaces/controller'
// organize-imports-ignore
import { IRequestHandler, RequestProxyResult } from '~/interfaces/request'
import { RecentlyModel } from '~/models/recently'
import { HTTPClient } from '..'

export class RecentlyController implements IController {
  base = 'recently'
  name = 'recently'

  constructor(private readonly client: HTTPClient) {}

  get proxy(): IRequestHandler {
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
    if (!before && !after) {
      throw new Error('you can only choose `before` or `after`')
    }
    return this.proxy.get<{ data: RecentlyModel[] }>({
      params: {
        before,
        after,
        size,
      },
    })
  }
}
