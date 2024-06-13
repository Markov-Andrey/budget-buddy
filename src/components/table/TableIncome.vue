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

        <!-- Пагинация -->
        <div class="flex justify-between items-center mt-4">
            <div>
                <button @click="fetchPrevPage" :disabled="!hasPrevPage" class="px-4 py-2 bg-gray-200 rounded">Previous</button>
                <button @click="fetchNextPage" :disabled="!hasNextPage" class="px-4 py-2 bg-gray-200 rounded">Next</button>
            </div>
            <div>
                Page {{ currentPage }} of {{ totalPages }}
            </div>
        </div>
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
            },
            currentPage: 1,
            perPage: 10,
            totalPages: 1
        };
    },
    computed: {
        incomes() {
            return this.income.data || [];
        },
        hasPrevPage() {
            return this.currentPage > 1;
        },
        hasNextPage() {
            return this.currentPage < this.totalPages;
        }
    },
    methods: {
        async fetchIncome() {
            try {
                const response = await axiosInstance.get('/income/index', {
                    params: {
                        page: this.currentPage,
                        per_page: this.perPage
                    }
                });
                if (response && response.data && response.data.incomes) {
                    this.income = response.data.incomes;
                    this.subcategories = response.data.subcategories;
                    this.totalPages = response.data.incomes.last_page;
                } else {
                    console.error('Invalid response format:', response);
                }
            } catch (error) {
                console.error('Error fetching income:', error);
            }
        },
        async fetchPrevPage() {
            if (this.hasPrevPage) {
                this.currentPage--;
                this.fetchIncome();
            }
        },
        async fetchNextPage() {
            if (this.hasNextPage) {
                this.currentPage++;
                this.fetchIncome();
            }
        },
        async addIncome() {
            // Код для добавления новой записи
        },
        getSubcategoryName(subcategory_id) {
            const subcategory = this.subcategories.find(sub => sub.id === subcategory_id);
            return subcategory ? subcategory.name : '-';
        }
    },
    mounted() {
        this.fetchIncome();
    }
};
</script> serve

<style scoped>
/* Ваши стили */
</style>
