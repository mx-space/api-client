import { ProjectModel } from '~/models/project'
import { HTTPClient } from '..'
import { BaseCrudController } from './base'

export class ProjectController extends BaseCrudController<ProjectModel> {
  constructor(protected readonly client: HTTPClient) {
    super(client)
  }

  base = 'projects'
  name = 'project'
}
