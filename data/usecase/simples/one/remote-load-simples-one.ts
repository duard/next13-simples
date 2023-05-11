import { inject, injectable } from 'inversify'

import { LoadSimplesOne } from '@/domain/usecases'
import { TYPES } from '@/inversify/types'
import { UnexpectedError } from '@/domain/errors'

// import { HttpClient } from '@/data/protocols/http'
// import { CompositeUrl } from '@/infra/http'
import type { CompositeUrl, HttpClient } from '../../../protocols/http'

@injectable()
export class RemoteLoadSimplesOne implements LoadSimplesOne {
  constructor(
    @inject(TYPES.CompositeUrl) private readonly compositeUrl: CompositeUrl,
    @inject(TYPES.HttpClient) private readonly httpClient: HttpClient<LoadSimplesOne.Result>,
  ) {}

  async execute(params: LoadSimplesOne.Params): Promise<LoadSimplesOne.Model> {
    const offset = (params.page - 1) * params.size
    const limit = params.size
    const httpResponse = await this.httpClient.request({
      url: this.compositeUrl.execute('/pokemon', null, { offset, limit }),
      method: 'get',
    })
    if (!httpResponse.body) {
      throw new UnexpectedError()
    }
    return httpResponse.body
  }
}
