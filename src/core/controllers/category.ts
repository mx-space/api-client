import { IController } from '~/interfaces/controller'
import {
  CategoryType,
  CategoryWithChildrenModel,
  TagModel,
} from '~/models/category'
import { CategoryModel, PostModel } from '~/models/post'
import { destructureData } from '~/utils'
import { HTTPClient } from '..'

export class CategoryController implements IController {
  name = 'category'
  base = 'categories'
  constructor(private client: HTTPClient) {}

  private get proxy() {
    return this.client.proxy(this.base)
  }

  getAllCategories() {
    return this.proxy.get<{ data: CategoryModel[] }>({
      params: {
        type: CategoryType.Category,
      },
    })
  }

  getAllTags() {
    return this.proxy.get<{ data: TagModel[] }>({
      params: {
        type: CategoryType.Tag,
      },
    })
  }

  async getCategoryDetail(id: string): Promise<CategoryWithChildrenModel>
  async getCategoryDetail(
    ids: string[],
  ): Promise<{ data: CategoryWithChildrenModel[] }>
  async getCategoryDetail(ids: string | string[]): Promise<any> {
    if (typeof ids === 'string') {
      const data = await this.proxy.get<{ data: CategoryWithChildrenModel[] }>({
        params: {
          ids: ids,
        },
      })
      return data.data[0]
    } else if (Array.isArray(ids)) {
      return this.proxy.get<{ data: CategoryWithChildrenModel[] }>({
        params: {
          ids: ids.join(','),
        },
      })
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
