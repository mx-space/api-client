import { NoteModel } from './note'
import { PageModel } from './page'
import { CategoryModel, PostModel } from './post'
import { SayModel } from './say'
import { SeoOptionModel } from './setting'
import { UserModel } from './user'

export interface AggregateRoot {
  user: UserModel
  seo: SeoOptionModel
  categories: CategoryModel[]
  pageMeta: Pick<PageModel, 'title' | 'id' | 'slug' | 'order'>[] | null
  lastestNoteNid: number | null
}

export interface AggregateTop {
  notes: Pick<NoteModel, 'id' | 'title' | 'created' | 'nid'>[]
  posts: Pick<PostModel, 'id' | 'slug' | 'created' | 'title' | 'category'>[]
  says: SayModel[]
}

export enum TimelineType {
  Post,
  Note,
}

export interface TimelineData {
  notes?: Pick<
    NoteModel,
    | 'id'
    | 'nid'
    | 'title'
    | 'weather'
    | 'mood'
    | 'created'
    | 'modified'
    | 'hasMemory'
  >[]

  posts?: (Pick<
    PostModel,
    'id' | 'title' | 'slug' | 'created' | 'modified' | 'category'
  > & { url: string })[]
}

export interface AggregateStat {
  allComments: number
  categories: number
  comments: number
  linkApply: number
  links: number
  notes: number
  pages: number
  posts: number
  says: number
  recently: number
  unreadComments: number
  online: number
  todayMaxOnline: string
  todayOnlineTotal: string
  callTime: number
  uv: number
  todayIPAccessCount: number
}
