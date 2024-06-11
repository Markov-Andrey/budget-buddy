<template>
    <div>
        <!-- Форма для добавления новой записи -->
        <form @submit.prevent="addIncome">
            <div class="mb-4">
                <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
                <input type="number" id="amount" v-model="newIncome.amount" required>
            </div>
            <div class="mb-4">
                <label for="subcategory" class="block text-sm font-medium text-gray-700">Subcategory</label>
                <select id="subcategory" v-model="newIncome.subcategory_id" required>
                    <option v-for="subcategory in subcategories" :key="subcategory.id" :value="subcategory.id">
                        {{ subcategory.name }}
                    </option>
                </select>
            </div>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add Income</button>
        </form>

        <!-- Таблица данных -->
        <table class="w-full text-sm text-left">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr class="px-6 py-3">
                    <th class="px-6 py-3">ID</th>
                    <th class="px-6 py-3">Amount</th>
                    <th class="px-6 py-3">User ID</th>
                    <th class="px-6 py-3">Subcategory</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in incomes" :key="item.id" class="bg-white border-b">
                    <td class="px-6 py-4">{{ item.id }}</td>
                    <td class="px-6 py-4">{{ item.amount }}</td>
                    <td class="px-6 py-4">{{ item.user_id }}</td>
                    <td class="px-6 py-4">{{ getSubcategoryName(item.subcategory_id) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axiosInstance from "@/axios-instance";

export default {
    name: "TableIncome",
    data() {
        return {
            income: [],
            subcategories: [],
            newIncome: {
                amount: null,
                subcategory_id: null
            }
        };
    },
    computed: {
        incomes() {
            return this.income.data || [];
        }
    },
    methods: {
        async fetchIncome() {
            try {
                const response = await axiosInstance.get('/income/index');
                if (response && response.data && response.data.incomes) {
                    this.income = response.data.incomes;
                    this.subcategories = response.data.subcategories;
                } else {
                    console.error('Invalid response format:', response);
                }
            } catch (error) {
                console.error('Error fetching income:', error);
            }
        },
        async addIncome() {
            // try {
            //     const response = await axiosInstance.post('/income/add', this.newIncome);
            //     if (response && response.status === 200) {
            //         // Очищаем форму и обновляем данные
            //         this.newIncome = {
            //             amount: null,
            //             subcategory_id: null
            //         };
            //         this.fetchIncome();
            //     } else {
            //         console.error('Failed to add income. Server response:', response);
            //     }
            // } catch (error) {
            //     console.error('Error adding income:', error);
            // }
        },
        getSubcategoryName(subcategoryId) {
            const subcategory = this.subcategories.find(sub => sub.id === subcategoryId);
            return subcategory ? subcategory.name : 'Unknown';
        }
    },
    mounted() {
        this.fetchIncome();
    }
};
</script>

<style scoped>
/* Ваши стили */
</style>
