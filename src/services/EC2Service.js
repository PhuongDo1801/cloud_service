import instances from "./axios";

class EC2Service {
    controller = "EC2instances"
    async getInstancesList(){
        const res = await instances.get(`${this.controller}`)
        return res;
    }
    async startInstance(item){
        const res = await instances.post(`${this.controller}/start?instanceId=${item}`)
        return res
    }
    async stopInstance(item){
        const res = await instances.post(`${this.controller}/stop?instanceId=${item}`)
        return res
    }
    async rebootInstance(item){
        const res = await instances.post(`${this.controller}/reboot?instanceId=${item}`)
        return res
    }

}
export default new EC2Service();