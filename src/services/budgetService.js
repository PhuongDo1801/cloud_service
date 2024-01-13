import instances from "./axios";

class budgetServices {
    controller = "AWSBudgets";
    async getBudgets(){
        const response = await instances.get(`${this.controller}/get-budgets`)
        return response;
    }
    async createBudget(data){
        const response = await instances.post(`${this.controller}/create-budget`, data);
        return response;
    }
    async updateBudget(budgetName, data){
        const response = await instances.put(`${this.controller}/update-budget/${budgetName}`, data);
        return response;
    }
    async deleteBudget(budgetName){
        const response = await instances.delete(`${this.controller}/delete-budget/${budgetName}`);
        return response;
    }
    async getBudget(budgetName){
        const response = await instances.get(`${this.controller}/get-budget/${budgetName}`);
        return response;
    }
}

export default new budgetServices();