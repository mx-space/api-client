import { IController } from '~/interfaces/controller'
import { PaginateResult } from '~/models/base'
import { PageModel } from '~/models/page'
import { HTTPClient } from '..'

export class PageController implements IController {
  constructor(private readonly client: HTTPClient) {}
  base = 'pages'
  name = 'page'
  get proxy() {
    return this.client.proxy(this.base)
  }
  /**
   * 页面列表
   */
  getList(page = 1, perPage = 10) {
    return this.proxy.get<PaginateResult<PageModel>>({
      params: { page, size: perPage },
    })
  }

  /**
   * 页面详情
   */
  getById(id: string) {
    return this.proxy(id).get<PageModel>()
  }
  /**
   * 根据路径获取页面
   * @param slug 路径
   * @returns
   */
  getBySlug(slug: string) {
    return this.proxy.slug(slug).get<PageModel>({})
  }
}
