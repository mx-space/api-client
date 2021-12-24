import { TextBaseModel } from './base'

export interface NoteModel extends TextBaseModel {
  id: string
  hide: boolean
  count: {
    read: number
    like: number
  }
  title: string
  text: string
  mood?: string
  weather?: string
  hasMemory?: boolean
  created: string

  secret?: Date
  password?: string | null
  nid: number
  music?: NoteMusicRecord[]
  location?: string

  coordinates?: Coordinate
}

export interface NoteMusicRecord {
  type: string
  id: string
}

export interface Coordinate {
  latitude: number
  longitude: number
}

export interface NoteWrappedPayload {
  data: NoteModel
  next?: Partial<NoteModel>
  prev?: Partial<NoteModel>
}
