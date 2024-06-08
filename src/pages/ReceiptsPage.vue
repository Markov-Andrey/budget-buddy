<template>
    <div class="p-4 sm:ml-64">
        <div class="flex gap-2 flex-wrap text-sm font-medium text-center text-gray-500">
            <template v-for="tab in tabs" :key="tab.value">
                <button
                        @click="activeTab = tab.value"
                        :class="{
                        'inline-block transition duration-75 px-4 py-3 rounded-lg': true,
                        'text-white bg-orange-400': activeTab === tab.value,
                        'hover:text-gray-900 hover:bg-green-300': activeTab !== tab.value
                    }"
                >
                    {{ tab.label }}
                </button>
            </template>
        </div>
        <div v-if="activeTab === 'loss'">
            <ReceiptInputComponent/>
            <TableComponent
                    v-if="receipts && receipts.data && receipts.data.length"
                    :headers="['Чек', 'Обработка', 'Ошибка', 'Ануллирован', 'Сумма', 'Дата', '']"
                    :data="receipts.data"
                    is-edit
                    is-delete
            />
        </div>
        <div v-else-if="activeTab === 'income'">
            <p>Содержимое для вкладки "Доходы".</p>
        </div>
    </div>
</template>

<script>
import TableComponent from "@/components/table/TableComponent";
import ReceiptInputComponent from "@/components/inputs/ReceiptInputComponent";
import axiosInstance from '@/axios-instance';

export default {
    name: "ReceiptsPage",
    components: {
        ReceiptInputComponent,
        TableComponent
    },
    data() {
        return {
            activeTab: 'loss',
            receipts: [],
            tabs: [
                { value: 'loss', label: 'Расходы' },
                { value: 'income', label: 'Доходы' }
            ]
        };
    },
    async mounted() {
        if (this.activeTab === 'loss') {
            try {
                const response = await axiosInstance.post('/receipts/show');
                this.receipts = response.data;
                console.log(this.receipts.data);
            } catch (error) {
                console.error('Error fetching receipts:', error);
            }
        }
    },
    watch: {
        activeTab(newTab) {
            if (newTab === 'loss') {
                this.fetchReceipts();
            }
        }
    },
    methods: {
        async fetchReceipts() {
            try {
                const response = await axiosInstance.post('/receipts/show');
                this.receipts = response.data;
                console.log(this.receipts.data);
            } catch (error) {
                console.error('Error fetching receipts:', error);
            }
        }
    }
}
</script>

<style scoped>
/* Add your scoped styles here */
</style>
