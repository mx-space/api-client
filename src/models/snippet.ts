import { BaseModel } from './base'
export enum SnippetType {
  JSON = 'json',
  // Function = 'function',
  Text = 'text',
}
export interface SnippetModel extends BaseModel {
  type: SnippetType
  private: boolean
  raw: string
  name: string
  reference: string
  comment?: string
  metatype?: string
}
