import { AxiosRequestConfig } from "axios";
import  { ApiParams, CrudApi, CrudResponse } from "../crud/crud.api";

interface Link {
    _id: string
    longUrl: string
    shortUrl: string
    createdAt: string
    updatedAt: string
}

interface LinkRequest {
    longUrl: string
}


export class LinksApi extends CrudApi<Link, LinkRequest> {
    constructor() {
        super()
        this.setPath('/links')
    }

    async getLinkByShortUrl(shortUrl: string, params?: ApiParams, options?: AxiosRequestConfig): Promise<CrudResponse<Link>>{
        return (await this.client.get<CrudResponse<Link>>(this.path + '/' + shortUrl, { params, ...options })).data
    }
}