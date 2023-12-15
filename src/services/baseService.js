import instances from "./axios";
class BaseService {
    controller = "";
    getController(){
        return this.controller;
    }
    // async getAll() {
    //     const res = await instances.get(this.getController());
    //     return res.data;
    // }
    setAuthorizationHeader(token) {
        instances.defaults.headers.common['Authorization'] = `bearer ${token}`;
    }
    async create(data) {
        const res = await instances.post(this.getController(), data);
        return res;
    }
    async update(id, data) {
        const res = await instances.put(`${this.getController()}/${id}`, data);
        return res;
    }
    async delete(id) {
        const res = await instances.delete(`${this.getController()}/${id}`);
        return res;
    }
}

export default BaseService;