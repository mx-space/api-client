import { allControllers, createClient, HTTPClient, RequestError } from '~/core'
import { IRequestAdapter } from '~/interfaces/instance'
import { createMockServer } from './e2e-mock-server'

export const testAdaptor = (adaptor: IRequestAdapter) => {
  let client: HTTPClient
  const { app, close } = createMockServer()

  afterAll(() => {
    close()
  })
  beforeAll(() => {
    client = createClient(adaptor)('http://localhost:7001')
    client.injectControllers(allControllers)
  })
  test('get', async () => {
    app.get('/posts/1', (req, res) => {
      res.send({
        id: '1',
      })
    })
    const res = await client.post.getPost('1')

    expect(res).toStrictEqual({
      id: '1',
    })
  })

  test('post', async () => {
    app.post('/comments/1', (req, res) => {
      const { body } = req
      res.send({
        ...body,
      })
    })
    const dto = {
      text: 'hello',
      author: 'test',
      mail: '1@ee.com',
    }
    const res = await client.comment.comment('1', dto)

    expect(res).toStrictEqual(dto)
  })

  test('get with search query', async () => {
    app.get('/search/post', (req, res) => {
      if (req.query.keyword) {
        return res.send({ result: 1 })
      }
      res.send(null)
    })

    const res = await client.search.search('post', 'keyword')
    expect(res).toStrictEqual({ result: 1 })
  })

  test('rawResponse rawRequest should defined', async () => {
    app.get('/search/post', (req, res) => {
      if (req.query.keyword) {
        return res.send({ result: 1 })
      }
      res.send(null)
    })

    const res = await client.search.search('post', 'keyword')
    expect(res.$raw).toBeDefined()
    expect(res.$raw.data).toBeDefined()
  })

  it('should error catch', async () => {
    app.get('/error', (req, res) => {
      res.status(500).send({
        message: 'error message',
      })
    })
    await expect(client.proxy.error.get()).rejects.toThrowError(RequestError)
  })
}
