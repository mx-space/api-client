import { ProjectModel } from '~/models/project'
import { autoBind } from '~/utils/auto-bind'
import { HTTPClient } from '../core'
import { BaseCrudController } from './base'

declare module '../core/client' {
  interface HTTPClient {
    project: ProjectController
  }
}

export class ProjectController extends BaseCrudController<ProjectModel> {
  constructor(protected readonly client: HTTPClient) {
    super(client)
    autoBind(this)
  }

  base = 'projects'
  name = 'project'
}
