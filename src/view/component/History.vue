<template>
    <div v-show="isLoading" class="background--loading">
        <div class="icon--loading"></div>
    </div>
    <div class="history-page-title">
        <span>Lịch sử chi phí</span>
        <div class="history-page-search">

        </div>
    </div>
    <div class="history-page">
        <apexChart type="bar" height="570px" :options="chartOptions" :series="chartSeries"></apexChart>
    </div>
</template>
  
<script>
import { format } from 'date-fns';
import AwsCostExplorerService from "@/services/AwsCostExplorerService";
import VueApexCharts from "vue3-apexcharts";

export default {
    name: "HistoryPage",
    components: {
        apexChart: VueApexCharts,
    },
    data() {
        return {
            isLoading: false,
            chartOptions: {
                chart: {
                    type: "bar",
                },
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                        distributed: true,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                legend: {
                    show: true,
                },
                xaxis: {
                    categories: [],
                    labels: {
                        show: true,
                        rotate: 0,
                        rotateAlways: false,
                        hideOverlappingLabels: false,
                        showDuplicates: false,
                        trim: true,
                        minHeight: undefined,
                        maxHeight: 120,
                        maxWidth: 100,
                        style: {
                            colors: [],
                            fontSize: '12px',
                            fontWeight: 400,
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    },
                },
                yaxis: {
                    title: {
                        text: 'Total Cost (USD)',

                    },
                },
                // title: {
                //     text: 'Cost History',
                // },
            },
            chartSeries: [
                {
                    name: 'Total Cost',
                    data: [],
                },
            ],
        };
    },
    created() {
        this.fetchCostData();
    },
    methods: {
        async fetchCostData() {
            try {
                this.isLoading = true;
                // Gọi API để lấy dữ liệu
                const costData = await AwsCostExplorerService.GetSixMonthCost();
                const data = costData.data
                // Chuyển định dạng dữ liệu từ costData để cập nhật vào biểu đồ
                this.chartSeries[0].data = data.map(entry => entry.TotalCost);
                const chartCategories = data.map(entry => {
                    // Định dạng lại ngày tháng ở đây, ví dụ: July, 2023
                    return format(new Date(entry.TimePeriod.Start), 'MMMM, yyyy');
                });
                for (let i = 0; i < chartCategories.length; i++) {
                    this.chartOptions.xaxis.categories.push(chartCategories[i]);
                }
                this.isLoading = false;
                console.log(this.chartOptions.xaxis.categories);
            } catch (error) {
                console.error('Error fetching cost data:', error);
            }
        },
        async HistoryData() {
            try {
                this.isLoading = true;
                const res = await AwsCostExplorerService.GetSixMonthCostAndService();
                const data = res.data;
                const serviceCosts = {};

                // Process the API result and update the series and xaxis categories
                data.forEach(entry => {
                    // const timePeriod = entry.TimePeriod.Start;
                    entry.Services.forEach(service => {
                        const serviceName = service.ServiceName;
                        //const cost = parseFloat(service.Cost);

                        if (!serviceCosts[serviceName]) {
                            serviceCosts[serviceName] = {
                                name: serviceName,
                                data: [],
                            };
                        }

                        // serviceCosts[serviceName].data.push({
                        //     x: new Date(timePeriod).getTime(),
                        //     y: cost,
                        // });
                    });
                });

                // Clear old data
                this.chartOptions.xaxis.categories = [];
                this.chartSeries = [];

                // Update series with serviceCosts values
                this.chartSeries = Object.values(serviceCosts);
                this.chartSeries = Object.values(serviceCosts);

                // Tạo một đối tượng map để theo dõi các giá trị của mỗi tháng
                const monthMap = new Map();
                this.chartSeries.forEach(series => {
                    series.data.forEach(({ x, y }) => {
                        if (!monthMap.has(x)) {
                            monthMap.set(x, 0);
                        }
                        monthMap.set(x, monthMap.get(x) + y);
                    });
                });

                // Tạo mảng cuối cùng dựa trên monthMap
                const finalData = [];
                monthMap.forEach((value, key) => {
                    finalData.push({ x: key, y: value });
                });

                // Sắp xếp mảng cuối cùng theo thứ tự tăng dần của thời gian
                finalData.sort((a, b) => a.x - b.x);

                // Gán mảng cuối cùng vào data của mỗi series
                this.chartSeries.forEach(series => {
                    const newData = finalData.map(({ x, y }) => ({ x, y: series.name === x ? y : 0 }));
                    series.data = newData;
                });
                console.log(this.chartSeries);
                // Update xaxis categories with chartCategories
                const chartCategories = data.map(entry => {
                    // Định dạng lại ngày tháng ở đây, ví dụ: July, 2023
                    return format(new Date(entry.TimePeriod.Start), 'MMMM, yyyy');
                });
                for (let i = 0; i < chartCategories.length; i++) {
                    this.chartOptions.xaxis.categories.push(chartCategories[i]);
                }
                console.log(this.chartOptions.xaxis.categories);
                this.isLoading = false;
            } catch (error) {
                console.error('Error fetching cost data:', error);
                this.isLoading = false;
            }
        }

    },
};
</script>
  
<style>
.history-page-title {
    width: 100%;
    height: 68px;
    padding: 0 12px;
    display: flex;
    align-items: center;
}

.history-page-title span {
    font-size: 24px;
    font-weight: 700;
    color: #1f1f1f;
}

.history-page {
    height: calc(100vh - 140px);
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 24px;
}
</style>
  