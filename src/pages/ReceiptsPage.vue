<template>
    <div class="p-4 sm:ml-64">
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li class="me-2">
                <router-link to="recipts/loss" class="inline-block px-4 py-3 text-white bg-blue-600 rounded-lg" aria-current="page">
                    Расходы
                </router-link>
            </li>
            <li class="me-2">
                <router-link to="recipts/income" class="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">
                    Доходы
                </router-link>
            </li>
            <li class="me-2">
                <router-link to="recipts/investments" class="inline-block px-4 py-3 text-gray-400 cursor-not-allowed dark:text-gray-500">
                    Инвестиции
                </router-link>
            </li>
        </ul>
        <ReceiptInputComponent/>
        <TableComponent v-if="receipts && receipts.data && receipts.data.length"
                        :headers="['Чек', 'Обработка', 'Ошибка', 'Ануллирован', 'Сумма', 'Дата', '']"
                        :data="receipts.data"
                        is-edit is-delete
        />
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
            receipts: [],
        };
    },
    async mounted() {
        try {
            const response = await axiosInstance.post('/receipts/show');
            this.receipts = response.data;
            console.log(this.receipts.data);
        } catch (error) {
            console.error('Error fetching receipts:', error);
        }
    }
}
</script>

<style scoped>

</style>