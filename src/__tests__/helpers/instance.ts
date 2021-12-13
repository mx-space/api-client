import { axiosAdaptor } from '~/adaptor/axios'
import { createClient, HTTPClient } from '~/core'
import { IController } from '~/interfaces/controller'

export const mockRequestInstance = (
  injectController: new (client: HTTPClient) => IController,
) => {
  const client = createClient(axiosAdaptor)('https://api.innei.ren/v2')
  client.injectControllers(injectController)
  return client
}
