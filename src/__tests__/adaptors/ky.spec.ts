import { kyAdaptor } from '~/adaptors/ky'

import { testAdaptor } from '../helpers/adaptor-test'

describe('test ky adaptor', () => {
  testAdaptor(kyAdaptor)
})
