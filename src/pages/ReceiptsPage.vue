<template>
    <div class="p-4 sm:ml-64">
        <div class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <button
                    @click="activeTab = 'loss'"
                    :class="{'me-2 inline-block px-4 py-3 text-white bg-blue-600 rounded-lg': activeTab === 'loss', 'inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white': activeTab !== 'loss'}"
                >
                    Расходы
                </button>
                <button
                    @click="activeTab = 'income'"
                    :class="{'me-2 inline-block px-4 py-3 text-white bg-blue-600 rounded-lg': activeTab === 'income', 'inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white': activeTab !== 'income'}"
                >
                    Доходы
                </button>
                <button
                    @click="activeTab = 'investments'"
                    :class="{'me-2 inline-block px-4 py-3 text-white bg-blue-600 rounded-lg': activeTab === 'investments', 'inline-block px-4 py-3 text-gray-400 cursor-not-allowed dark:text-gray-500': activeTab !== 'investments'}"
                    disabled
                >
                    Инвестиции
                </button>
        </div>
        <div v-if="activeTab === 'loss'">
            <ReceiptInputComponent/>
            <TableComponent v-if="receipts && receipts.data && receipts.data.length"
                            :headers="['Чек', 'Обработка', 'Ошибка', 'Ануллирован', 'Сумма', 'Дата', '']"
                            :data="receipts.data"
                            is-edit is-delete
            />
        </div>
        <div v-else-if="activeTab === 'income'">
            <p>Содержимое для вкладки "Доходы".</p>
        </div>
        <div v-else-if="activeTab === 'investments'">
            <p>Содержимое для вкладки "Инвестиции".</p>
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
            activeTab: 'loss', // Устанавливаем начальную вкладку
            receipts: [],
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

</style>
