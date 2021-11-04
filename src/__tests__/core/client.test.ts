import axios from 'axios'
import { createClient } from '~/core'
import {
  allContollerNames,
  allControllers,
  PostController,
} from '~/core/controllers'

// axios wrapper test
const generateClient = () => createClient(axios)('http://127.0.0.1:2323')
describe('test client', () => {
  it('should create new client with axios', () => {
    const client = generateClient()
    expect(client).toBeDefined()
  })

  describe('client `get` method', () => {
    test('case 1', async () => {
      jest.spyOn(axios, 'get').mockImplementation((url, config) => {
        if (url === 'http://127.0.0.1:2323/a/a?foo=bar') {
          return Promise.resolve({ data: { ok: 1 } })
        }

        return Promise.resolve({ data: null })
      })

      const client = generateClient()
      const data = await client.proxy.a.a.get({ params: { foo: 'bar' } })

      expect(data).toStrictEqual({ ok: 1 })
    })

    test('case 2', async () => {
      jest.spyOn(axios, 'get').mockImplementation((url, config) => {
        if (url === 'http://127.0.0.1:2323/a/a') {
          return Promise.resolve({ data: { ok: 1 } })
        }

        return Promise.resolve({ data: null })
      })

      const client = generateClient()
      const data = await client.proxy.a.a.get()

      expect(data).toStrictEqual({ ok: 1 })
    })
  })

  it('should throw error if not inject other client', () => {
    const client = generateClient()
    allContollerNames.forEach((name) => {
      expect(() => (client as any)[name].name).toThrow(
        name.charAt(0).toUpperCase() +
          name.slice(1) +
          ' Client not inject yet, please inject with client.injectClients(...)',
      )
    })
  })

  it('should work if inject client', () => {
    const client = generateClient()

    client.injectControllers(allControllers)
    allContollerNames.forEach((name) => {
      expect(() => (client as any)[name].name).toBeDefined()
    })
  })

  it('should inject single client worked', () => {
    const client = generateClient()

    client.injectControllers(PostController)
    expect(client.post.name).toBeDefined()
  })
})
