import instances from "./axios";

class AwsCostExplorerService {
    controller = "AWSCostExplorer"
    async GetMonthlyServiceAndCost(){
        const response = await instances.get(`${this.controller}/get-monthly-cost-and-service`)
        return response
    }
    async GetSixMonthCost(){
        const response = await instances.get(`${this.controller}/get-last-six-months-cost`)
        return response
    }
    async GetSixMonthCostAndService(){
        const response = await instances.get(`${this.controller}/get-last-six-months-cost-and-service`)
        return response
    }
}

export default new AwsCostExplorerService();