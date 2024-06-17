import instances from "./axios";

class LambdaService {
    controller = "Lambda"
    async getInstancesList(){
        const res = await instances.get(`${this.controller}/functions`)
        return res;
    }
    async DeleteFunction(functionName){
        const res = await instances.delete(`${this.controller}/functions`,  { functionName })
        return res;
    }

}
export default new LambdaService();