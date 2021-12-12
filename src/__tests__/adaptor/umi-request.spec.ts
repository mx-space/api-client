import { umiAdaptor } from '~/adaptor/umi-request'
import { testAdaptor } from '../helpers/adaptor-test'
describe('test umi-request adaptor', () => {
  testAdaptor(umiAdaptor)
})
