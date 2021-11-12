import axios from 'axios'
import { createClient } from '~/core'
import { PostController } from '~/core/controllers'
import { mockResponse } from '~/__tests__/helpers/response'

jest.mock('axios')
describe('test post client', () => {
  const client = createClient(axios)('https://api.innei.ren/v2')
  client.injectControllers(PostController)

  it('should get post list', async () => {
    mockResponse('/posts', { data: [] })

    const data = await client.post.getList()
    expect(data).toEqual({ data: [] })
  })

  it('should get latest post', async () => {
    mockResponse('/posts/latest', { title: '1' })
    const data = await client.post.getLatest()
    expect(data.title).toBe('1')
  })

  it('should get single post by id', async () => {
    mockResponse('/posts/613c91d0326cfffc61923ea2', {
      title: '1',
    })

    const data = await client.post.getPost('613c91d0326cfffc61923ea2')

    expect(data).toStrictEqual({ title: '1' })
    expect(data.raw).toBeDefined()
  })

  it('should get single post by slug and category', async () => {
    mockResponse('/posts/website/host-an-entire-Mix-Space-using-Docker', {
      title: '1',
    })

    const data = await client.post.getPost(
      'website',
      'host-an-entire-Mix-Space-using-Docker',
    )

    expect(data).toStrictEqual({ title: '1' })
    expect(data.raw).toBeDefined()
  })

  it('should thumbs-up post', async () => {
    mockResponse('/posts/_thumbs-up?id=1', null)

    const data = await client.post.thumbsUp('1')

    expect(data).toBeNull()
  })
})
