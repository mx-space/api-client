import { BaseModel } from './base'

export enum LinkType {
  Friend,
  Collection,
}

export enum LinkState {
  Pass,
  Audit,
}
export interface LinkModel extends BaseModel {
  name: string
  url: string
  avatar: string
  description?: string
  type: LinkType
  state: LinkState
}
