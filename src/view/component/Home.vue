<template>
    <div v-show="isLoading" class="background--loading">
        <div class="icon--loading"></div>
    </div>
    <div class="home-page-title">
        <span>Tổng quan chi phí tháng</span>
    </div>
    <div class="home-page">
        <div class="cost-summary">
            <div class="total-cost">
                <p>Tổng chi phí <span>{{ totalCost }} $</span></p>
            </div>
            <div class="predicted-cost">
                <p>Chi phí dự đoán tháng<span>{{ predictedCost }} $</span></p>
            </div>
            <div class="forecast-cost">
                <p>Dự đoán chi phí</p>
                <input type="date" placeholder="startDate" v-model="startDate">
                <input type="date" placeholder="endDate" v-model="endDate">
                <button @click="forecastCost">Submit</button>
                <span v-if="resultForecast != null">{{ resultForecast }} $</span>
            </div>
        </div>
        <apexChart type="bar" height="100%" :options="chartOptions" :series="chartSeries"
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
            totalCost: 0,
            predictedCost: 0,
            resultForecast: null,
            startDate: null,
            endDate: null,
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
        this.GetForecastedMonthEndCosts();
    },
    methods: {
        async GetCostAndService() {
            try {
                this.isLoading = true;
                const res = await AwsCostExplorerService.GetMonthlyServiceAndCost();
                //console.log(res);
                const costData = res.data;
                const chartCategories = costData.map((item) => item.ServiceName);
                const blendedCosts = costData.map((item) => parseFloat(item.BlendedCost).toFixed(2));
                for (let i = 0; i < chartCategories.length; i++) {
                    this.chartOptions.xaxis.categories.push(chartCategories[i]);
                }
                // console.log(this.chartOptions.xaxis.categories);
                this.chartSeries[0].data = blendedCosts.map(Number);
                this.calculateTotalCost();
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.error(error);
            }
        },
        calculateTotalCost() {
            // Lấy mảng các chi phí từ this.chartSeries[0].data
            const costs = this.chartSeries[0].data;

            // Sử dụng hàm reduce để tính tổng
            const totalCost = costs.reduce((acc, cost) => acc + cost, 0);

            // Gán giá trị cho totalCost trong data
            this.totalCost = totalCost.toFixed(2);
        },
        async GetForecastedMonthEndCosts() {
            try {
                const res = await AwsCostExplorerService.GetForecastedMonthEndCosts();
            console.log(res);
            const meanValue = parseFloat(res.data[0].MeanValue).toFixed(2);

            this.predictedCost = meanValue;
            }
            catch(error){
                console.log(error);
            }
            
        },
        async forecastCost() {
            try {
                const res = await AwsCostExplorerService.GetForecastedCosts(this.startDate, this.endDate);
                const data = res.data;

                // Tính tổng của các giá trị MeanValue
                const totalMeanValue = data.reduce((acc, forecast) => {
                    return acc + parseFloat(forecast.MeanValue);
                }, 0);
                this.resultForecast = totalMeanValue.toFixed(2);
            }
            catch (error) {
                console.log(error);
            }
        }
    }
};
</script>

<style scoped>
@import url('../../css/components/home.css');
</style>