import { BaseModel } from './base'

enum LinkType {
  Friend,
  Collection,
}

enum LinkState {
  Pass,
  Audit,
}

export { LinkState, LinkType }
export interface LinkModel extends BaseModel {
  name: string
  url: string
  avatar: string
  description?: string
  type: LinkType
  state: LinkState
  hide: boolean
}
