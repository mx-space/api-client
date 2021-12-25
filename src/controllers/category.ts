import { IController } from '~/interfaces/controller'
import { RequestProxyResult, ResponseProxyExtraRaw } from '~/interfaces/request'
import { attachRawFromOneToAnthor, destructureData } from '~/utils'
import { autoBind } from '~/utils/auto-bind'
import { HTTPClient } from '../core/client'
import { RequestError } from '../core/error'
import {
  CategoryEntries,
  CategoryModel,
  CategoryType,
  CategoryWithChildrenModel,
  TagModel,
} from '../models/category'
import { PostModel } from '../models/post'

export class CategoryController implements IController {
  name = 'category'
  base = 'categories'
  constructor(private client: HTTPClient) {
    autoBind(this)
  }

  public get proxy() {
    return this.client.proxy(this.base)
  }

  getAllCategories(): RequestProxyResult<{ data: CategoryModel[] }> {
    return this.proxy.get({
      params: {
        type: CategoryType.Category,
      },
    })
  }

  getAllTags(): RequestProxyResult<{ data: TagModel[] }> {
    return this.proxy.get<{ data: TagModel[] }>({
      params: {
        type: CategoryType.Tag,
      },
    })
  }

  async getCategoryDetail(
    id: string,
  ): Promise<ResponseProxyExtraRaw<CategoryWithChildrenModel>>
  async getCategoryDetail(
    ids: string[],
  ): Promise<ResponseProxyExtraRaw<Map<string, CategoryWithChildrenModel>>>
  async getCategoryDetail(ids: string | string[]): Promise<any> {
    if (typeof ids === 'string') {
      const data = await this.proxy.get<CategoryEntries>({
        params: {
          ids: ids,
        },
      })
      const result = Object.values(data.entries)[0]
      attachRawFromOneToAnthor(data, result)
      return result
    } else if (Array.isArray(ids)) {
      const data = await this.proxy.get<CategoryEntries>({
        params: {
          ids: ids.join(','),
        },
      })
      const entries = data?.entries
      if (!entries) {
        throw new RequestError(
          'data structure error',
          500,
          data.$request.path,
          data,
        )
      }

      const map = new Map<string, CategoryWithChildrenModel>(
        Object.entries(entries).map(([id, value]) => [id.toLowerCase(), value]),
      )

      attachRawFromOneToAnthor(data, map)
      return map
    }
  }

  async getCategoryByIdOrSlug(idOrSlug: string) {
    const res = await this.proxy(idOrSlug).get<CategoryWithChildrenModel>()
    return destructureData(res) as typeof res
  }

  async getTagByName(name: string) {
    const res = await this.proxy(name).get<{
      tag: string
      data: Pick<PostModel, 'id' | 'title' | 'slug' | 'category' | 'created'>[]
    }>({
      params: {
        tag: 1,
      },
    })

    return res
  }
}
