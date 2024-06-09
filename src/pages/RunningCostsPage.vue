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
} from 'chart.js'

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
                        display: true,
                        text: 'Mixed Chart Example'
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
        }
    },
    mounted() {
        this.mixedChartData1 = this.getMixedChartData1();
        this.mixedChartData2 = this.getMixedChartData2();
    },
    methods: {
        daysInMonth(date = new Date()) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const daysInMonth = new Date(year, month, 0).getDate();
            return Array.from({ length: daysInMonth }, (_, i) => i + 1);
        },
        getMixedChartData1(date = new Date()) {
            const labels = this.daysInMonth(date);
            const dataLength = labels.length;

            const AME = Array.from({ length: dataLength }, () => Math.floor(1500));
            const AMI = Array.from({ length: dataLength }, () => Math.floor(2000));

            const arr = Array.from({ length: dataLength }, () => Math.floor(Math.random() * 100) + 1);
            const CEA = this.accumulateRandomExpenses(arr);

            return {
                labels,
                datasets: [
                    {
                        type: 'line',
                        label: 'Ср-расх/мес',
                        data: AME,
                        borderColor: 'rgb(255,145,0)',
                        // backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                    },
                    {
                        type: 'line',
                        label: 'Ср-дох/мес',
                        data: AMI,
                        borderColor: 'rgb(87,224,175)',
                        // backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                    },
                    {
                        type: 'line',
                        label: 'Накопление расходов',
                        data: CEA,
                        borderColor: 'rgb(147,147,147)',
                        backgroundColor: ['rgb(246,148,19)', 'rgb(35,213,149)'],
                        fill: true,
                    },
                ],
            };
        },
        getMixedChartData2(date = new Date()) {
            const labels = this.daysInMonth(date);
            const dataLength = labels.length;
            const DE = Array.from({ length: dataLength }, () => Math.floor(Math.random() * 100) + 1);

            const ADE = Array.from({ length: dataLength }, () => 50);
            const ADI = Array.from({ length: dataLength }, () => 83);

            return {
                labels,
                datasets: [
                    {
                        type: 'line',
                        label: 'Ср-расх/дн',
                        data: ADE,
                        borderColor: 'rgb(255,145,0)',
                        // backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                    },
                    {
                        type: 'line',
                        label: 'Ср-дох/дн',
                        data: ADI,
                        borderColor: 'rgb(87,224,175)',
                        // backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                    },
                    {
                        type: 'bar',
                        label: 'Расх/дн',
                        data: DE,
                        backgroundColor: ['rgba(246,167,19,0.75)', 'rgba(246,238,105,0.75)', 'rgb(104,245,190,0.75)'],
                    },
                ],
            };
        },
        accumulateRandomExpenses(data) {
            let accumulated = [];
            let sum = 0;
            for (let i = 0; i < data.length; i++) {
                sum += data[i];
                accumulated.push(sum);
            }
            return accumulated;
        },
    }
}
// Средний доход в месяц - Avg. Monthly Income (AMI)
// Средний расход в месяц - Avg. Monthly Expense (AME)
// Средний доход в день - Avg. Daily Income (ADI)
// Средний расход в день - Avg. Daily Expense (ADE)
// Накопительный массив расходов - Cumulative Expense Array (CEA)
// Расход в день - Daily Expense (DE)
</script>

