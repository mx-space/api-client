import { IRequestHandler, RequestProxyResult } from '~/interfaces/request'
import { PaginateResult } from '~/models/base'
import { autoBind } from '~/utils/auto-bind'
import { HTTPClient } from '../core'

export abstract class BaseCrudController<T> {
  base!: string
  constructor(protected client: HTTPClient) {
    autoBind(this)
  }
  protected get proxy(): IRequestHandler {
    return this.client.proxy(this.base)
  }

  getById(id: string): RequestProxyResult<T> {
    return this.proxy(id).get<T>()
  }

  getAll() {
    return this.proxy.all.get<{ data: T[] }>()
  }
  /**
   * 带分页的查询
   * @param page
   * @param perPage
   */
  getAllPaginated(page?: number, perPage?: number) {
    return this.proxy.get<PaginateResult<T>>({
      params: { page, size: perPage },
    })
  }
}