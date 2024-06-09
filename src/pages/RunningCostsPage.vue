<template>
    <div class="p-4 sm:ml-64">
        <div class="grid gap-5 p-2">
            <div class="grid gap-5">
                <div v-if="cumulativeChartData" class="w-full grid gap-5">
                    <div class="flex gap-2 justify-center">
                        <h1 class="font-bold text-2xl">График накапливания расходов</h1>
                        <div>
                            <ElementHint tooltip-id="cumulative" placement="bottom" :hint="tooltipCumulativeText"/>
                        </div>
                    </div>
                    <Bar class="max-h-[500px]" :data="cumulativeChartData" :options="options"/>
                </div>
                <div v-if="dayChartData" class="w-full grid gap-5">
                    <div class="flex gap-2 justify-center">
                        <h1 class="font-bold text-2xl">График ежедневных расходов</h1>
                        <div>
                            <ElementHint tooltip-id="days" placement="bottom" :hint="tooltipDayText"/>
                        </div>
                    </div>
                    <Bar class="max-h-[500px]" :data="dayChartData" :options="options"/>
                </div>
            </div>
            <hr>
            <div class="flex">
                <div class="w-1/2" v-if="topPriceItem && topPriceItem.length">
                    <h1 class="font-bold text-2xl">Топ дорогих трат в текущем месяце</h1>
                    <table class="w-full text-left rounded-lg overflow-hidden">
                        <tr class="text-xs uppercase bg-orange-400">
                            <th class="px-2 py-1">№</th>
                            <th class="px-2 py-1">Наименование</th>
                            <th class="px-2 py-1">Цена</th>
                            <th class="px-2 py-1">Вес</th>
                        </tr>
                        <tr class="transition duration-75 bg-green-200 border-b border-orange-400 hover:bg-orange-400 hover:text-white hover:shadow-lg"
                            v-for="(item, index) in topPriceItem" :key="index+1"
                        >
                            <td class="px-2 py-1">{{ index + 1 }}</td>
                            <td class="px-2 py-1">{{ item.name }}</td>
                            <td class="px-2 py-1">{{ item.price }}</td>
                            <td class="px-2 py-1">{{ item.weight !== 0 && item.weight !== '0' ? item.weight : '-' }}</td>
                        </tr>
                    </table>
                </div>
            </div>
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
import {initTooltips} from 'flowbite';
import { nextTick } from 'vue';
import ElementHint from "@/components/element/ElementHint.vue";

ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, PointElement)

export default {
    name: 'MixedChart',
    components: { Bar, ElementHint },
    data() {
        return {
            tooltipCumulativeText: "Отслеживайте накопление расходов в течение месяца, сравнивая их с месячными расходами и доходами. Это поможет контролировать лимит средств и избегать излишеств расходов.",
            tooltipDayText: "Этот график поможет следить за ежедневными расходами. По возможности старайтесь не превышать средние показатели доходов, а в идеале - и расходов",
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
            topPriceItem: [],
            cumulativeChartData: null,
            dayChartData: null,
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

            // add info
            this.topPriceItem = this.data.topPriceItem;

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
            this.cumulativeChartData = this.getCumulativeChartData();
            this.dayChartData = this.getDayChartData();


            nextTick(() => {initTooltips();});
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

