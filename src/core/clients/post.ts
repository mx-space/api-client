import { IClient } from '~/interfaces/client'
import { RequestProxyResult } from '~/interfaces/request'
import { PostModel, PostResponse } from '~/models/post'
import { HTTPClient } from '../client'

export class PostClient implements IClient {
  constructor(private client: HTTPClient) {}

  base = 'posts'

  name = 'post'

  /**
   * 获取文章列表分页
   * @param page
   * @param perPage
   * @returns
   */
  getPosts(page = 1, perPage = 10) {
    return this.client.proxy(this.base).get<PostResponse>({
      params: { page, size: perPage },
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
      return this.client.proxy(this.base)(idOrCategoryName).get<PostModel>()
    } else {
      return this.client
        .proxy(this.base)(idOrCategoryName)(slug)
        .get<PostModel>()
    }
  }
}
