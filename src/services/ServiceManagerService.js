import instances from "./axios";

class ServiceManagerService {
    controller = "ServiceManager"
    async getList(){
        const res = await instances.get(`${this.controller}`);
        return res;
    }
    async insertService(data){
        const res = await instances.post(`${this.controller}`, data);
        return res;
    }
    async updateService(id, data){
        const res = await instances.put(`${this.controller}/${id}`, data);
        return res;
    }
}
export default new ServiceManagerService();