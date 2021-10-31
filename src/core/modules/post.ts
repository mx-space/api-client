import { IClient } from '~/interfaces/client'
import { RequestProxyResult } from '~/interfaces/request'
import { PostModel, PostResponse } from '~/models/post'
import { HTTPClient } from '../client'

export class PostClient implements IClient {
  constructor(private client: HTTPClient) {}

  base = '/posts'

  name = 'post'
  getPosts(page: number = 1, perPage: number = 10) {
    return this.client
      .proxy(`/${this.base}?page=${page}&size=${perPage}`)
      .get<PostResponse>()
  }

  getPost(categoryName: string, slug: string): RequestProxyResult<PostModel>
  getPost(id: ID): RequestProxyResult<PostModel>
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
