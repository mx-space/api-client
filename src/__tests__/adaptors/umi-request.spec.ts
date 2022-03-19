import { testAdaptor } from '../helpers/adaptor-test'
import { umiAdaptor } from '~/adaptors/umi-request'
describe('test umi-request adaptor', () => {
  testAdaptor(umiAdaptor)
})
