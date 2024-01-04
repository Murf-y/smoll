import { AxiosInstance } from 'axios'
import { createClient } from './client'

/**
 * @interface ApiConfig passed to core api to create a client (axios) instance
 *
 * @enum {AxiosInstance} if the client is passed will be used (allows reuse)
 * @enum {Session} if a session is passed it it will be used to configure a new client
 * @enum {null} if null then a default client is returned
 */
export type ApiParam =  AxiosInstance | null

export class CoreApi {
  client: AxiosInstance
  basePath = import.meta.env.VITE_API_URL

  constructor(param?: ApiParam) {
    // check if property request exists on param
    if (param && 'request' in param) {
      this.client = <AxiosInstance>param
    } else {
      this.client = createClient()
    }
  }
}
