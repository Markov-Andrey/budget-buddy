<template>
    <div class="p-4 sm:ml-64">
        <div v-if="categoriesDonut.labels && categoriesDonut.datasets" class="w-[500px]">
            <Doughnut :data="categoriesDonut" :options="options"/>
        </div>
        <div v-if="autoDonut.labels && autoDonut.datasets" class="w-[500px]">
            <Doughnut :data="autoDonut" :options="options"/>
        </div>
        <div v-if="permanentDonut.labels && permanentDonut.datasets" class="w-[500px]">
            <Doughnut :data="permanentDonut" :options="options"/>
        </div>
        <div v-if="productsDonut.labels && productsDonut.datasets" class="w-[500px]">
            <Doughnut :data="productsDonut" :options="options"/>
        </div>
        <div v-if="amountsDonut.labels && amountsDonut.datasets" class="w-[500px]">
            <Doughnut :data="amountsDonut" :options="options"/>
        </div>
    </div>
</template>

<script>
import {Doughnut} from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    Filler
} from 'chart.js'
import axiosInstance from "@/axios-instance";
import {doughnutColors} from "@/constants/colors.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, Filler)

export default {
    name: 'DoughnutChart',
    components: {Doughnut},
    props: {
        chartId: {
            type: String,
            default: 'doughnut-chart'
        },
    },
    data() {
        return {
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'center',
                        labels: {
                            fontColor: 'black',
                            fontStyle: 'bold'
                        },
                    }
                },
            },
            categoriesDonut: {},
            autoDonut: {},
            permanentDonut: {},
            productsDonut: {},
            amountsDonut: {},
        }
    },
    async mounted() {
        try {
            const response = await axiosInstance.get('/info/personal');
            console.log('Balance success:', response.data);
            this.fillDataArrays(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Balance error:', error);
        }
    },
    methods: {
        fillDataArrays(data) {
            this.fillDonut(this.autoDonut, data.subCategoriesDataAuto);
            this.fillDonut(this.categoriesDonut, data.categoriesData);
            this.fillDonut(this.permanentDonut, data.subCategoriesDataPermanent);
            this.fillDonut(this.productsDonut, data.subCategoriesDataProducts);
            this.fillDonut(this.amountsDonut, data.amountData);
        },
        fillDonut(donut, data) {
            donut.labels = Object.keys(data.details);
            donut.datasets = [{
                data: Object.values(data.details),
                backgroundColor: doughnutColors,
            }];
        }
    }
}
</script>
