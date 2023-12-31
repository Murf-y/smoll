import CrudApi from "../crud/crud.api";

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
}