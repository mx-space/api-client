import { IClient } from '~/interfaces/client'

export class NoteClient implements IClient {
  base = 'notes'
  name = 'note'
}
