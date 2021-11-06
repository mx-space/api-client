import { IController } from '~/interfaces/controller'
import { PaginateResult } from '~/models/base'
import { NoteModel, NoteWrappedPayload } from '~/models/note'
import { HTTPClient } from '..'

export class NoteController implements IController {
  base = 'notes'
  name = 'note'

  constructor(private client: HTTPClient) {}
  get proxy() {
    return this.client.proxy(this.base)
  }

  /**
   * 最新日记
   */
  getLatest() {
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

  getList(page = 1, perPage = 10) {
    return this.proxy.get<PaginateResult<NoteModel>>({
      params: { page, size: perPage },
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
  likeIt(id: string) {
    return this.proxy.like(id).get<never>()
  }
}
