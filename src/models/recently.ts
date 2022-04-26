import type { BaseModel } from './base'

export interface RecentlyModel extends BaseModel {
  content: string
  project?: string
  language?: string
}
