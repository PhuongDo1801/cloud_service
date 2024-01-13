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
    async GetHistoryCost(startDate, endDate){
        const response = await instances.post(`${this.controller}/history-cost-data?startDate=${startDate}&endDate=${endDate}`)
        return response
    }
    async GetForecastedMonthEndCosts(){
        const response = await instances.get(`${this.controller}/GetForecastedMonthEndCosts`)
        return response
    }
    async GetForecastedCosts(startDate, endDate){
        const response = await instances.post(`${this.controller}/GetForecastedCosts?startDate=${startDate}&endDate=${endDate}`)
        return response
    }
}

export default new AwsCostExplorerService();