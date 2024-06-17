<template>
    <div v-show="isLoading" class="background--loading">
        <div class="icon--loading"></div>
    </div>
    <div class="ec2-page-title">
        <span>Lịch sử thao tác</span>
        <!-- <button class="btn">Lịch sử thao tác</button> -->
    </div>
    <div class="ec2-page">
        <div class="ec2-table">
            <table>
                <thead>
                    <tr>
                        <th class="text-align-center" style="min-width: 50px;" type="checkbox">
                            <input type="checkbox" />
                        </th>
                        <th v-for="column in activityLogColumn" :key="column.key" :class="column.class"
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
                        <td class="text-align-left">{{ item.ServiceName }}</td>
                        <!-- <td class="text-align-left" :class="{ 'running-state': item.State === 'running' }">{{ item.State }}
                        </td> -->
                        <td class="text-align-left">{{ item.ActivityDescription }}</td>
                        <td class="text-align-left">{{ item.Result }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { activityLogColumn } from "@/constains/activityLogColumn";
import ActivityLogService from "@/services/ActivityLogService";
export default {
    name: 'LogHistory',
    data() {
        return {
            instances: [],
            activityLogColumn,
            showDetail: false,
            selectedInstance: null,
            isLoading: false,
        }
    },
    created() {
        this.getLogList();
    },
    computed: {

    },
    methods: {
        async getLogList() {
            try {
                this.isLoading = true;
                const res = await ActivityLogService.getLogById("2e9efc12-80bf-41a7-9efa-d6dad9ed2529");
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