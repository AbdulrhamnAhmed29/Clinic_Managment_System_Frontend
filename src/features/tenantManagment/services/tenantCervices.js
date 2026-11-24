import { BaseApi } from "../../../apis/baseApi/baseApi";

class TenantServices extends BaseApi {
    constructor() {
        super("tenant")
    }
}
export const tenantServices = new TenantServices()