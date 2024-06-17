<template>
    <div v-show="isLoading" class="background--loading">
        <div class="icon--loading"></div>
    </div>
    <div class="ec2-page-title">
        <span>Your Lambda</span>
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
                        <th v-for="column in LambdaInstances" :key="column.key" :class="column.class"
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
                        <td class="text-align-left">{{ item.FunctionName }}</td>
                        <td class="text-align-left">{{ item.Runtime.Value }}</td>
                        <!-- <td class="text-align-left" :class="{ 'running-state': item.State === 'running' }">{{ item.State }}
                        </td> -->
                        <td class="text-align-left">{{ item.Handler }}</td>
                        <td class="text-align-left">{{ item.Timeout }}</td>
                        <td class="text-align-left">{{ item.MemorySize }}</td>
                        <td class="text-align-center">
                            <div class="group-btn">
                                <button class="btn btn-delete"
                                    @click="DeleteFunction(item.FunctionName)">Delete</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Thông tin 1 instanes -->
        <!-- <div v-if="showDetail && selectedInstance !== null" class="showDetail">
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
        </div> -->
    </div>
</template>

<script>
import { LambdaInstances } from "@/constains/LambdaInstances";
import LambdaService from "@/services/LambdaService";
import ActivityLogService from "@/services/ActivityLogService";
export default {
    name: 'LambdaServicePage',
    data() {
        return {
            instances: [],
            LambdaInstances,
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
                const res = await LambdaService.getInstancesList();
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
        async DeleteFunction(functionName) {
            try {
                this.isLoading = true;
                const res = await LambdaService.DeleteFunction(functionName);
                console.log(res);
                this.getInstancesList(); // Refresh the instances list
                this.isLoading = false;
                alert(res.data)
                if (res.status == 200) {
                    const userId = localStorage.getItem('userId');
                // Ghi lại hoạt động vào cơ sở dữ liệu
                    await ActivityLogService.insertLog({ 
                    UserId: userId, // Thay 'userId' bằng id của người dùng thực hiện hoạt động này
                    InstanceId: functionName,
                    ServiceName: 'Lambda',
                    ActivityDescription: 'Delete Function', // Mô tả hoạt động
                    Result: 'Success', // Kết quả của hoạt động (có thể là 'Success' hoặc 'Failure' tùy thuộc vào trạng thái của phản hồi)
                    });
                }
            } catch (error) {
                this.isLoading = false;
                console.log(error);
                alert(error.response.data)
                const userId = localStorage.getItem('userId');
                // console.log(error);
                try {
                // Ghi log về lỗi vào cơ sở dữ liệu
                await ActivityLogService.insertLog({ 
                    UserId: userId, // Thay 'userId' bằng id của người dùng thực hiện hoạt động này
                    InstanceId: functionName,
                    ServiceName: 'Lambda',
                    ActivityDescription: 'Stop DB', // Mô tả hoạt động
                    Result: 'Failure', // Kết quả của hoạt động (có thể là 'Success' hoặc 'Failure' tùy thuộc vào trạng thái của phản hồi)
                });
                } catch (logError) {
                    // Xử lý lỗi khi ghi log
                    console.error('Error logging to activity log:', logError);
                }
            }
        },

    }
}
</script>
<style scoped>
@import url("../../../css/components/ec2service.css");


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