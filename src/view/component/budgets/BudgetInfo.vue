<template>
    <div class="popup-overlay">
        <div class="popup-content">
            <!-- Nội dung thông tin chi tiết -->
            <div class="main-content">
            <div class="info">
                <h2>Thông tin {{ selectedInstance.BudgetName }}</h2>
                <!-- <input type="text" v-model="selectedInstance.BudgetName"> -->
                <p><strong>Limit:</strong> {{ selectedInstance.BudgetLimit }}</p>
                <p><strong>Threshold:</strong> {{ selectedInstance.Threshold }} %</p>
                <p><strong>StartTime:</strong> {{ formatDateWithDash(selectedInstance.StartTime) }}</p>
                <p><strong>EndTime:</strong> {{ formatDateWithDash(selectedInstance.EndTime) }}</p>
                <p><strong>ActualSpend:</strong> {{ selectedInstance.ActualSpend }}</p>
                <p><strong>ForecastedSpend:</strong> {{ selectedInstance.ForecastedSpend }}</p>
                <!-- Thêm các trường thông tin khác nếu cần -->
            </div>
            <apexChart type="bar" height="100%" :options="chartOptions" :series="chartSeries">
            </apexChart>
            </div>
            <button class="btn btn-close" @click="closePopup">Đóng</button>
        </div>
    </div>
</template>
  
<script>
import VueApexCharts from "vue3-apexcharts";
import { formatDateWithDash } from '@/utils/formatDate';
export default {
    name: "BudgetInfo",
    components: {
        apexChart: VueApexCharts,
    },
    props: {
        selectedInstance: Object,
    },
    data() {
        return {
            chartOptions: {
                chart: {
                    type: "bar",
                },
                xaxis: {
                    categories: ["Limit", "Actual Spend"],
                },
                yaxis: [
                    {
                        title: {
                        text: "USD",
                        },
                        seriesName: "Money (USD)",
                        opposite: true,
                    },
                ],
                plotOptions: {
                bar: {
                    columnWidth: "50%", // Điều này sẽ làm cho cột có chiều rộng 50%
                },
                },
                colors: ['#008FFB', '#00E396'],
            },
            chartSeries: [
                {
                    name: "Money (USD)",
                    data: [0, 0],
                },
            ],
        };
    },
    watch: {
        selectedInstance: {
            handler: "updateChartData",
            immediate: true,
        },
    },
    methods: {
        formatDateWithDash,
        closePopup() {
            this.$emit('close-popup');
        },
        updateChartData() {
            if (this.selectedInstance) {
                this.chartSeries[0].data = [
                    this.selectedInstance.BudgetLimit,
                    this.selectedInstance.ActualSpend,
                    //this.selectedInstance.Threshold * this.selectedInstance.BudgetLimit / 100,
                ];
                // Cập nhật lại biểu đồ khi có sự thay đổi
            }
        },
    },
};
</script>
  
<style scoped>
/* CSS cho component popup */
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
}

.popup-content {
    width: 800px;
    display: flex;
    flex-direction: column;
    z-index: 999;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.main-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.main-content .info {
    width: 50%;
}
.btn-close {
    width: 80px;
    height: 32px;
    background-color: #eee;
    border: none;
    outline: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: auto; /* Đẩy nút Đóng về góc phải */
    cursor: pointer;
    margin-top: 12px;
}
</style>
  