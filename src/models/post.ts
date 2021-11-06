import { Count, Image } from './base'

export interface PostModel {
  commentsIndex: number
  allowComment: boolean
  hide: boolean
  copyright: boolean
  tags: string[]
  count: Count
  id: string
  text: string
  title: string
  slug: string
  categoryId: string
  images: Image[]
  modified: string
  created: string
  category: CategoryModel
}

export interface CategoryModel {
  type: number
  count: number
  id: string
  name: string
  slug: string
  created: Date
  categoryId: string
}
