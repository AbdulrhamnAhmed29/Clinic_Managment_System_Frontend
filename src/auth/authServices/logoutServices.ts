import { BaseApi } from "@/apis/baseApi/baseApi";
class LogoutServices extends BaseApi<any> {
    constructor() {
        super("auth/logout")
    }
}
export const logout = new LogoutServices()