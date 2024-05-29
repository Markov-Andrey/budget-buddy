<template>
    <div v-if="balance" class="flex gap-2">
        <div :style="{ color: balance >= 0 ? 'green' : 'red' }">
            {{ balance >= 0 ? '+' + balance : balance }}
        </div>
    </div>
</template>

<script>
import axiosInstance from "@/axios-instance";

export default {
    name: "ElementBalance",
    data() {
        return {
            balance: null,
        };
    },
    async mounted() {
        try {
            const response = await axiosInstance.get('/info/balance');
            console.log('Balance success:', response.data);
            this.balance = response.data.balance;
        } catch (error) {
            console.error('Balance error:', error);
        }
    }
}
</script>

<style scoped>

</style>
