import { AggregateController } from './aggregate'
import { CommentController } from './comment'
import { NoteController } from './note'
import { PageController } from './page'
import { PostController } from './post'
import { SayController } from './say'

export const allControllers = [
  AggregateController,
  CommentController,
  NoteController,
  PageController,
  PostController,
  SayController,
]

// export const allClientName = allClients.map((c) =>
//   c.name.replace('Client', '').toLowerCase(),
// )
// Why not code like before
// In order to tree shake unnecessary client
export const allContollerNames = [
  'aggregate',
  'comment',
  'note',
  'page',
  'post',
  'say',
]

export {
  AggregateController,
  CommentController,
  NoteController,
  PageController,
  PostController,
  SayController,
}
