<template>
    <div class="p-4 sm:ml-64">
        <div>Добавить новый чек</div>
        <ReceiptInputComponent/>
        <TableComponent v-if="receipts && receipts.data && receipts.data.length" :headers="['Чек', 'Обработка', 'Ошибка', 'Ануллирован', 'Сумма']" :data="receipts.data" is-edit />
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