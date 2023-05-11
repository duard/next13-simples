import { ExamplePaginatedModel } from '../models'

export interface LoadExample {
  execute: (params: LoadExample.Params) => Promise<LoadExample.Model>
}

export namespace LoadExample {
  export type Params = {
    page: number
    size: number
  }

  export type Model = ExamplePaginatedModel
  export type Result = ExamplePaginatedModel
}
