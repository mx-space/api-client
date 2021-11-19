import {
  AggregateController,
  CategoryController,
  CommentController,
  NoteController,
  PageController,
  PostController,
  SayController,
  UserController,
} from './controllers'

export class HTTPControllerDefine {
  aggregate!: AggregateController
  category!: CategoryController
  comment!: CommentController
  note!: NoteController
  page!: PageController
  post!: PostController
  say!: SayController
  user!: UserController

  get master() {
    return this.user
  }
}
