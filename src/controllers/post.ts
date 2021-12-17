import { IController } from '~/interfaces/controller'
import { RequestProxyResult } from '~/interfaces/request'
import { PaginateResult } from '~/models/base'
import { PostModel } from '~/models/post'
import { SelectFields } from '~/types/helper'
import { autoBind } from '~/utils/auto-bind'
import { HTTPClient } from '../core/client'

export type PostListOptions = {
  select?: SelectFields<keyof PostModel>
  year?: number
  sortBy?: 'categoryId' | 'title' | 'created' | 'modified'
  sortOrder?: 1 | -1
}

export class PostController implements IController {
  constructor(private client: HTTPClient) {
    autoBind(this)
  }

  base = 'posts'

  name = 'post'

  private get proxy() {
    return this.client.proxy(this.base)
  }

  /**
   * 获取文章列表分页
   * @param page
   * @param perPage
   * @returns
   */
  getList(page = 1, perPage = 10, options: PostListOptions = {}) {
    const { select, sortBy, sortOrder, year } = options
    return this.proxy.get<PaginateResult<PostModel>>({
      params: {
        page,
        size: perPage,
        select: select?.join(' '),
        sortBy,
        sortOrder,
        year,
      },
    })
  }

  /**
   * 根据分类和路径查找文章
   * @param categoryName
   * @param slug
   */
  getPost(categoryName: string, slug: string): RequestProxyResult<PostModel>
  /**
   * 根据 ID 查找文章
   * @param id
   */
  getPost(id: string): RequestProxyResult<PostModel>
  getPost(idOrCategoryName: string, slug?: string): any {
    if (arguments.length == 1) {
      return this.proxy(idOrCategoryName).get<PostModel>()
    } else {
      return this.proxy(idOrCategoryName)(slug).get<PostModel>()
    }
  }

  /**
   * 获取最新的文章
   */
  getLatest() {
    return this.proxy.latest.get<PostModel>()
  }

  /**
   * 点赞
   */
  thumbsUp(id: string) {
    return this.proxy('_thumbs-up').get<void>({ params: { id } })
  }
}
