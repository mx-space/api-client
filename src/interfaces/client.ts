import type { IController } from './controller'
import type { Class } from './types'

export type ClientOptions = {
  controllers?: Class<IController>[]
  getCodeMessageFromException?: <T = Error>(
    error: T,
  ) => {
    message?: string | undefined | null
    code?: number | undefined | null
  }
}
