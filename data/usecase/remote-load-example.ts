import { UnexpectedError } from "@/domain/errors"
import { LoadExample } from "@/domain/usecases"
import { TYPES } from "@/inversify/types"
import { inject, injectable } from "inversify"

import type { CompositeUrl, HttpClient } from "../protocols/http"

@injectable()
export class RemoteLoadExample implements LoadExample {
  constructor(
    @inject(TYPES.CompositeUrl) private readonly compositeUrl: CompositeUrl,
    @inject(TYPES.HttpClient)
    private readonly httpClient: HttpClient<LoadExample.Result>
  ) {}

  async execute(params: LoadExample.Params): Promise<LoadExample.Model> {
    const offset = (params.page - 1) * params.size
    const limit = params.size
    const httpResponse = await this.httpClient.request({
      url: this.compositeUrl.execute("/pokemon", null, { offset, limit }),
      method: "get",
    })
    if (!httpResponse.body) {
      throw new UnexpectedError()
    }
    return httpResponse.body
  }
}
