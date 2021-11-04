import { NoteController, PostController } from '.'

export const allControllers = [NoteController, PostController]

// export const allClientName = allClients.map((c) =>
//   c.name.replace('Client', '').toLowerCase(),
// )
// Why not code like before
// In order to tree shake unnecessary client
export const allContollerNames = ['note', 'post']
