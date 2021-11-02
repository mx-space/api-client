import axios from 'axios'
import { createClient } from '~/core'
import { allClientName, allClients, PostClient } from '~/core/clients'

const generateClient = () => createClient(axios)('http://127.0.0.1:2323')
describe('test client', () => {
  it('should create new client with axios', () => {
    const client = generateClient()
    expect(client).toBeDefined()
  })

  it('should throw error if not inject other client', () => {
    const client = generateClient()
    allClientName.forEach((name) => {
      expect(() => (client as any)[name].name).toThrow(
        name.charAt(0).toUpperCase() +
          name.slice(1) +
          ' Client not inject yet, please inject with client.injectClients(...)',
      )
    })
  })

  it('should work if inject client', () => {
    const client = generateClient()

    client.injectClients(allClients)
    allClientName.forEach((name) => {
      expect(() => (client as any)[name].name).toBeDefined()
    })
  })

  it('should inject single client worked', () => {
    const client = generateClient()

    client.injectClients(PostClient)
    expect(client.post.name).toBeDefined()
  })
})
