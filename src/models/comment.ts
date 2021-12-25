import { BaseModel } from './base'
import { CategoryModel } from './category'

export enum RefType {
  Page = 'Page',
  Post = 'Post',
  Note = 'Note',
}
export interface CommentModel extends BaseModel {
  refType: RefType
  state: number
  comments_index: number
  author: string
  text: string
  mail?: string
  url?: string
  ip?: string
  agent?: string
  key: string

  avatar: string
  parent?: CommentModel | string
  children: CommentModel[]
}
export interface CommentRef {
  id: string
  categoryId?: string
  slug: string
  title: string
  category?: CategoryModel
}

export enum CommentState {
  Unread,
  Read,
  Junk,
}
