<template>
    <div class="p-4 sm:ml-64">
        <div v-if="mixedChartData1" class="w-full flex gap-5">
            <Bar :data="mixedChartData1" :options="options"/>
        </div>
        <div v-if="mixedChartData2" class="w-full flex gap-5">
            <Bar :data="mixedChartData2" :options="options"/>
        </div>
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from 'chart.js';
import axiosInstance from "@/axios-instance";

ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, PointElement)

export default {
    name: 'MixedChart',
    components: { Bar },
    data() {
        return {
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            color: 'black',
                            font: {
                                weight: 'bold',
                            }
                        },
                    },
                    title: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: 'black',
                        },
                    },
                    x: {
                        ticks: {
                            color: 'black',
                        },
                    },
                },
            },
            mixedChartData1: null,
            mixedChartData2: null,
            data: null,
            AME: null, // Средний расход в месяц - Avg. Monthly Expense (AME)
            AMI: null, // Средний доход в месяц - Avg. Monthly Income (AMI)
            CEA: null, // Накопительный массив расходов - Cumulative Expense Array (CEA)
            ADE: null, // Средний расход в день - Avg. Daily Expense (ADE)
            ADI: null, // Средний доход в день - Avg. Daily Income (ADI)
            DE: null, // Расход в день - Daily Expense (DE)
            bgColors: [], // Массив цветовых ключей
            labels: [], // Массив подписей дней
            dataLength: null, // Количество дней
        }
    },
    async mounted() {
        try {
            const response = await axiosInstance.get('/info/running-costs');
            console.log('Running costs success:', response.data);
            this.data = response.data;

            // Initialize labels and dataLength
            this.labels = this.daysInMonth(new Date());
            this.dataLength = this.labels.length;

            // generate data to charts
            this.DE = this.data.dailyExpenses;
            this.CEA = this.data.cumulativeExpensesArray;
            const lossAverageDay = this.data.lossAverage / this.dataLength;
            const incomeAverageDay = this.data.incomeAverage / this.dataLength;
            this.ADE = Array.from({ length: this.dataLength }, () => lossAverageDay);
            this.ADI = Array.from({ length: this.dataLength }, () => incomeAverageDay);
            this.AME = Array.from({ length: this.dataLength }, () => this.data.lossAverage);
            this.AMI = Array.from({ length: this.dataLength }, () => this.data.incomeAverage);
            this.bgColors = this.DE.map((de, index) => this.getColor(de, this.ADE[index], this.ADI[index]));

            // Generate chart data
            this.mixedChartData1 = this.getCumulativeChartData();
            this.mixedChartData2 = this.getDayChartData();


        } catch (error) {
            console.error('Running costs error:', error);
        }
    },
    methods: {
        daysInMonth(date = new Date()) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const daysInMonth = new Date(year, month, 0).getDate();
            return Array.from({ length: daysInMonth }, (_, i) => i + 1);
        },
        getCumulativeChartData() {
            return {
                labels: this.labels,
                datasets: [
                    {
                        type: 'line',
                        label: 'Ср-расх/мес',
                        data: this.AME,
                        borderColor: 'rgb(255,145,0)',
                        fill: true,
                    },
                    {
                        type: 'line',
                        label: 'Ср-дох/мес',
                        data: this.AMI,
                        borderColor: 'rgb(87,224,175)',
                        fill: true,
                    },
                    {
                        type: 'line',
                        label: 'Накопление расходов',
                        data: this.CEA,
                        borderColor: 'rgb(147,147,147)',
                        backgroundColor: this.bgColors,
                        fill: true,
                    },
                ],
            };
        },
        getDayChartData() {
            return {
                labels: this.labels,
                datasets: [
                    {
                        type: 'line',
                        label: 'Ср-расх/дн',
                        data: this.ADE,
                        borderColor: 'rgb(255,145,0)',
                        fill: true,
                    },
                    {
                        type: 'line',
                        label: 'Ср-дох/дн',
                        data: this.ADI,
                        borderColor: 'rgb(87,224,175)',
                        fill: true,
                    },
                    {
                        type: 'bar',
                        label: 'Расх/дн',
                        data: this.DE,
                        backgroundColor: this.bgColors,
                    },
                ],
            };
        },
        getColor(dailyExpense, averageDailyExpense, averageDailyIncome) {
            if (dailyExpense < averageDailyExpense && dailyExpense < averageDailyIncome) {
                return 'rgb(104,245,190,1)';
            } else if (dailyExpense > averageDailyExpense && dailyExpense < averageDailyIncome) {
                return 'rgba(246,238,105,1)';
            } else if (dailyExpense > averageDailyExpense && dailyExpense > averageDailyIncome) {
                return 'rgba(246,167,19,1)';
            }
            return 'rgba(0,0,0,0)';
        },
    },
}
</script>

