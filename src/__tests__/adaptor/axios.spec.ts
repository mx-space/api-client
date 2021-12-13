import { axiosAdaptor } from '~/adaptor/axios'
import { testAdaptor } from '../helpers/adaptor-test'

describe('test axios adaptor', () => {
  testAdaptor(axiosAdaptor)
})
