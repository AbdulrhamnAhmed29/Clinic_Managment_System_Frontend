import api from "../axiosConfig/axiosConfig"
export class BaseApi {
    endpoint;
    constructor(endpoint) {
        this.endpoint = endpoint
    }

    // Get All Data
    async getAll(params) {
        const res = await api.get(this.endpoint, params);
        return res.data
    }
    // Get One By Id
    async getById(id, config) {
        const res = await api.get(`${this.endpoint}/${id}`, config)
        return res.data
    }

    async create(data) {
        const res = await api.post(this.endpoint, data);
        return res.data
    }
    async update(id, data) {
        const res = await api.patch(`${this.endpoint}/${id}`, data);
        return res.data
    }
    async delete(id) {
        const res = await api.delete(`${this.endpoint}/${id}`);
        return res.data
    }
    async uploadImage(file) {
        const formData = new FormData();
        formData.append("image", file);
        const res = await api.post(`${this.endpoint}/upload`, formData);
        return res.data;
    }
}