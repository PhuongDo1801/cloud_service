<template>
    <div v-show="isLoading" class="background--loading">
        <div class="icon--loading"></div>
    </div>
    <div class="budget-page-title">
        <span>Quản lý ngân sách</span>
        <button class="btn btn-add-budget">Tạo kế hoạch</button>
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
                        <td class="text-align-left">{{ item.Threshold }}</td>
                        <td class="text-align-left">{{ item.StartTime }}</td>
                        <td class="text-align-left">{{ item.EndTime }}</td>
                        <td class="text-align-center">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { budgetTableColumn } from "@/constains/budgetTableColumn";
import budgetService from "@/services/budgetService";
export default {
    name: 'BudgetPage',
    data() {
        return {
            budgets: [],
            budgetTableColumn,
            showDetail: false,
            selectedInstance: null,
            isLoading: false,
        }
    },
    created() {
        this.getBudgetsList();
    },
    computed: {

    },
    methods: {
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
}</style>