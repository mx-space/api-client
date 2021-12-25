import { BaseModel, Pager } from './base'

export interface CommentModel extends BaseModel {
  refType: string
  state: number
  children: CommentModel[]
  commentsIndex: number

  author: string
  text: string
  mail: string
  url: string
  ip: string
  agent: string
  key: string
  pid: string

  modified: string
  avatar: string
}

export interface CommentsResponse {
  data: CommentModel[]
  pagination: Pager
}

export enum CommentState {
  Unread,
  Read,
  Junk,
}
