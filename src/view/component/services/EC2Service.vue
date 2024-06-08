<template>
    <div v-show="isLoading" class="background--loading">
        <div class="icon--loading"></div>
    </div>
    <div class="ec2-page-title">
        <span>Your EC2</span>
        <button class="btn">Lịch sử thao tác</button>
    </div>
    <div class="ec2-page">
        <div class="ec2-table">
            <table>
                <thead>
                    <tr>
                        <th class="text-align-center" style="min-width: 50px;" type="checkbox">
                            <input type="checkbox" />
                        </th>
                        <th v-for="column in instancesTableColumn" :key="column.key" :class="column.class"
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
                        <td class="text-align-left">{{ item.InstanceId }}</td>
                        <td class="text-align-left">{{ item.InstanceType }}</td>
                        <td class="text-align-left" :class="{ 'running-state': item.State === 'running' }">{{ item.State }}
                        </td>
                        <td class="text-align-left">{{ item.vCpu }}</td>
                        <td class="text-align-left">{{ item.Platform }}</td>
                        <!-- <td class="text-align-center">
                            <span>Tuỳ chọn</span>
                            <div @click="showContextMenu(item.instancesId, $event)">
                                <ul>
                                    <li @click="startInstances(item)">
                                        Start
                                    </li>
                                    <li  @click="stopInstances(item)">
                                        Stop
                                    </li>
                                    <li @click="rebootInstances(item)">
                                        Reboot
                                    </li>
                                </ul>
                            </div>                         
                        </td> -->
                        <td class="text-align-center">
                            <div class="group-btn">
                                <button class="btn btn-start" v-if="item.State === 'stopped'"
                                    @click="startInstance(item.InstanceId)">Start</button>
                                <button class="btn btn-stop" v-if="item.State === 'running'"
                                    @click="stopInstance(item.InstanceId)">Stop</button>
                                <button class="btn btn-reboot" v-if="['running', 'stopped'].includes(item.State)"
                                    @click="rebootInstance(item.InstanceId)">Reboot</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="showDetail && selectedInstance !== null" class="showDetail">
            <!-- Hiển thị thông tin chi tiết ở đây -->
            <div>
                <p>Instance ID: {{ selectedInstance.InstanceId }}</p>
                <p>Instance Type: {{ selectedInstance.InstanceType }}</p>
                <p>Availability Zone: {{ selectedInstance.Zone }}</p>
                <p>Launch time: {{ selectedInstance.LaunchTime }}</p>
                <p>vCpu: {{ selectedInstance.vCpu }}</p>
                <p>Platform: {{ selectedInstance.Platform }}</p>
                <p>State: {{ selectedInstance.State }}</p>
                <p>PrivateIpAddress: {{ selectedInstance.PrivateIpAddress }}</p>
                <p>PublicIpAddress: {{ selectedInstance.PublicIpAddress }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { instancesTableColumn } from "@/constains/instancesTableColumn";
import EC2Service from "@/services/EC2Service";
export default {
    name: 'EC2ServicePage',
    data() {
        return {
            instances: [],
            instancesTableColumn,
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
                const res = await EC2Service.getInstancesList();
                console.log(res);
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
        async startInstance(item) {
            try {
                const res = await EC2Service.startInstance(item);
                this.getInstancesList();
                console.log(res.data);
            }
            catch (error) {
                console.log(error);
            }
        },
        async stopInstance(item) {
            try {
                const res = await EC2Service.stopInstance(item);
                this.getInstancesList();
                console.log(res.data);
            }
            catch (error) {
                console.log(error);
            }
        },
        async rebootInstance(item) {
            try {
                const res = await EC2Service.rebootInstance(item);
                this.getInstancesList();
                console.log(res.data);
            }
            catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
<style scoped>
@import url("../../../css/components/ec2service.css");

.ec2-page-title {
    width: 100%;
    height: 68px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.ec2-page-title .btn {
    padding: 0 12px;
    height: 32px;
    min-width: 80px;
    border-radius: 3px;
    cursor: pointer;
    color: #FFFFFF;
    border: none;
    background-color: #50B83C
}
.ec2-page-title .btn:hover {
    background-color: #4acf2f;
}

.ec2-page-title .btn:focus {
    background-color: #067933;
}
.ec2-page-title span {
    font-size: 24px;
    font-weight: 700;
    color: #1f1f1f;
}

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