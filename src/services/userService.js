import BaseService from "./baseService";
import instances from "./axios";

class UserService extends BaseService {
    controller = "Users"

    async Login(data) {
            const response = await instances.post(`${this.controller}/login`, data);
            if (response.status === 200) {
                
                const token = response.data;

                // Đặt token vào tiêu đề cho các yêu cầu sau này
                this.setAuthorizationHeader(token);
            }
            return response;
    }
    async Register(data) {
            const response = await instances.post(`${this.controller}/register`, data);
            return response;
    }

    async GetInfoUser() {
        const response = await instances.get(`${this.controller}/GetInfoUser`)
        return response
    }
    async getList(textSearch, page, limit) {
        const response = await instances.get(
            `${this.controller}/Filter?querySearch=${textSearch}&recordsPerPage=${limit}&page=${page}`
        );
        return response.data;
    }
    async getUserByEmail(email){
        const response = await instances.get(`${this.controller}/GetByEmail?email=${email}`)
        return response
    }
}

export default new UserService();