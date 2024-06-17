<template>
    <div v-show="isLoading" class="background--loading">
        <div class="icon--loading"></div>
    </div>
    <div class="ec2-page-title">
        <span>Service Management</span>
        <!-- <button class="btn" @click="goToActivityLog()">Lịch sử thao tác</button> -->
    </div>
    <div class="ec2-page">
        <div class="ec2-table">
            <table>
                <thead>
                    <tr>
                        <th class="text-align-center" style="min-width: 50px;" type="checkbox">
                            <input type="checkbox" />
                        </th>
                        <th v-for="column in serviceManagerColumn" :key="column.key" :class="column.class"
                            :style="column.style" :title="column.title">
                            {{ column.text }}
                        </th>
                    </tr>
                </thead>
                <tbody class="table__body" v-if="instances.length > 0">
                    <tr v-for="(item, index) in instances" :key="index">
                        <td class="text-align-center" @dblclick.stop="">
                            <input type="checkbox" :checked="showDetail" @change="handleCheckboxChange(item)">
                        </td>
                        <td class="text-align-center">{{ item.ServiceName }}</td>
                        <td class="text-align-center">{{ item.Status }}</td>
                        <td class="text-align-center">
                            <div class="group-btn">
                                <button class="btn btn-start" v-if="item.Status === 0"
                                    @click="enableService(item)">Enable</button>
                                <button class="btn btn-stop" v-if="item.Status === 1"
                                    @click="disableService(item)">Disable</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { serviceManagerColumn } from "@/constains/serviceManagerColumn";
import ServiceManagerService from "@/services/ServiceManagerService";
// import ActivityLogService from "@/services/ActivityLogService";
export default {
    name: 'ServiceManagement',
    data() {
        return {
            instances: [],
            serviceManagerColumn,
            showDetail: false,
            selectedInstance: null,
            isLoading: false,
        }
    },
    created() {
        this.getInstancesList();
    },
    computed: {

    },
    methods: {
        async getInstancesList() {
            try {
                this.isLoading = true;
                const res = await ServiceManagerService.getList();
                // console.log(res);
                this.instances = res.data;
                this.isLoading = false
            }
            catch (error) {
                this.isLoading = false;
                console.log(error);
            }
        },
        handleCheckboxChange(item) {
            this.showDetail = !this.showDetail; // Đảo ngược giá trị showDetail
            this.selectedInstance = this.showDetail ? item : null; // Gán selectedInstance nếu showDetail là true
        },
        async enableService(item) {
            try {
                this.isLoading = true;
                const data = { 
                    // ServiceManagerId: item.ServiceManagerId,
                    ServiceName: item.ServiceName,
                    Status: 1 
                };
                const res = await ServiceManagerService.updateService(item.ServiceManagerId, data);
                console.log(res);
                this.getInstancesList();
                this.isLoading = false;
                alert('Service enabled successfully');
            } catch (error) {
                this.isLoading = false;
                console.log(error);
                alert('Failed to enable service');
            }
        },
        async disableService(item) {
            try {
                this.isLoading = true;
                const data = {
                    ServiceManagerId: item.ServiceManagerId, 
                    ServiceName: item.ServiceName,
                    Status: 0 
                };
                const res = await ServiceManagerService.updateService(item.ServiceManagerId, data);
                console.log(res)
                this.getInstancesList();
                this.isLoading = false;
                alert('Service disabled successfully');
            } catch (error) {
                this.isLoading = false;
                console.log(error);
                alert('Failed to disable service');
            }
        }
    }
}
</script>
<style scoped>
@import url("../../css/components/ec2service.css");


.running-state {
    color: rgba(28, 217, 34, 0.911);
}

.showDetail {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    padding: 16px;
    margin-top: 16px;
    border-radius: 4px;
}

.showDetail p {
    margin: 8px 0;
    font-size: 16px;
    color: #333;
}

.table-list-option {
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 100;
}

.table-list-option li {
    padding: 12px;
    text-decoration: none;
    display: block;
    cursor: pointer;
}</style>