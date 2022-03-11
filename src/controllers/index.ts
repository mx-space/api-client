import { AggregateController } from './aggregate'
import { CategoryController } from './category'
import { CommentController } from './comment'
import { LinkController } from './link'
import { NoteController } from './note'
import { PageController } from './page'
import { PostController } from './post'
import { ProjectController } from './project'
import { RecentlyController } from './recently'
import { SayController } from './say'
import { SearchController } from './search'
import { ServerlessController } from './severless'
import { SnippetController } from './snippet'
import { UserController } from './user'

export const allControllers = [
  AggregateController,
  CategoryController,
  CommentController,
  LinkController,
  NoteController,
  PageController,
  PostController,
  ProjectController,
  RecentlyController,
  SayController,
  SearchController,
  SnippetController,
  ServerlessController,
  UserController,
]

export const allContollerNames = [
  'aggregate',
  'category',
  'comment',
  'link',
  'note',
  'page',
  'post',
  'project',
  'recently',
  'say',
  'search',
  'snippet',
  'serverless',
  'user',

  // alias,
  'friend',
  'master',
  'shorthand',
] as const

export {
  AggregateController,
  CategoryController,
  CommentController,
  LinkController,
  NoteController,
  PageController,
  PostController,
  ProjectController,
  RecentlyController,
  SayController,
  SearchController,
  SnippetController,
  ServerlessController,
  UserController,
}
