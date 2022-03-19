import { testAdaptor } from '../helpers/adaptor-test'
import { axiosAdaptor } from '~/adaptors/axios'

describe('test axios adaptor', () => {
  testAdaptor(axiosAdaptor)
})
