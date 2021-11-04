import axios from 'axios'
import { createClient } from '~/core'
import { PostController } from '~/core/controllers'

jest.mock('axios')
describe('test post client', () => {
  const client = createClient(axios)('https://api.innei.ren/v2')
  client.injectControllers(PostController)

  it('should get post list', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        data: [],
      },
    })

    const data = await client.post.getPosts()
    expect(data).toEqual({ data: [] })
  })

  it('should get single post', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        title: '1',
      },
    })

    const data = await client.post.getPost(
      'website',
      'host-an-entire-Mix-Space-using-Docker',
    )

    expect(data).toStrictEqual({ title: '1' })
    expect(data.raw).toBeDefined()
  })

  it('should thumbs-up post', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: null,
    })

    const data = await client.post.thumbsUp('1')

    expect(data).toBeNull()
  })
})
