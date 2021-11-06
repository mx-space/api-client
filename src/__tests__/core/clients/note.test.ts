import axios from 'axios'
import { createClient } from '~/core'
import { NoteController } from '~/core/controllers'

jest.mock('axios')
describe('test note client', () => {
  const client = createClient(axios)('https://api.innei.ren/v2')
  client.injectControllers(NoteController)

  it('should get note list', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        data: [],
        pagination: {},
      },
    })

    const data = await client.note.getList()
    expect(data).toEqual({ data: [], pagination: {} })
  })

  it('should get middle list of note', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        data: [
          {
            id: '1',
          },
          {
            id: '2',
          },
        ],
        size: 2,
      },
    })
    const data = await client.note.getMiddleList('1')
    expect(data).toEqual({
      data: [
        {
          id: '1',
        },
        {
          id: '2',
        },
      ],
      size: 2,
    })
  })

  it('should get single note', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        title: '1',
      },
    })

    const data = await client.note.getNoteById('1')

    expect(data).toStrictEqual({ title: '1' })
    expect(data.raw).toBeDefined()
  })

  it('should like note', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: null,
    })

    const data = await client.note.likeIt('1')

    expect(data).toBeNull()
  })
})
