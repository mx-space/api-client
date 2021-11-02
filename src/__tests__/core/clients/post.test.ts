import axios from 'axios'
import { createClient } from '~/core'
import { PostClient } from '~/core/clients'

jest.mock('axios')
describe('test post client', () => {
  const client = createClient(axios)('https://api.innei.ren/v2')
  client.injectClients(PostClient)

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
})
