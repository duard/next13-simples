import { SimplesOnePaginatedModel } from '@/domain/models/simples/one/one'

export interface LoadSimplesOne {
  execute: (params: LoadSimplesOne.Params) => Promise<LoadSimplesOne.Model>
}

export namespace LoadSimplesOne {
  export type Params = {
    page: number
    size: number
  }

  export type Model = SimplesOnePaginatedModel
  export type Result = SimplesOnePaginatedModel
}
