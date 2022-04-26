import type { IController } from './controller'
import type { Class } from './types'

export type ClientOptions = {
  controllers?: Class<IController>[]
}
