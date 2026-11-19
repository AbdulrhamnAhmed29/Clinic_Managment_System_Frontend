import { BaseApi } from "../../../apis/baseApi/baseApi"

class UserServices extends BaseApi {
    constructor() {
        super("users")
    }

}
export const userServices = new UserServices()