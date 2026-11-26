import { BaseApi } from "../../../apis/baseApi/baseApi";

class CurrantUser extends BaseApi {
    constructor() {
        super("users/auth/me")
    }
}
export const currantUser = new CurrantUser()