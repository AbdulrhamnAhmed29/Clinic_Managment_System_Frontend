import api from "../axiosConfig/axiosConfig"
import type { AxiosRequestConfig } from "axios"
export class BaseApi<T> {
    protected endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    // Get All Data
    public async getAll<R = T[]>(params?: AxiosRequestConfig): Promise<R> {
        const res = await api.get(this.endpoint, params);
        return res.data
    }
    // Get One By Id
    public async getById<R = T>(id: string, config?: AxiosRequestConfig): Promise<R> {
        const res = await api.get(`${this.endpoint}/${id}`, config)
        return res.data
    }

    public async create<D = Partial<T>, R = T>(data: D): Promise<R> {
        const res = await api.post(this.endpoint, data);
        return res.data
    }
    public async update<D = Partial<T>, R = T>(id: string, data: D): Promise<R> {
        const res = await api.patch(`${this.endpoint}/${id}`, data);
        return res.data
    }
    public async delete<R = T>(id: string): Promise<R> {
        const res = await api.delete(`${this.endpoint}/${id}`);
        return res.data
    }
}