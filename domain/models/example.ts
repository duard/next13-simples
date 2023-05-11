export interface ExampleModel {
  name: string
  url: string
}

export interface ExamplePaginatedModel {
  results: ExampleModel[]
  count: number
  previous: number
  next: string
}
