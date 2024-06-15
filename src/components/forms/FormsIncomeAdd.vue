<template>
    <form @submit.prevent="addIncome" class="flex gap-3 justify-center p-3">
        <div>
            <InputMoney v-model:amount="newIncome.amount"/>
        </div>

        <div>
            <InputSelect
                :options="subcategories"
                v-model:subcategory="newIncome.subcategory_id"
            />
        </div>

        <button type="submit"
                class="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-300 transition duration-200 active:bg-green-300">
            Добавить
        </button>
    </form>
</template>

<script>
import InputSelect from "@/components/inputs/InputSelect.vue";
import InputMoney from "@/components/inputs/InputMoney.vue";
import axiosInstance from '@/axios-instance';

export default {
    name: "FormsIncomeAdd",
    components: { InputMoney, InputSelect },
    props: {
        subcategories: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            newIncome: {
                amount: null,
                subcategory_id: null
            },
        };
    },
    methods: {
        async addIncome() {
            try {
                const response = await axiosInstance.post('/income/store', this.newIncome);
                if (response.status === 201) {
                    this.newIncome.amount = null;
                    this.newIncome.subcategory_id = null;
                    this.$emit('income-added');
                    console.log('Income added:', response.data);
                }
            } catch (error) {
                console.error('Error income store:', error);
            }
        },
    }
}
</script>

<style scoped>

</style>
