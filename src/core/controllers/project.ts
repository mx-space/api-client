import { ProjectModel } from '~/models/project'
import { autoBind } from '~/utils/auto-bind'
import { HTTPClient } from '..'
import { BaseCrudController } from './base'

export class ProjectController extends BaseCrudController<ProjectModel> {
  constructor(protected readonly client: HTTPClient) {
    super(client)
    autoBind(this)
  }

  base = 'projects'
  name = 'project'
}
