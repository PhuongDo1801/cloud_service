<template>
    <div>
        <NotificationPopup 
            :message="notificationMessage" 
            :visible="notificationVisible" 
            :title="notificationTitle" 
            :type="notificationType"
            @close="notificationVisible = false" 
        />
        <!-- Nội dung khác của trang -->
    </div>
    <div v-show="isLoading" class="background--loading">
        <div class="icon--loading"></div>
    </div>
    <div class="ec2-page-title">
        <span>Your EC2</span>
        <button class="btn" @click="toggleForm">Tra cứu chi phí</button>
    </div>
    <div v-if="showForm" class="form-container">
        <form @submit.prevent="fetchPriceForecast">
            <label>Instance Type:</label>
            <input v-model="formData.instanceType" required>
            
            <label>vCpu:</label>
            <input v-model="formData.vCpu" required>

            <label>Memory (GiB):</label>
            <input v-model="formData.memory" type="number" step="0.01" required>

            <label>Operating System:</label>
            <input v-model="formData.operatingSystem" required>

            <button type="submit">Tra cứu chi phí</button>
        </form>
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
                                <button class="btn btn-start"
                                    @click="startInstance(item.InstanceId)">Start</button>
                                <button class="btn btn-stop"
                                    @click="stopInstance(item.InstanceId)">Stop</button>
                                <button class="btn btn-reboot"
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
import AWSPricing from "@/services/AWSPricing";
import ActivityLogService from "@/services/ActivityLogService";
import NotificationPopup from "@/components/NotificationPopup.vue";
export default {
    name: 'EC2ServicePage',
    components: {
        NotificationPopup
    },
    data() {
        return {
            instances: [],
            instancesTableColumn,
            showDetail: false,
            selectedInstance: null,
            isLoading: false,
            notificationMessage: '',
            notificationVisible: false,
            notificationTitle: '',
            notificationType: 'success',
            showForm: false,
            formData: {
            instanceType: '',
            vCpu: '',
            memory: '',
            operatingSystem: ''
            }
        }
    },
    created() {
        this.getInstancesList();
    },
    computed: {

    },
    methods: {
        showNotification(message, title, type) {
            this.notificationMessage = message;
            this.notificationTitle = title;
            this.notificationType = type;
            this.notificationVisible = true;
        },
        toggleForm() {
        this.showForm = !this.showForm;
    },
    async fetchPriceForecast() {
        try {
            this.isLoading = true;
            const res = await AWSPricing.getPrice(this.formData);
            console.log(res);
            this.isLoading = false;
            this.showNotification(res.data, 'Thành công', 'success');
        } catch (error) {
            this.isLoading = false;
            this.showNotification(error.response.data, 'Lỗi', 'error');
        }
    },
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
                this.isLoading = true
                const res = await EC2Service.startInstance(item);
                this.getInstancesList();
                // console.log(res.data);
                this.isLoading = false
                // alert(res.data)
                this.showNotification(res.data, 'Thành công', 'success');
                if (res.status == 200) {
                    const userId = localStorage.getItem('userId');
                // Ghi lại hoạt động vào cơ sở dữ liệu
                    await ActivityLogService.insertLog({ 
                    UserId: userId, // Thay 'userId' bằng id của người dùng thực hiện hoạt động này
                    InstanceId: item,
                    ServiceName: 'EC2',
                    ActivityDescription: 'Start Instance', // Mô tả hoạt động
                    Result: 'Success', // Kết quả của hoạt động (có thể là 'Success' hoặc 'Failure' tùy thuộc vào trạng thái của phản hồi)
                    });
                }
            }
            catch (error) {
                this.isLoading = false
                const userId = localStorage.getItem('userId');
                // alert(error.response.data)
                // console.log(error);
                const errorMessage = error.response.data.split('. ').slice(0, 1).join('. ') + '.';
                this.showNotification(errorMessage, 'Lỗi', 'error');
                try {
                // Ghi log về lỗi vào cơ sở dữ liệu
                await ActivityLogService.insertLog({ 
                    UserId: userId, // Thay 'userId' bằng id của người dùng thực hiện hoạt động này
                    InstanceId: item,
                    ServiceName: 'EC2',
                    ActivityDescription: 'Start Instance', // Mô tả hoạt động
                    Result: 'Failure', // Kết quả của hoạt động (có thể là 'Success' hoặc 'Failure' tùy thuộc vào trạng thái của phản hồi)
                });
                } catch (logError) {
                    // Xử lý lỗi khi ghi log
                    console.error('Error logging to activity log:', logError);
                }
            }
        },
        async stopInstance(item) {
            try {
                this.isLoading = true
                const res = await EC2Service.stopInstance(item);
                this.getInstancesList();
                // console.log(res.data);
                this.isLoading = false
                // alert(res.data)
                this.showNotification(res.data, 'Thành công', 'success');
                if (res.status == 200) {
                    const userId = localStorage.getItem('userId');
                // Ghi lại hoạt động vào cơ sở dữ liệu
                    await ActivityLogService.insertLog({ 
                    UserId: userId, // Thay 'userId' bằng id của người dùng thực hiện hoạt động này
                    InstanceId: item,
                    ServiceName: 'EC2',
                    ActivityDescription: 'Stop Instance', // Mô tả hoạt động
                    Result: 'Success', // Kết quả của hoạt động (có thể là 'Success' hoặc 'Failure' tùy thuộc vào trạng thái của phản hồi)
                    });
                }
            }
            catch (error) {
                this.isLoading = false
                const userId = localStorage.getItem('userId');
                // alert(error.response.data)
                // console.log(error);
                this.showNotification(error.response.data, 'Lỗi', 'error');
                try {
                // Ghi log về lỗi vào cơ sở dữ liệu
                await ActivityLogService.insertLog({ 
                    UserId: userId, // Thay 'userId' bằng id của người dùng thực hiện hoạt động này
                    InstanceId: item,
                    ServiceName: 'EC2',
                    ActivityDescription: 'Stop Instance', // Mô tả hoạt động
                    Result: 'Failure', // Kết quả của hoạt động (có thể là 'Success' hoặc 'Failure' tùy thuộc vào trạng thái của phản hồi)
                });
                } catch (logError) {
                    // Xử lý lỗi khi ghi log
                    console.error('Error logging to activity log:', logError);
                }
            }
        },
        async rebootInstance(item) {
            try {
                this.isLoading = true
                const res = await EC2Service.rebootInstance(item);
                this.getInstancesList();
                // console.log(res.data);
                this.isLoading = false
                // alert(res.data);
                this.showNotification(res.data, 'Thành công', 'success');
                if (res.status == 200) {
                    const userId = localStorage.getItem('userId');
                // Ghi lại hoạt động vào cơ sở dữ liệu
                    await ActivityLogService.insertLog({ 
                    UserId: userId, // Thay 'userId' bằng id của người dùng thực hiện hoạt động này
                    InstanceId: item,
                    ServiceName: 'EC2',
                    ActivityDescription: 'Reboot Instance', // Mô tả hoạt động
                    Result: 'Success', // Kết quả của hoạt động (có thể là 'Success' hoặc 'Failure' tùy thuộc vào trạng thái của phản hồi)
                    });
                }
            }
            catch (error) {
                this.isLoading = false
                const userId = localStorage.getItem('userId');
                // alert(error.response.data)
                // console.log(error);
                this.showNotification(error.response.data, 'Lỗi', 'error');
                try {
                // Ghi log về lỗi vào cơ sở dữ liệu
                await ActivityLogService.insertLog({ 
                    UserId: userId, // Thay 'userId' bằng id của người dùng thực hiện hoạt động này
                    InstanceId: item,
                    ServiceName: 'EC2',
                    ActivityDescription: 'Reboot Instance', // Mô tả hoạt động
                    Result: 'Failure', // Kết quả của hoạt động (có thể là 'Success' hoặc 'Failure' tùy thuộc vào trạng thái của phản hồi)
                });
                } catch (logError) {
                    // Xử lý lỗi khi ghi log
                    console.error('Error logging to activity log:', logError);
                }
            }
        }
    }
}
</script>
<style scoped>
@import url("../../../css/components/ec2service.css");

.form-container {
    background-color: #f5f5f5;
    padding: 16px;
    margin-top: 16px;
    border-radius: 4px;
    border: 1px solid #ddd;
}

.form-container form {
    display: flex;
    flex-direction: column;
}

.form-container label {
    margin: 8px 0 4px;
}

.form-container input {
    margin-bottom: 8px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.form-container button {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    background-color: #50B83C;
    color: white;
    cursor: pointer;
}

.form-container button:hover {
    background-color: #4acf2f;
}

.form-container button:focus {
    background-color: #067933;
}


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