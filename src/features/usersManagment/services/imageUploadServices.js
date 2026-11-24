import { BaseApi } from "../../../apis/baseApi/baseApi"
class UploadServices extends BaseApi {
    constructor() {
        super("users")
    }
}
export const UploadService = new UploadServices()