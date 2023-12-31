import { AxiosRequestConfig } from 'axios'
import { ApiParam, CoreApi } from '../../client'

export interface CrudResponse<T> {
  length: number
  payload: T
  timestamp: number
}

export interface ApiParams {
  [key: string]: string | number | boolean | undefined | ApiParams | ApiParams[]
}


export default class CrudApi<Model, RequestModel> extends CoreApi {
  path = ''
  constructor(param?: ApiParam) {
    super(param)
  }

  setPath(path: string) {
    this.path = `${this.basePath}${path}`
  }



  async find(params?: ApiParams, options?: AxiosRequestConfig): Promise<CrudResponse<Model[]>> {
    return (await this.client.get<CrudResponse<Model[]>>(this.path, { ...options, params: params }))
      .data
  }

  async create(toCreate: RequestModel): Promise<CrudResponse<Model>> {
    return (await this.client.post<CrudResponse<Model>>(`${this.path}`, toCreate)).data
  }

}
