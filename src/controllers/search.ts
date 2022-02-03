import { IController } from '~/interfaces/controller'
import { IRequestHandler, RequestProxyResult } from '~/interfaces/request'
import { PaginateResult } from '~/models/base'
import { NoteModel } from '~/models/note'
import { PostModel } from '~/models/post'
import { autoBind } from '~/utils/auto-bind'
import { PageModel } from '..'
import { HTTPClient } from '../core'

type SearchType = 'post' | 'note'

type SearchOption = {
  orderBy?: string
  order?: number
  rawAlgolia?: boolean
}
export class SearchController implements IController {
  base = 'search'
  name = 'search'

  constructor(private readonly client: HTTPClient) {
    autoBind(this)
  }

  get proxy(): IRequestHandler {
    return this.client.proxy(this.base)
  }

  search(
    type: 'note',
    keyword: string,
    options?: Omit<SearchOption, 'rawAlgolia'>,
  ): Promise<
    RequestProxyResult<
      PaginateResult<
        Pick<NoteModel, 'modified' | 'id' | 'title' | 'created' | 'nid'>
      >
    >
  >
  search(
    type: 'post',
    keyword: string,
    options?: Omit<SearchOption, 'rawAlgolia'>,
  ): Promise<
    RequestProxyResult<
      PaginateResult<
        Pick<
          PostModel,
          'modified' | 'id' | 'title' | 'created' | 'slug' | 'category'
        >
      >
    >
  >
  search(
    type: SearchType,
    keyword: string,
    options: Omit<SearchOption, 'rawAlgolia'> = {},
  ): any {
    return this.proxy(type).get({
      params: { keyword, ...options },
    })
  }
  /**
   * 从 algolya 搜索
   * https://www.algolia.com/doc/api-reference/api-methods/search/
   * @param keyword
   * @param options
   * @returns
   */
  searchByAlgolia(keyword: string, options?: SearchOption) {
    return this.proxy('algolia').get<
      RequestProxyResult<
        PaginateResult<
          | (Pick<
              PostModel,
              'modified' | 'id' | 'title' | 'created' | 'slug' | 'category'
            > & { type: 'post' })
          | (Pick<
              NoteModel,
              'id' | 'created' | 'id' | 'modified' | 'title' | 'nid'
            > & { type: 'note' })
          | (Pick<
              PageModel,
              'id' | 'title' | 'created' | 'modified' | 'slug'
            > & { type: 'page' })
        > & {
          /**
           * @see: algoliasearch <https://www.algolia.com/doc/api-reference/api-methods/search/>
           */
          raw?: any
        }
      >
    >({ params: { keyword, ...options } })
  }
}
