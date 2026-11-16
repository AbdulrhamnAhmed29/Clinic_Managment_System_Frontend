import { BaseApi } from "../../apis/baseApi/baseApi.js";
class LoginServices extends BaseApi {
    constructor() {
        super("auth/login")
    }
}
export const login = new LoginServices()