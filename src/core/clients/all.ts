import { NoteClient, PostClient } from '.'

export const allClients = [NoteClient, PostClient]

// export const allClientName = allClients.map((c) =>
//   c.name.replace('Client', '').toLowerCase(),
// )
// Why not code like before
// In order to tree shake unnecessary client
export const allClientName = ['note', 'post']
