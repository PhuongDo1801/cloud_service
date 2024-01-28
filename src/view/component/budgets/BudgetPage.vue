<template>
     <!-- Overlay -->
     <div v-if="isOverlayVisible" class="overlay"></div>
    <BudgetCreate
      v-if="isShowCreateBudgetForm"
      @submit="submitCreateBudgetForm"
      @close="closeCreateBudgetForm"
    ></BudgetCreate>
     <BudgetInfo v-if="isShowDetail"
    :selected-instance="selectedInstance"
    @close-popup="closeBudgetDetailPopup"
    ></BudgetInfo>
    <div v-show="isLoading" class="background--loading">
        <div class="icon--loading"></div>
    </div>
    <div class="budget-page-title">
        <span>Quản lý ngân sách</span>
        <button class="btn btn-add-budget" @click="OpenCreateForm">Tạo kế hoạch</button>
    </div>
    <div class="budget-page">
        <div class="budget-table">
            <table>
                <thead>
                    <tr>
                        <th class="text-align-center" style="min-width: 50px;" type="checkbox">
                            <input type="checkbox" />
                        </th>
                        <th v-for="column in budgetTableColumn" :key="column.key" :class="column.class"
                            :style="column.style" :title="column.title">
                            {{ column.text }}
                        </th>
                    </tr>
                </thead>
                <tbody class="table__body" v-if="budgets.length > 0">
                    <tr @dblclick="showBudgetDetail(item)" v-for="(item, index) in budgets" :key="index">
                        <td class="text-align-center" @dblclick.stop="">
                            <input type="checkbox">
                        </td>
                        <td class="text-align-left">{{ item.BudgetName }}</td>
                        <td class="text-align-left">{{ item.BudgetLimit }}</td>
                        <td class="text-align-left">{{ item.Threshold }} %</td>
                        <td class="text-align-left">{{ formatDateWithDash(item.StartTime) }}</td>
                        <td class="text-align-left">{{ formatDateWithDash(item.EndTime) }}</td>
                        <td class="text-align-center">
                            <button class="btn btn-delete" @click="deleteBudget(item)">Xoá</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import BudgetCreate from "@/view/component/budgets/BudgetCreate.vue"
import { formatDateWithDash } from '@/utils/formatDate';
import BudgetInfo from "@/view/component/budgets/BudgetInfo.vue"
import { budgetTableColumn } from "@/constains/budgetTableColumn";
import budgetService from "@/services/budgetService";
export default {
    name: 'BudgetPage',
    components: {
        BudgetInfo, BudgetCreate
    },
    data() {
        return {
            budgets: [],
            budgetTableColumn,
            isShowDetail: false,
            selectedInstance: null,
            isLoading: false,
            isShowCreateBudgetForm: false,
            isOverlayVisible: false,
        }
    },
    created() {
        this.getBudgetsList();
    },
    computed: {

    },
    methods: {
        formatDateWithDash,
        async getBudgetsList() {
            try {
                this.isLoading = true;
                const res = await budgetService.getBudgets();
                console.log(res);
                this.budgets = res.data;
                this.isLoading = false
            }
            catch (error) {
                this.isLoading = false;
                console.log(error);
            }
        },

        showBudgetDetail(budget){
            this.selectedInstance = budget;
            this.isShowDetail = true;
        },
        closeBudgetDetailPopup(){
            this.isShowDetail = false;
            this.selectedInstance = null;
        },
        async deleteBudget(item){
            try{
                const res = await budgetService.deleteBudget(item.BudgetName);
                if(res.status == 200){
                    this.getBudgetsList();
                }
            }
            catch(error){
                console.log(error);
            }
        },
        OpenCreateForm(){
            this.isOverlayVisible = true;
            this.isShowCreateBudgetForm = true;
        },
        closeCreateBudgetForm(){
            this.isOverlayVisible = false;
            this.isShowCreateBudgetForm = false;
        },
        async submitCreateBudgetForm(createBudgetFormData){
            try{
                const res = await budgetService.createBudget(createBudgetFormData);
                console.log(res);
                if(res.status == 200){
                    this.getBudgetsList();
                }
            }
            catch(error){
                console.log(error);
            }
        }
    }
}
</script>
<style scoped>
@import url(../../../css/components/budget.css);

.budget-page-title .btn {
    height: 32px;
    min-width: 80px;
    border-radius: 3px;
    cursor: pointer;
    color: #FFFFFF;
    border: none;
    background-color: #50B83C
}
.budget-page-title .btn:hover {
    background-color: #4acf2f;
}

.budget-page-title .btn:focus {
    background-color: #067933;
}
.budget-page-title span {
    font-size: 24px;
    font-weight: 700;
    color: #1f1f1f;
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
}
.btn-add-budget {
    min-width: 80px;
    height: 32px;
    padding: 0 12px;
}
.btn-delete {
    background-color: red;
    min-width: 80px;
    height: 24px;
    border: none;
    outline: none;
    border-radius: 4px;
    color: #ffffff;
    cursor: pointer;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Một màu đen đục với độ trong suốt */
  z-index: 99; /* Đặt z-index cao hơn để nằm phía trên cùng */
}
</style>