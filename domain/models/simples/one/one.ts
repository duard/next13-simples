export interface SimplesOneModel {
  name: string
  url: string
}

export interface SimplesOnePaginatedModel {
  results: SimplesOneModel[]
  count: number
  previous: number
  next: string
}
