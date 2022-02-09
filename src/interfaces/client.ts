import { IController } from './controller'
import { Class } from './types'

export type ClientOptions = {
  controllers?: Class<IController>[]
}
