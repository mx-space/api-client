import { NoteController, PostController } from '.'
import { CommentController } from './comment'
import { PageController } from './page'

export const allControllers = [
  NoteController,
  PostController,
  PageController,
  CommentController,
]

// export const allClientName = allClients.map((c) =>
//   c.name.replace('Client', '').toLowerCase(),
// )
// Why not code like before
// In order to tree shake unnecessary client
export const allContollerNames = ['note', 'post', 'page', 'comment']
