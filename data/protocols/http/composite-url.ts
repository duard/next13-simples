export interface PathVariable {
  [key: string]: string | number | boolean | undefined
}

export interface Query {
  [key: string]: string | number | boolean
}

export interface CompositeUrl {
  execute: (path: string, variables?: PathVariable | null, query?: Query) => string
}
