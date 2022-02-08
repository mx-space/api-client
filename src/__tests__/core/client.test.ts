import { AxiosResponse } from 'axios'
import { axiosAdaptor } from '~/adaptors/axios'
import { umiAdaptor } from '~/adaptors/umi-request'
import {
  allContollerNames,
  allControllers,
  NoteController,
  PostController,
} from '~/controllers'
import { createClient } from '~/core'
import { IRequestAdapter } from '~/interfaces/adapter'

// axios wrapper test
const generateClient = <
  Response = AxiosResponse<unknown>,
  AdaptorType extends IRequestAdapter = typeof axiosAdaptor,
>(
  adapter?: AdaptorType,
) => createClient(adapter ?? axiosAdaptor)<Response>('http://127.0.0.1:2323')
describe('test client', () => {
  it('should create new client with axios', () => {
    const client = generateClient()
    expect(client).toBeDefined()
  })

  describe('client `get` method', () => {
    afterEach(() => {
      jest.resetAllMocks()
    })
    test('case 1', async () => {
      jest.spyOn(axiosAdaptor, 'get').mockImplementation((url, config) => {
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
      jest.spyOn(axiosAdaptor, 'get').mockImplementation((url, config) => {
        if (url === 'http://127.0.0.1:2323/a/a') {
          return Promise.resolve({ data: { ok: 1 } })
        }

        return Promise.resolve({ data: null })
      })

      const client = generateClient()
      const data = await client.proxy.a.a.get()

      expect(data).toStrictEqual({ ok: 1 })

      {
        jest.spyOn(axiosAdaptor, 'get').mockImplementation((url, config) => {
          if (url === 'http://127.0.0.1:2323/a/b') {
            return Promise.resolve({ data: { ok: 1 } })
          }

          return Promise.resolve({ data: null })
        })

        const client = generateClient()
        const data = await client.proxy.a.b.get()

        expect(data).toStrictEqual({ ok: 1 })
      }
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

  it('should inject multi client worked', () => {
    const client = generateClient()

    client.injectControllers(PostController, NoteController)
    expect(client.post.name).toBeDefined()
    expect(client.note.name).toBeDefined()
  })

  it('should inject controller when init', () => {
    const client = createClient(axiosAdaptor)('http://127.0.0.1:2323', {
      controllers: [PostController, NoteController],
    })
    expect(client.post.name).toBeDefined()
    expect(client.note.name).toBeDefined()
  })

  it('should infer response wrapper type', async () => {
    const client = generateClient<AxiosResponse>(axiosAdaptor)
    client.injectControllers(PostController)
    jest.spyOn(axiosAdaptor, 'get').mockImplementation((url, config) => {
      if (url === 'http://127.0.0.1:2323/posts/latest') {
        return Promise.resolve({ data: { ok: 1 }, status: 200 })
      }

      return Promise.resolve({ data: null })
    })

    const data = await client.post.getLatest()

    expect(data.$raw.status).toBe(200)
  })

  it('should infer axios instance type', async () => {
    const client = generateClient<AxiosResponse>(axiosAdaptor)
    jest.spyOn(axiosAdaptor, 'get').mockImplementation((url, config) => {
      if (url === 'http://127.0.0.1:2323/a') {
        return Promise.resolve({ data: { ok: 1 }, status: 200 })
      }

      return Promise.resolve({ data: null })
    })
    expect(client.instance.default).toBe(axiosAdaptor.default)
    const res = await client.proxy.a.get()
    expect(res.$raw.status).toBe(200)

    {
      jest.spyOn(umiAdaptor, 'get').mockImplementation((url, config) => {
        if (url === 'http://127.0.0.1:2323/a') {
          return Promise.resolve({
            data: { ok: 1 },
            response: { status: 200, body: {} },
          })
        }

        return Promise.resolve({ data: null })
      })
      const client2 = createClient(umiAdaptor)('http://127.0.0.1:2323')
      expect(client2.instance.default).toBe(umiAdaptor.default)
      const res = await client2.proxy.a.get()
      expect(res.$raw.response.status).toBe(200)
      expect(res.$raw.response.body).toStrictEqual({})
    }
  })

  it('should resolve joint path call toString()', () => {
    const client = generateClient()
    {
      const path = client.proxy.foo.bar.toString()
      expect(path).toBe('/foo/bar')
    }

    {
      const path = client.proxy.foo.bar.toString(true)
      expect(path).toBe('http://127.0.0.1:2323/foo/bar')
    }
  })

  it('should do not json convert case if payload is string or other primitive type', async () => {
    const client = generateClient<AxiosResponse>(axiosAdaptor)
    jest.spyOn(axiosAdaptor, 'get').mockImplementation((url, config) => {
      if (url === 'http://127.0.0.1:2323/a') {
        return Promise.resolve({ data: 'foo', status: 200 })
      }

      return Promise.resolve({ data: null })
    })

    const data = await client.proxy.a.get()
    expect(data).toBe('foo')
  })
})
