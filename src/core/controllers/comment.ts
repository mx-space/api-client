import { IController } from '~/interfaces/controller'
import { PaginationParams } from '~/interfaces/params'
import { PaginateResult } from '~/models/base'
import { CommentModel } from '~/models/comment'
import { HTTPClient } from '..'
import { CommentDto } from '../dtos/comment'

export class CommentController implements IController {
  base = 'comments'
  name = 'comment'

  constructor(private readonly client: HTTPClient) {}

  get proxy() {
    return this.client.proxy(this.base)
  }

  /**
   * 根据 comment id 获取评论, 包括子评论
   */
  getById(id: string) {
    return this.proxy(id).get<CommentModel>()
  }

  /**
   * 获取文章的评论列表
   * @param refId 文章 Id
   */
  getByRefId(refId: string, pagination: PaginationParams = {}) {
    const { page, size } = pagination
    return this.proxy.ref(refId).get<PaginateResult<CommentModel>>({
      params: { page: page || 1, size: size || 10 },
    })
  }
  /**
   * 评论
   */
  comment(refId: string, data: CommentDto) {
    return this.proxy(refId).post<CommentModel>({
      data,
    })
  }

  /**
   * 回复评论
   */
  reply(commentId: string, data: CommentDto) {
    return this.proxy.reply(commentId).post<CommentModel>({
      data,
    })
  }
}
