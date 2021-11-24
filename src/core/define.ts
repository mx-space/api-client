import {
  AggregateController,
  CategoryController,
  CommentController,
  LinkController,
  NoteController,
  PageController,
  PostController,
  RecentlyController,
  SayController,
  UserController,
} from './controllers'

export class HTTPControllerDefine {
  aggregate!: AggregateController
  category!: CategoryController
  comment!: CommentController
  link!: LinkController
  note!: NoteController
  page!: PageController
  post!: PostController
  recently!: RecentlyController
  say!: SayController
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
