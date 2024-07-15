import instances from "./axios";

class AWSPricing {
    controller = "AWSPricing";
    async getPrice(params){
        const response = await instances.get(`${this.controller}/EC2forecast`, { params });
        return response;
    }
}

export default new AWSPricing();