import { Container } from 'inversify'

import { HttpClient } from '@/data/protocols/http'
import { AxiosHttpClient } from '@/infra/http/axios-http-client'
import { CompositeUrl } from '@/infra/http/composite-url'
import { CompositeUrl as CompositeUrlProtocol } from '@/data/protocols/http'
import { LoadExample, LoadSimplesOne } from '@/domain/usecases'
import { RemoteLoadExample, RemoteLoadSimplesOne } from '@/data/usecase'

import { TYPES } from './types'

const container = new Container()

container.bind<CompositeUrlProtocol>(TYPES.CompositeUrl).to(CompositeUrl)
container.bind<HttpClient<LoadExample.Result>>(TYPES.HttpClient).to(AxiosHttpClient)
container.bind<LoadExample>(TYPES.LoadExample).to(RemoteLoadExample)
container.bind<LoadSimplesOne>(TYPES.LoadSimplesOne).to(RemoteLoadSimplesOne)

export { container }
