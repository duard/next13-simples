import axios, { AxiosError, AxiosResponse } from 'axios'
import { injectable } from 'inversify'

import { HttpRequest, HttpResponse, HttpClient } from '@/data/protocols/http'

@injectable()
export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
      })
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        axiosResponse = error.response
      } else {
        throw error
      }
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    }
  }
}
