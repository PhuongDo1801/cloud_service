import instances from "./axios";

class ActivityLogService {
    controller = "ActivityLog"
    async getLogById(id) {
        const res = await instances.get(`${this.controller}/GetLog`, {
            params: { id }
        });
        return res;
    }
    async insertLog(data) {
        const res = await instances.post(`${this.controller}`, data);
        return res;
    }


}
export default new ActivityLogService();