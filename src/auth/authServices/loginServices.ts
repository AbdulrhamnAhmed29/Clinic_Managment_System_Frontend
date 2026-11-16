import { BaseApi } from "@/apis/baseApi/baseApi";
interface formSchema {
    email: string,
}
class LoginServices extends BaseApi<formSchema> {
    constructor() {
        super("auth/login")
    }
}
export const login = new LoginServices()