import { Count, Image, TextBaseModel } from './base'
import { CategoryModel } from './category'

export interface PostModel extends TextBaseModel {
  summary?: string
  hide: boolean
  copyright: boolean
  tags: string[]
  count: Count
  text: string
  title: string
  slug: string
  categoryId: string
  images: Image[]
  category: CategoryModel
}
