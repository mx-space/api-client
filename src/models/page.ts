import { TextBaseModel } from './base'

export enum EnumPageType {
  'md' = 'md',
  'html' = 'html',
  'frame' = 'frame',
}
export interface PageModel extends TextBaseModel {
  created: string
  id: string
  /** Slug */
  slug: string

  /** SubTitle */
  subtitle?: string

  /** Order */
  order?: number

  /** Type (MD | html | frame) */
  type?: EnumPageType

  /** Other Options */
  options?: object
}
