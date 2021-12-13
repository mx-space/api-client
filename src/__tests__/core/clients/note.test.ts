import { axiosAdaptor } from '~/adaptor/axios'
import { RequestError } from '~/core'
import { NoteController } from '~/core/controllers'
import { mockRequestInstance } from '~/__tests__/helpers/instance'
import { mockResponse } from '~/__tests__/helpers/response'

describe('test note client', () => {
  const client = mockRequestInstance(NoteController)

  it('should get note list', async () => {
    mockResponse('/notes', {
      data: [],
      pagination: {},
    })

    const data = await client.note.getList()
    expect(data).toEqual({ data: [], pagination: {} })
  })

  it('should get post list filter filed', async () => {
    const mocked = mockResponse('/notes?page=1&size=1&select=created+title', {
      data: [{}],
    })

    const data = await client.note.getList(1, 1, {
      select: ['created', 'title'],
    })
    expect(data).toEqual(mocked)
  })

  it('should get latest note', async () => {
    mockResponse('/notes/latest', { data: { title: '1' } })
    const data = await client.note.getLatest()
    expect(data.data.title).toBe('1')
  })

  it('should get middle list of note', async () => {
    mockResponse('/notes/list/1', {
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
    mockResponse('/notes/1', { data: { title: '1' } })

    const data = await client.note.getNoteById('1')

    expect(data.data).toStrictEqual({ title: '1' })
    expect(data.$raw).toBeDefined()
  })

  it('should get note by nid', async () => {
    mockResponse('/notes/nid/1', { data: { title: '1' } })

    const data = await client.note.getNoteById(1)
    expect(data.data.title).toBe('1')
  })

  it('should like note', async () => {
    mockResponse('/notes/like/1', null)

    const data = await client.note.likeIt('1')

    expect(data).toBeNull()
  })

  it('should forbidden if no password provide', async () => {
    jest.spyOn(axiosAdaptor, 'get').mockRejectedValue({
      response: {
        data: {
          message: 'password required',
        },
        status: 403,
      },
    })

    await expect(client.note.getNoteById('1')).rejects.toThrowError(
      RequestError,
    )
  })
})
