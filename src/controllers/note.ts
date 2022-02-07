import { IController } from '~/interfaces/controller'
import { IRequestHandler, RequestProxyResult } from '~/interfaces/request'
import { PaginateResult } from '~/models/base'
import { NoteModel, NoteWrappedPayload } from '~/models/note'
import { SelectFields } from '~/types/helper'
import { autoBind } from '~/utils/auto-bind'
import { HTTPClient } from '../core/client'

declare module '../core/client' {
  interface HTTPClient {
    note: NoteController
  }
}

export type NoteListOptions = {
  select?: SelectFields<keyof NoteModel>
  year?: number
  sortBy?: 'weather' | 'mood' | 'title' | 'created' | 'modified'
  sortOrder?: 1 | -1
}

export class NoteController implements IController {
  base = 'notes'
  name = 'note'

  constructor(private client: HTTPClient) {
    autoBind(this)
  }
  get proxy(): IRequestHandler {
    return this.client.proxy(this.base)
  }

  /**
   * 最新日记
   */
  getLatest(): RequestProxyResult<NoteWrappedPayload> {
    return this.proxy.latest.get<NoteWrappedPayload>()
  }

  /**
   * 获取一篇日记
   * @param id id | nid
   * @param password 访问密码
   */

  getNoteById(id: string | number, password?: string) {
    if (typeof id === 'number') {
      return this.proxy.nid(id.toString()).get<NoteWrappedPayload>({
        params: { password },
      })
    } else {
      return this.proxy(id).get<NoteWrappedPayload>({ params: { password } })
    }
  }

  /**
   * 日记列表分页
   */

  getList(page = 1, perPage = 10, options: NoteListOptions = {}) {
    const { select, sortBy, sortOrder, year } = options
    return this.proxy.get<PaginateResult<NoteModel>>({
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
   * 获取当前日记的上下各 n / 2 篇日记
   */
  getMiddleList(id: string, size = 5) {
    return this.proxy.list(id).get<{
      data: Pick<NoteModel, 'id' | 'title' | 'nid' | 'created'>[]
      size: number
    }>({
      params: { size },
    })
  }

  /**
   * 喜欢这篇日记
   */
  likeIt(id: string | number) {
    return this.proxy.like(id).get<never>()
  }
}
