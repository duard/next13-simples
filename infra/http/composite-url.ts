import { injectable } from 'inversify'

import { CompositeUrl as CompositeUrlProtocol, PathVariable, Query } from '@/data/protocols/http'

const defaultBaseUrl = process.env.BASE_URL ?? 'https://pokeapi.co/api/v2'

@injectable()
export class CompositeUrl implements CompositeUrlProtocol {
  constructor(private readonly baseUrl: string = defaultBaseUrl) {}

  execute(path: string, variables?: PathVariable | null, query?: Query): string {
    const appliedPath = this.applyVariables(path, variables)
    const url = new URL(this.baseUrl + appliedPath)
    return this.applyQuery(url, query).toString()
  }

  applyVariables(path: string, variables?: PathVariable | null): string {
    if (variables) {
      Object.entries(variables).forEach(([key, value]) => {
        path = path.replace(`:${key}`, String(value))
      })
    }
    return path
  }

  applyQuery(url: URL, query?: Query): URL {
    if (query) {
      this.appendQueryToUrl(url, query)
    }
    return url
  }

  appendQueryToUrl(url: URL, query: Query): URL {
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }
    return url
  }
}
