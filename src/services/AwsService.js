import BaseService from "./baseService";
import instances from "./axios";

class AwsService extends BaseService {
    controller = "Services"
    async getList(textSearch, page, limit) {
        const response = await instances.get(
            `${this.controller}/Filter?querySearch=${textSearch}&recordsPerPage=${limit}&page=${page}`
        );
        return response.data;
    }
    async InsertByServiceCode(serviceCode, providerId){
        const response = await instances.post(`${this.controller}/ByServiceCode?serviceCOde=${serviceCode}&providerId=${providerId}`)
        return response;
    }
}
export default new AwsService();