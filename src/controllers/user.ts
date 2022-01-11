import { IController } from '~/interfaces/controller'
import { TLogin, UserModel } from '~/models/user'
import { autoBind } from '~/utils/auto-bind'
import { HTTPClient } from '../core'

export class UserController implements IController {
  constructor(private readonly client: HTTPClient) {
    autoBind(this)
  }

  base = 'master'

  name = ['user', 'master']

  public get proxy() {
    return this.client.proxy(this.base)
  }

  getMasterInfo() {
    return this.proxy.get<UserModel>()
  }

  login(username: string, password: string) {
    return this.proxy.login.post<TLogin>({
      data: {
        username,
        password,
      },
    })
  }

  checkTokenValid(token: string) {
    return this.proxy.check_logged.get<{ ok: number; isGuest: boolean }>({
      params: {
        token: 'bearer ' + token.replace(/^Bearer\s/i, ''),
      },
    })
  }
}
