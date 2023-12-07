import BaseService from "./baseService";
import instances from "./axios";

class UserService extends BaseService {
    controller = "Users"

    async Login(data) {
            const response = await instances.post(`${this.controller}/login`, data);
            return response;
    }
    async Register(data) {
            const response = await instances.post(`${this.controller}/register`, data);
            return response;
    }
}

export default new UserService();