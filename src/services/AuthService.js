import BaseService from "./baseService";
import instances from "./axios";

class AuthService extends BaseService {
    controller = "Auth"

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
}

export default new AuthService();