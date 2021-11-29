import { IController } from '~/interfaces/controller'
import { PaginateResult } from '~/models/base'
import { PageModel } from '~/models/page'
import { SelectFields } from '~/types/helper'
import { HTTPClient } from '..'

export type PageListOptions = {
  select?: SelectFields<keyof PageModel>
  sortBy?: 'order' | 'subtitle' | 'title' | 'created' | 'modified'
  sortOrder?: 1 | -1
}

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
  getList(page = 1, perPage = 10, options: PageListOptions = {}) {
    const { select, sortBy, sortOrder } = options
    return this.proxy.get<PaginateResult<PageModel>>({
      params: {
        page,
        size: perPage,
        select: select?.join(' '),
        sortBy,
        sortOrder,
      },
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
