import { Class } from '~/types/helper'
import { IController } from './controller'

export type ClientOptions = {
  controllers?: Class<IController>[]
}
