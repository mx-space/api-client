import '../helpers/global-fetch'

import { createDefaultKyAdaptor } from '~/adaptors/ky'

import { testAdaptor } from '../helpers/adaptor-test'

describe('test ky adaptor', () => {
  const defaultKyAdaptor = createDefaultKyAdaptor()
  testAdaptor(defaultKyAdaptor)
})
