import axios from 'axios'

export const buildResponseDataWrapper = (data: any) => ({ data })

export const mockResponse = (url: string, data: any, method = 'get') => {
  // @ts-ignore
  jest.spyOn(axios, method).mockImplementation(async (_url: string) => {
    const $url = new URL(_url)
    if ($url.pathname.endsWith(url)) {
      return buildResponseDataWrapper(data)
    } else {
      return buildResponseDataWrapper({ error: 1, url: _url })
    }
  })
}
