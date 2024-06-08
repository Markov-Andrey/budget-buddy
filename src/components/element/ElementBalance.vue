<template>
    <div class="grid">
        <div v-if="income" class="flex gap-2">
            <div class="font-bold">Ср-мес заработок:</div>
            <div>{{ income }}</div>
        </div>
        <div v-if="loss" class="flex gap-2">
            <div class="font-bold">Ср-мес траты:</div>
            <div>{{ loss }}</div>
        </div>
    </div>
</template>

<script>
import axiosInstance from "@/axios-instance";

export default {
    name: "ElementBalance",
    data() {
        return {
            income: null,
            loss: null,
        };
    },
    async mounted() {
        try {
            const response = await axiosInstance.get('/info/balance');
            console.log('Balance success:', response.data);
            this.income = response.data.income;
            this.loss = response.data.loss;
        } catch (error) {
            console.error('Balance error:', error);
        }
    }
}
</script>

<style scoped>

</style>
