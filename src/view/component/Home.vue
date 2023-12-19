<template>
    <div v-show="isLoading" class="background--loading">
        <div class="icon--loading"></div>
    </div>
    <div class="home-page-title">
        <span>Tổng quan chi phí tháng</span>
    </div>
    <div class="home-page">
        <apexChart type="bar" height="570px" :options="chartOptions" :series="chartSeries"
            :categories="chartOptions.xaxis.categories">
        </apexChart>
    </div>
</template>
  
<script>
import VueApexCharts from "vue3-apexcharts";
import AwsCostExplorerService from "@/services/AwsCostExplorerService"
export default {
    name: "HomePage",
    components: {
        apexChart: VueApexCharts,
    },
    data() {
        return {
            isLoading: false,
            chartOptions: {
                chart: {
                    type: "bar",
                    // height: 500,
                },
                //colors: colors,
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                        distributed: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: true,
                    // position: "left",
                    // horizontalAlign: "left",
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
                        // textWrap: true,
                        style: {
                            colors: [],
                            fontSize: '12px',
                            // fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            cssClass: 'apexcharts-xaxis-label',
                        }
                    },
                },

                yaxis: {
                    title: {
                        text: "Blended Cost (USD)",
                    },
                },
            },
            chartSeries: [
                {
                    name: "Blended Cost",
                    data: [],
                },
            ],
        };
    },
    created() {
        this.GetCostAndService();
    },
    methods: {
        async GetCostAndService() {
            try {
                this.isLoading = true;
                const res = await AwsCostExplorerService.GetMonthlyServiceAndCost();
                //console.log(res);
                const costData = res.data;
                const chartCategories = costData.map((item) => item.ServiceName);
                const blendedCosts = costData.map((item) => parseFloat(item.BlendedCost));
                for (let i = 0; i < chartCategories.length; i++) {
                    this.chartOptions.xaxis.categories.push(chartCategories[i]);
                }
                // console.log(this.chartOptions.xaxis.categories);
                this.chartSeries[0].data = blendedCosts;
                this.isLoading = false;
            } catch (error) {
                console.error(error);
            }
        },
    }
};
</script>

<style>
.home-page-title {
    width: 100%;
    height: 68px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    /* justify-content: center; */
}

.home-page-title span {
    font-size: 24px;
    font-weight: 700;
    color: #1f1f1f;
}

.home-page {
    height: calc(100vh - 140px);
    /* position: relative; */
    display: flex;
    justify-content: center;
    /* align-items: center; */
    flex-direction: column;
    padding: 24px;
}

/* Đặt màu cho nền của biểu đồ */
.apexcharts-canvas {
    background-color: #f5f5f5;
    padding: 0 12px;
}

.apexcharts-text tspan {
    transform: rotate(45deg) !important;
    font-family: "roboto" !important;
}
</style>