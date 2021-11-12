import { CommentController } from './comment'
import { NoteController } from './note'
import { PageController } from './page'
import { PostController } from './post'

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

export { NoteController, PostController, PageController, CommentController }
