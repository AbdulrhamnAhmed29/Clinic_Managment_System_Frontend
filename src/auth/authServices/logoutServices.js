import { BaseApi } from "../../apis/baseApi/baseApi.js";
class LogoutServices extends BaseApi {
    constructor() {
        super("auth/logout")
    }
}
export const logout = new LogoutServices()