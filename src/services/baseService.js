// import instances from "./axios";
class BaseService {
    controller = "";
    getController(){
        return this.controller;
    }
    // async getAll() {
    //     const res = await instances.get(this.getController());
    //     return res.data;
    // }
}

export default BaseService;