import instances from "./axios";

class RDSService {
    controller = "RDS"
    async getInstancesList(){
        const res = await instances.get(`${this.controller}/instances`)
        return res;
    }
    async getInstanceDetails(dbInstanceIdentifier) {
        const res = await instances.get(`${this.controller}/instance/${dbInstanceIdentifier}`);
        return res;
      }
    
      async startRDSInstance(dbInstanceIdentifier) {
        const res = await instances.post(`${this.controller}/start`, dbInstanceIdentifier);
        return res;
      }
    
      async stopRDSInstance(dbInstanceIdentifier) {
        const res = await instances.post(`${this.controller}/stop`, dbInstanceIdentifier);
        return res;
      }
    
      async rebootRDSInstance(dbInstanceIdentifier) {
        const res = await instances.post(`${this.controller}/reboot`, dbInstanceIdentifier);
        return res;
      }

}
export default new RDSService();