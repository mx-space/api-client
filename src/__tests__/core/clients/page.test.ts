import axios from 'axios'
import { createClient } from '~/core'
import { PageController } from '~/core/controllers/page'

jest.mock('axios')
describe('test page client', () => {
  const client = createClient(axios)('https://api.innei.ren/v2')
  client.injectControllers(PageController)

  it('should get page list', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        data: [],
        pagination: {},
      },
    })

    const data = await client.page.getList()
    expect(data).toEqual({ data: [], pagination: {} })
  })

  it('should get single page', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        title: '1',
      },
    })

    const data = await client.page.getById('1')

    expect(data).toStrictEqual({ title: '1' })
    expect(data.raw).toBeDefined()
  })
})
