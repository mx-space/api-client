import { axiosAdaptor } from '~/adaptors/axios'
import { createClient } from '~/core'
import {
  allContollerNames,
  allControllers,
  NoteController,
  PostController,
} from '~/core/controllers'

// axios wrapper test
const generateClient = () => createClient(axiosAdaptor)('http://127.0.0.1:2323')
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
})
