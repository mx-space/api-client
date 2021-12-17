import {
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
  UserController,
} from '../controllers'

export class HTTPControllerDefine {
  aggregate!: AggregateController
  category!: CategoryController
  comment!: CommentController
  link!: LinkController
  note!: NoteController
  page!: PageController
  post!: PostController
  project!: ProjectController
  recently!: RecentlyController
  say!: SayController
  search!: SearchController
  snippet!: SnippetController
  user!: UserController

  get master() {
    return this.user
  }

  get friend() {
    return this.link
  }

  get shorthand() {
    return this.recently
  }
}
